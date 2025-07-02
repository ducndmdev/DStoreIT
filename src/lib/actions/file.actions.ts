"use server";

import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { handleServerActionsError } from "../auth.utils";
import config from "../config";
import { createAdminClient } from "../config/appwrite";
import { constructFileUrl, getFileType } from "../file.utils";
import { parseStringify } from "../utils";

const {
  env: {
    appwrite: { bucket, fileCollection, database },
  },
} = config;

export const uploadFile = async ({
  file,
  owner,
  accountId,
  path,
}: {
  file: File;
  owner: string;
  accountId: string;
  path: string;
}) => {
  try {
    const { storage, databases } = await createAdminClient();
    const { type, extension } = getFileType(file.name);

    const inputFile = InputFile.fromBuffer(file, file.name);
    const uploadedFile = await storage.createFile(
      bucket,
      ID.unique(),
      inputFile,
    );
    if (!uploadedFile)
      return parseStringify({
        message: "Failed to upload file",
      });

    const fileDocument = await databases
      .createDocument(database, fileCollection, ID.unique(), {
        name: uploadedFile.name,
        type,
        extension,
        size: uploadedFile.sizeOriginal,
        owner,
        accountId,
        bucketId: uploadedFile.bucketId,
        url: constructFileUrl(uploadedFile.$id),
        users: [],
      })
      .catch(async (error) => {
        await storage.deleteFile(bucket, uploadedFile.$id);
        throw error;
      });

    revalidatePath(path);
    return parseStringify(fileDocument);
  } catch (error) {
    handleServerActionsError(error, "Failed to upload file");
  }
};
