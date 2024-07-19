import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import sharp from "sharp";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stringToSlug } from "@/utils/stringToSlug";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import { ExtensionType, IMediaFile, IMediaFilePayload } from "@/models/management/media.interface";
import { getMediaFileType, isInValidFileSize, isInvalidFile } from "@/helpers/mediaFiles";
import { BaseResponse, Status } from "@/models/common.interface";
import { FolderItemTree } from "@/app/(management)/portal/media/_components/MediaUploadContainer/UploadFileForm";

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      {
        message: `unAuthorize`,
        code: "TOKEN_INVALID",
      },
      { status: 503 },
    );
  }
  const authToken = authorization.split("Bearer")[1].trim();

  const formData = await request.formData();

  const files = formData.getAll("files[]") as File[] | null;
  const folder = formData.get("folder") as string | null;

  if (isEmpty(folder) || folder === null || !folder) {
    return NextResponse.json({ message: "Thiếu thư mục upload.", code: "FOLDER_EMPTY" }, { status: 400 });
  }

  if (isEmpty(files) || !files) {
    return NextResponse.json({ message: "Chưa có file.", code: "FILES_IS_EMPTY" }, { status: 400 });
  }

  const folderParse = JSON.parse(folder) as FolderItemTree;
  const directoryPath = folderParse.nestedSlug.reduce((path, curr) => path.concat("/", curr), "public");

  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath);

    // return NextResponse.json(
    //   {
    //     message: "Đường dẫn thư mục không tồn tại",
    //     code: "FODLER_DIRECTORY_NO_EXISTS",
    //   },
    //   { status: 400 },
    // );
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
    isSuccess: true,
    code: "",
  };

  try {
    // files.every(async (file) => {
    for await (const file of files) {
      let fileNameToArr = file.name.split(".");

      const fileExtension = fileNameToArr.pop(); // get last of array
      const fileSlugName = stringToSlug(fileNameToArr.join("")).concat("-", new Date().getTime().toString());

      const originalFilePath = `${directoryPath}/${fileSlugName}.${fileExtension}`;

      const response = await fetch(`${process.env.API_ROOT}/local/Cms_Media_Addnew`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodeURIComponent(authToken)}`,
        },
        body: JSON.stringify({
          requestObject: {
            extension: `${fileExtension}`,
            parent: folderParse.id,
            slug: fileSlugName,
            path: `${fileSlugName}.${fileExtension}`,
            mediaType: getMediaFileType(file.type) || "",
          },
        }),
      });

      const data = (await response.json()) as BaseResponse<IMediaFile>;

      if (response.ok && data.status === Status.OK) {
        // saving file to local public
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(path.join(process.cwd(), originalFilePath), buffer);

        if (
          fileExtension === ExtensionType.JPEG ||
          fileExtension === ExtensionType.PNG ||
          fileExtension === ExtensionType.GIF ||
          fileExtension === ExtensionType.JPG
        ) {
          const thumbPath = `${directoryPath}/thumb-${fileSlugName}.${fileExtension}`;

          const croppedImageBuffer = await sharp(buffer)
            .resize({
              height: 150,
              fit: "contain",
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .toBuffer();
          await writeFile(path.join(process.cwd(), thumbPath), croppedImageBuffer);
        }
      } else {
        responseMessage = {
          isSuccess: false,
          message: data.message,
          code: "UPLOAD_FAILED",
        };
        break;
      }
    }
  } catch (error) {
    console.log({ error });
    responseMessage = {
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
      { messate: responseMessage.message, code: responseMessage.code },
      {
        status: 400,
      },
    );
  }
}
