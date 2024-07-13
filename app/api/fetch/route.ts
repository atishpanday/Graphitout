import { NextResponse } from "next/server";
import processData from "./process-data";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const index = searchParams.get("index");
        const path = searchParams.get("path");

        const [totalPages, csvData] = await processData(index as string, path as string);
        return NextResponse.json({ totalPages: totalPages, data: csvData });
    } catch (err) {
        return NextResponse.json({ err });
    }
};