import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import sharp from "sharp";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stringToSlug } from "@/utils/stringToSlug";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import { ExtensionType, IMediaFile } from "@/models/management/media.interface";
import { getMediaFileType, isInValidFileSize, isInvalidFile } from "@/utils/fileUpload";
import { BaseResponse, Status } from "@/models/common.interface";
import { MediaUploadFormData } from "@/modules/admin/manageMedia/media.interface";

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get("authorization");
  const authToken = authorization?.split("Bearer")[1].trim();

  if (!authToken) {
    return NextResponse.json(
      {
        message: `unAuthorize`,
        code: "TOKEN_INVALID",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();

  const files = formData.getAll("files[]") as File[] | null;
  const folder = formData.get("folder") as string | null;

  if (isEmpty(folder) || folder === null || !folder) {
    return NextResponse.json({ message: "Thiếu thư mục upload.", code: "FOLDER_EMPTY" }, { status: 400 });
  }

  if (isEmpty(files) || !files) {
    return NextResponse.json({ message: "Chưa có file.", code: "FILES_IS_EMPTY" }, { status: 400 });
  }

  const { folderId, folderPath, folderSlug, folderName } = JSON.parse(folder) as Pick<
    MediaUploadFormData,
    "folderId" | "folderName" | "folderPath" | "folderSlug"
  >;

  if (!folderPath.startsWith(mediaConfig.rootFolder)) {
    return NextResponse.json(
      {
        message: `Folder path invalid`,
        code: "INVALID_NESTED_FOLDER",
      },
      { status: 400 },
    );
  }

  const uploadDir = "public".concat("/", folderPath);

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  if (isInValidFileSize(files)) {
    return NextResponse.json(
      {
        message: `Dung lượng file không vượt quá ${mediaConfig.maxfileSize}MB`,
        code: "MAX_FILE_SIZE",
      },
      { status: 400 },
    );
  }

  if (isInvalidFile(files)) {
    return NextResponse.json(
      {
        message: `Định dạng file không hợp lệ ${mediaConfig.accept}`,
        code: "INVALID_FILES",
      },
      { status: 400 },
    );
  }
  let responseMessage = {
    message: "Upload Success",
    fileName: "",
    isSuccess: true,
    code: "",
  };

  try {
    // files.every(async (file) => {
    for await (const file of files) {
      let fileNameToArr = file.name.split(".");

      const fileExtension = fileNameToArr.pop(); // get last of array
      const fileSlugName = stringToSlug(fileNameToArr.join("")).concat("-", new Date().getTime().toString());

      const originalFilePath = `${uploadDir}/${fileSlugName}.${fileExtension}`;

      const requestObject = {
        extension: `${fileExtension}`,
        parent: folderId,
        slug: fileSlugName,
        path: `${fileSlugName}.${fileExtension}`,
        mediaType: getMediaFileType(file.type) || "",
      };

      const response = await fetch(`${process.env.API_ROOT}/local/Cms_Media_Addnew`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodeURIComponent(authToken)}`,
        },
        body: JSON.stringify({
          requestObject,
        }),
      });

      const data = (await response.json()) as BaseResponse<IMediaFile>;

      if (response.ok && data.status === Status.OK) {
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(process.cwd(), originalFilePath), new Uint8Array(buffer));

        if (
          fileExtension === ExtensionType.JPEG ||
          fileExtension === ExtensionType.PNG ||
          fileExtension === ExtensionType.GIF ||
          fileExtension === ExtensionType.JPG
        ) {
          const thumbPath = `${uploadDir}/thumb-${fileSlugName}.${fileExtension}`;
          await createThumbnail(buffer, path.join(process.cwd(), thumbPath));
        }
      } else {
        responseMessage = {
          ...responseMessage,
          isSuccess: false,
          message: data.message,
          fileName: fileSlugName,
          code: "UPLOAD_FAILED",
        };
        break;
      }
    }
  } catch (error) {
    responseMessage = {
      ...responseMessage,
      isSuccess: false,
      message: "Error From Server",
      code: "SERVER_ERROR",
    };
  }

  if (responseMessage.isSuccess) {
    return NextResponse.json(
      { message: "Upload thành công.", code: "CREATE_SUCCESS" },
      {
        status: 201,
      },
    );
  } else {
    return NextResponse.json(
      { messate: responseMessage.message, code: responseMessage.code, fileName: responseMessage.fileName },
      {
        status: 400,
      },
    );
  }
}
const createThumbnail = async (buffer: Buffer, thumbPath: string) => {
  const croppedImageBuffer = await sharp(buffer)
    .resize({
      height: 150,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  await writeFile(thumbPath, new Uint8Array(croppedImageBuffer));
};
