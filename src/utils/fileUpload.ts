import { mediaConfig } from "@/configs";
import { MediaTypes } from "@/models/management/media.interface";
export const isValidMediaFileTypes = (fileType: string) => {
  let isValid = false;
  Object.keys(mediaConfig.fileType).forEach((key: string) => {
    if (!isValid) {
      mediaConfig.fileType[key as keyof typeof mediaConfig.fileType].forEach((type) => {
        if (fileType === type) {
          isValid = true;
          return;
        }
      });
    }
  });

  return isValid;
};

export const getMediaFileType = (fType: string): MediaTypes | undefined => {
  let typeOfFile: string | undefined;
  let fileIsValid = false;

  Object.entries(mediaConfig.fileType).forEach(([key, types]) => {
    if (fileIsValid) {
      return;
    }

    if (types.includes(fType)) {
      fileIsValid = true;
      typeOfFile = key;
    }
  });

  return typeOfFile ? (typeOfFile.toUpperCase() as MediaTypes) : undefined;
};

export const isInValidFileSize = (files: File[]) => {
  return files.some((file) => file.size / 1024 / 1024 > mediaConfig.maxfileSize);
};

export const isInvalidFile = (files: File[]) => {
  return files.some((file) => {
    const fileExtension = file.name.split(".").pop() || "";

    return (
      !mediaConfig.accept
        .split(",")
        .map((ex) => ex.trim().replaceAll(".", ""))
        .includes(fileExtension) || !isValidMediaFileTypes(file.type)
    );
  });
};
