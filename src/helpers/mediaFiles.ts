import { mediaConfig } from "@/configs";
export const isValidMediaFileTypes = (fileType: string) => {
    let isValid = false;
    Object.keys(mediaConfig.fileType).forEach((key: string) => {
        if (!isValid) {
            mediaConfig.fileType[
                key as keyof typeof mediaConfig.fileType
            ].forEach((type) => {
                if (fileType === type) {
                    isValid = true;
                    return;
                }
            });
        }
    });

    return isValid;
};

export const getMediaFileType = (fType: string) => {
    let typeOfFile: string = "";
    let isValid = false;
    Object.keys(mediaConfig.fileType).forEach((key: string) => {
        if (!isValid) {
            mediaConfig.fileType[
                key as keyof typeof mediaConfig.fileType
            ].forEach((type) => {
                if (fType === type) {
                    isValid = true;
                    switch (key) {
                        case "image": {
                            typeOfFile = "IMAGE";
                            break;
                        }
                        case "file": {
                            typeOfFile = "FILE";
                            break;
                        }
                        case "icon": {
                            typeOfFile = "ICON";
                            break;
                        }
                    }
                    return;
                }
            });
        }
    });

    return typeOfFile;
};

export const isInValidFileSize = (files: File[]) => {
    return files.some(
        (file) => file.size / 1024 / 1024 > mediaConfig.maxfileSize,
    );
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
