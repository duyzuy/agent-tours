import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { stringToSlug } from "@/utils/stringToSlug";
import { IMediaFolderPayload } from "@/models/management/media.interface";
import { cookies } from "next/headers";
import { localMediaAPIs } from "@/services/management/localMedia.service";
import { mediaConfig } from "@/configs";
import { headers } from "next/headers";
import { isEmpty } from "lodash";

export async function POST(request: NextRequest) {
    // const folderName = "";
    const headersList = headers();
    const authorization = headersList.get("authorization");

    if (!authorization) {
        return NextResponse.json(
            {
                message: `Token is empty`,
                code: "TOKEN_EMPTY",
            },
            { status: 403 },
        );
    }
    const authToken = authorization.split("Bearer")[1].trim();
    // Check user permissions
    const payload = (await request.json()) as Required<IMediaFolderPayload>;

    if (isEmpty(payload.folderName)) {
        return NextResponse.json(
            {
                message: `Tên thư mục không bỏ trống.`,
                code: "FOLDER_NAME_EMPTY",
            },
            { status: 400 },
        );
    }
    if (isEmpty(payload.folderSlug)) {
        return NextResponse.json(
            {
                message: `Slug thư mục không bỏ trống.`,
                code: "FOLDER_SLUG_EMPTY",
            },
            { status: 400 },
        );
    }
    if (
        isEmpty(payload.folderPath) ||
        !payload.folderPath.startsWith(`/uploads`)
    ) {
        return NextResponse.json(
            {
                message: `Đường dẫn thư mục không hợp lệ.`,
                code: "FOLDER_PATH_EMPTY",
            },
            { status: 400 },
        );
    }

    try {
        const folderSlugName = stringToSlug(payload.folderSlug);

        const folderPath = path.join(
            `${process.cwd()}/public${payload.folderPath}`,
            folderSlugName,
        );
        try {
            await access(folderPath);
            return NextResponse.json(
                {
                    message: `Thư mục "${payload.folderName}" đã tồn tại.`,
                    code: "FOLDER_ALREADY_EXISTS",
                },
                { status: 400 },
            );
        } catch (error) {}

        //create and save to db
        const response = await localMediaAPIs.createMediaFolder(
            authToken,
            payload,
        );
        //Write folder to local public
        await mkdir(folderPath);
        return NextResponse.json(
            {
                data: response.result,
                message: `Tạo thư mục thành công`,
                status: 201,
            },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: `Tạo thư mục thất bại.`,
                code: "CREATE_FAILED",
            },
            { status: 500 },
        );
    }
}
