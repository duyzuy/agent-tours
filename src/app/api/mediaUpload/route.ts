import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // const {writeFile} = fs
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    // file types
    //'application/pdf', 'image/jpeg',, image/png, image/svg+xml

    //.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    console.log({ file });

    if (!file) {
        return NextResponse.json({ success: false });
    }

    if (file.type.startsWith("image/")) {
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + file.name.replaceAll(" ", "_");

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location

    // await writeFile(path, buffer);

    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer,
        );
        return NextResponse.json(
            { message: "Upload success", status: 201 },
            { status: 201 },
        );
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json(
            { message: "Upload", status: 500 },
            { status: 500 },
        );
    }
}
