"use server";

import {
  DEFAULT_USER_AVATAR,
  SESSION_COOKIE_KEY,
} from "@/constants/auth.constants";
import { SIGN_IN_PATH } from "@/constants/path.constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import { handleServerActionsError } from "../auth.utils";
import config from "../config";
import { createAdminClient, createSessionClient } from "../config/appwrite";
import { parseStringify } from "../utils";

const {
  env: {
    appwrite: { database, userCollection },
  },
} = config;

export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const existingUser = await databases.listDocuments(database, userCollection, [
    Query.equal("email", email),
  ]);

  return parseStringify(existingUser.total ? existingUser.documents[0] : null);
};

export const sendEmailOtp = async (email: string) => {
  try {
    const { account } = await createAdminClient();

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return parseStringify({
        message: "User not found",
      });
    }

    const session = await account.createEmailToken(ID.unique(), email);
    if (!session)
      return parseStringify({
        message: "Failed to send email OTP",
      });

    return parseStringify(session);
  } catch (error) {
    handleServerActionsError(error, "Failed to send email OTP");
  }
};

export const verifyOtp = async ({
  accountId,
  code,
}: {
  accountId: string;
  code: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, code);
    if (!session)
      return parseStringify({
        message: "Invalid OTP",
      });

    (await cookies()).set(SESSION_COOKIE_KEY, session.secret, {
      expires: new Date(session.expire),
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleServerActionsError(error, "Failed to verify OTP");
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account, databases } = await createSessionClient();

    const response = await account.get();
    if (!response) return null;

    const user = await databases.listDocuments(database, userCollection, [
      Query.equal("accountId", response.$id),
    ]);

    return parseStringify(user.total ? user.documents[0] : null);
  } catch (error) {
    return null;
  }
};

export const signIn = async ({ email }: { email: string }) => {
  try {
    const session = await sendEmailOtp(email);
    if (!session || session.message)
      return parseStringify({
        message: session?.message ?? "Failed to send email OTP",
      });

    return parseStringify({
      accountId: session.userId,
    });
  } catch (error) {
    handleServerActionsError(error, "Failed to sign in");
  }
};

export const signUp = async ({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) => {
  try {
    const session = await sendEmailOtp(email);
    if (!session || session.message)
      return parseStringify({
        message: session?.message ?? "Failed to send email OTP",
      });

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      const { databases } = await createAdminClient();
      const user = await databases.createDocument(
        database,
        userCollection,
        ID.unique(),
        {
          email,
          fullName,
          avatar: DEFAULT_USER_AVATAR,
          accountId: session.userId,
        },
      );

      if (!user)
        return parseStringify({
          message: "Failed to create user",
        });
    }

    return parseStringify({
      accountId: session.userId,
    });
  } catch (error) {
    handleServerActionsError(error, "Failed to sign up");
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete(SESSION_COOKIE_KEY);
    await account.deleteSession("current");

    return redirect(SIGN_IN_PATH);
  } catch {
    return {
      message: "Failed to sign out",
    };
  }
};
