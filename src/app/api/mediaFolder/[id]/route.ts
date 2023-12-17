import { NextRequest, NextResponse } from "next/server";
import { IMediaFolderPayload } from "@/models/management/media.interface";
import { localMediaAPIs } from "@/services/management/localMedia.service";
import { headers } from "next/headers";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: number } },
) {
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
    const payload = (await request.json()) as Required<IMediaFolderPayload>;

    try {
        const response = await localMediaAPIs.updateMediaFolder(
            authToken,
            Number(params.id),
            payload,
        );
        console.log(response);

        return NextResponse.json(
            {
                message: `Cập nhật thư mục thành công`,
                data: response.result,
                id: params.id,
                status: 200,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: `Cập nhật thư mục thất bại.`,
                error: error,
            },
            { status: 500 },
        );
    }
}
