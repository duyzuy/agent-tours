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
            if (filePath?.includes(".png")) {
                response.headers.set("content-type", "image/png");
            }

            if (filePath?.includes(".gif")) {
                response.headers.set("content-type", "image/gif");
            }
            if (filePath?.includes(".jpe") || filePath?.includes(".jpg")) {
                response.headers.set("content-type", "image/jpeg");
            }

            // if(filePath?.includes(".jpe") || filePath?.includes(".jpeg")){
            //     response.headers.set("content-type", "image/jpeg");
            // }

            return response;
        } else {
            return new NextResponse(null, { status: 403 });
        }
    } else {
        return new NextResponse(null, { status: 403 });
    }
}
