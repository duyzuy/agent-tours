import { NextRequest, NextResponse } from "next/server";
import { IMediaFolderRs, IMediaFolderUpdatePayload } from "@/models/management/media.interface";
import { headers } from "next/headers";
import { Status } from "@/models/common.interface";

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
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
  const payload = (await request.json()) as Required<IMediaFolderUpdatePayload>;

  try {
    const response = await fetch(`${process.env.API_ROOT}/local/Cms_MediaFolder_Edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodeURIComponent(authToken)}`,
      },
      body: JSON.stringify({
        requestObject: {
          ...payload,
          id: Number(params.id),
        },
      }),
    });

    const data = (await response.json()) as IMediaFolderRs;

    if (response.ok && data.status === Status.OK) {
      return NextResponse.json(
        {
          message: `Cập nhật thư mục thành công`,
          data: data,
          id: params.id,
          status: 200,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: `Cập nhật thư mục thát bại`,
          code: "UPDATE_FOLDER_FAILED",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: `Cập nhật thư mục thất bại.`,
        error: error,
      },
      { status: 500 },
    );
  }
}
