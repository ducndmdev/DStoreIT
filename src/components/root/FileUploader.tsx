"use client";

import { uploadFile } from "@/lib/actions/file.actions";
import { getFileIcon, getFileType, MAX_FILE_SIZE } from "@/lib/file.utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "../ui/button";

const FileUploader = ({
  owner,
  accountId,
}: {
  owner: string;
  accountId: string;
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const files = acceptedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
      setFiles(files);

      if (files.length !== acceptedFiles.length) {
        toast.error("File size exceeds the maximum limit (50MB)");
      }

      const promises = files.map((file) =>
        uploadFile({ file, owner, accountId, path: "/files" })
          .then(({ name, message }) => {
            if (message) toast.error(message);

            if (name) setFiles((prev) => prev.filter((f) => f.name !== name));
          })
          .catch((error) => {
            toast.error(
              error instanceof Error ? error.message : "Something went wrong",
            );
          }),
      );

      await Promise.all(promises);
    },
    [owner, accountId],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button className="uploader-button!">
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <p className="font-semibold">Upload</p>
        </Button>
      </div>

      {!!files.length && (
        <ul className="uploader-preview-list!">
          <h3>In Progress</h3>
          {files.map((file) => {
            const { type, extension } = getFileType(file.name);
            const icon = getFileIcon(extension, type as FileType);

            return (
              <li key={file.name} className="uploader-preview-item!">
                <div className="flex flex-1 items-center gap-2">
                  <div className="bg-brand/10 flex-center size-15 rounded-full p-4">
                    <Image src={icon} alt="file-icon" width={32} height={32} />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <p className="preview-item-name!">{file.name}</p>
                    <Image
                      unoptimized
                      src="/assets/icons/file-loader.gif"
                      alt="file"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-light-200/80 hover:bg-light-200 size-6 rounded-full p-0 transition-colors"
                  onClick={() => {
                    setFiles((prev) =>
                      prev.filter((f) => f.name !== file.name),
                    );
                  }}
                >
                  <Image
                    src="/assets/icons/close.svg"
                    alt="close"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                  />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FileUploader;
