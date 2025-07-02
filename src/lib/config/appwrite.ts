"use server";
import { SESSION_COOKIE_KEY } from "@/constants/auth.constants";
import { cookies } from "next/headers";
import { Account, Client, Databases, Storage } from "node-appwrite";
import config from ".";

const {
  env: {
    appwrite: { urlEndpoint, project, key },
  },
} = config;

export const createSessionClient = async () => {
  const client = new Client().setEndpoint(urlEndpoint).setProject(project);

  const session = (await cookies()).get(SESSION_COOKIE_KEY);

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(urlEndpoint)
    .setProject(project)
    .setKey(key);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};
