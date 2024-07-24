import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve("public", "uploads");

export async function POST(request: Request) {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as File) || null;

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }

        fs.writeFileSync(
            path.resolve(UPLOAD_DIR, file.name.replaceAll(" ", "_")),
            buffer
        );
    } else {
        return NextResponse.json({
            success: false,
        });
    }

    return NextResponse.json({
        success: true,
        path: path.resolve(UPLOAD_DIR, file.name.replaceAll(" ", "_")),
    });
};