import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { stringToSlug } from "@/utils/stringToSlug";
import { CreateMediaFolderPayload, IMediaFolderRs } from "@/models/management/media.interface";
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
  const payload = (await request.json()) as Required<CreateMediaFolderPayload>;

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
  const folderPath = payload.folderPath.startsWith(`/`) ? payload.folderPath.slice(1) : payload.folderPath;

  if (isEmpty(payload.folderPath) || !folderPath.startsWith(`uploads`)) {
    return NextResponse.json(
      {
        message: `Đường dẫn thư mục không hợp lệ.`,
        code: "FOLDER_PATH_EMPTY",
      },
      { status: 400 },
    );
  }
  const folderSlugName = stringToSlug(payload.folderSlug);
  const folderRelativePath = path.join(`${process.cwd()}/public/${folderPath}`, folderSlugName);

  if (existsSync(folderRelativePath)) {
    return NextResponse.json(
      {
        message: `Thư mục "${payload.folderName}" đã tồn tại.`,
        code: "FOLDER_ALREADY_EXISTS",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${process.env.API_ROOT}/local/Cms_MediaFolder_Addnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodeURIComponent(authToken)}`,
      },
      body: JSON.stringify({
        requestObject: {
          parent: payload.parent,
          folderName: payload.folderName,
          folderSlug: folderSlugName,
        },
      }),
    });

    const data = (await response.json()) as IMediaFolderRs;

    await mkdir(folderRelativePath);

    return NextResponse.json(
      {
        data: data,
        message: `Tạo thư mục thành công`,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Tạo thư mục thất bại.`,
        code: "ERROR_FORM_SERVER",
      },
      { status: 500 },
    );
  }
}
