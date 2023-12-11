import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { stringToSlug } from "@/utils/stringToSlug";
import { IMediaFolderPayload } from "@/model/Management/media.interface";

export async function POST(request: NextRequest) {
    // console.log({ request, formData });
    // const folderName = "";

    try {
        const data = (await request.json()) as Required<IMediaFolderPayload>;

        const folderSlugName = stringToSlug(data.folderSlug);

        const folderPath = path.join(
            `${process.cwd()}/public/uploads`,
            folderSlugName,
        );

        //check folder exists

        try {
            await access(folderPath);
            return NextResponse.json(
                {
                    message: `Folder "${data.folderName}" already exists.`,
                    code: "FOLDER_ALREADY_EXISTS",
                },
                { status: 400 },
            );
        } catch (error) {}

        await mkdir(folderPath);

        return NextResponse.json(
            {
                message: `Folder "${data.folderName}" tạo thành công.`,
                status: 201,
            },
            { status: 201 },
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {
                message: `Tạo folder thất bại`,
                code: "CREATE_FAILED",
            },
            { status: 500 },
        );
    }
}
