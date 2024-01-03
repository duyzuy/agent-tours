import { readFileSync, createReadStream } from "fs";
import { NextRequest, NextResponse } from "next/server";

import path from "path";
export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string[] } },
    res: NextResponse,
) {
    const { slug } = params;

    if (slug && slug.length) {
        // header.set("Content-Type", "image/*");
        const pathname = slug.join("/");
        const filePath = [...slug].pop(); // get lsst of array;

        const fileName = readFileSync("public/uploads/" + pathname);

        if (fileName) {
            const response = new NextResponse(fileName);
            if (filePath?.includes(".svg")) {
                response.headers.set("content-type", "image/svg+xml");
            }

            return response;
        } else {
            return new NextResponse(null, { status: 403 });
        }
    } else {
        return new NextResponse(null, { status: 403 });
    }
}
