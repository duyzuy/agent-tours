import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { stringToSlug } from "@/utils/stringToSlug";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import { IMediaFilePayload } from "@/models/management/media.interface";
import { getMediaFileType, isValidMediaFileTypes } from "@/helpers/mediaFiles";
import { localMediaAPIs } from "@/services/management/localMedia.service";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    // const {writeFile} = fs

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
        return NextResponse.json(
            { message: "Thư mục trống.", code: "FOLDER_EMPTY" },
            { status: 400 },
        );
    }
    const folderParse = JSON.parse(folder) as IMediaFilePayload["folder"];
    const directoryPath = folderParse.nestedSlug.reduce((path, curr) => {
        path = path.concat("/", curr);
        return path;
    }, "public");

    // file types
    //'application/pdf', 'image/jpeg', 'image/gif', image/png, image/svg+xml

    //.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    if (isEmpty(files) || !files) {
        return NextResponse.json({ message: "Chưa có file." }, { status: 404 });
    }

    if (!existsSync(directoryPath)) {
        return NextResponse.json(
            {
                message: "Đường dẫn thư mục không hợp lệ",
                code: "FODLER_DIRECTORY_NO_EXISTS",
            },
            { status: 400 },
        );

        // mkdirSync(directoryPath);
    }

    files.forEach(async (file) => {
        if (file.size / 1024 / 1024 > mediaConfig.maxfileSize) {
            return NextResponse.json(
                {
                    message: `Dung lượng file không vượt quá ${mediaConfig.maxfileSize}MB`,
                    code: "MAX_FILE_SIZE",
                },
                { status: 400 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split(".")[1];
        const fileSlugName = stringToSlug(file.name.split(".")[0]).concat(
            "-",
            new Date().getTime().toString(),
        );

        if (
            !mediaConfig.accept
                .split(",")
                .map((ex) => ex.trim().replaceAll(".", ""))
                .includes(fileExtension) ||
            !isValidMediaFileTypes(file.type)
        ) {
            return NextResponse.json(
                {
                    message: "File không hợp lệ",
                    code: "FILE_INVALID",
                },
                { status: 400 },
            );
        }
        const originalFilePath = `${directoryPath}/${fileSlugName}.${fileExtension}`;
        try {
            //Save path to local DB
            await localMediaAPIs.uploadMediaFile(authToken, {
                fileType: `.${fileExtension}`,
                parent: folderParse.id,
                slug: fileSlugName,
                path: `${fileSlugName}.${fileExtension}`,
                type: getMediaFileType(file.type) || "",
            });

            // saving file to local public
            const thumbPath = `${directoryPath}/thumb-${fileSlugName}.${fileExtension}`;
            const croppedImageBuffer = await sharp(buffer)
                .resize({
                    height: 150,
                    fit: "contain",
                    background: { r: 0, g: 0, b: 0, alpha: 0 },
                })
                .toBuffer();

            await writeFile(path.join(process.cwd(), originalFilePath), buffer);
            await writeFile(
                path.join(process.cwd(), thumbPath),
                croppedImageBuffer,
            );
        } catch (error) {
            console.log("Error occured ", error);
            return NextResponse.json(
                { message: "Upload", code: "DB_SAVING_OR_CREATE_FAIL" },
                { status: 500 },
            );
        }
    });

    return NextResponse.json(
        { message: "Upload success", status: 201 },
        { status: 201 },
    );
}
