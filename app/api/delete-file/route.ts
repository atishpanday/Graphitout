import { NextResponse } from "next/server";
import { unlink } from "fs";

export function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const path = searchParams.get("path");
        unlink(path as string, (err) => {
            return NextResponse.json({ err });
        });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ err });
    }
}