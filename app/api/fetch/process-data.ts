import { createReadStream } from "fs";
import { createInterface } from "readline";
import csvParser from "../_utils/csv-parser";

const chunkSize = 100;

export default async function processData(index: string, path: string) {
    const startLine = parseInt(index || "0") * chunkSize + 1;
    const endLine = startLine + chunkSize;
    let chunk = "";
    let csvData: Record<string, any>[] = [];
    let lineNumber = 0;
    let totalPages = 0;

    const fileStream = createReadStream(path);
    const rl = createInterface({
        input: fileStream,
    });

    const readLinesFromCSV = new Promise<Record<string, any>[]>((resolve, reject) => {
        rl.on("line", (line) => {
            if ((lineNumber === 0 || lineNumber >= startLine) && lineNumber < endLine) {
                chunk += line + "\n";
            }
            lineNumber++;
        });

        rl.on("close", () => {
            csvParser(chunk, resolve, reject);
        });

        rl.on("error", (error) => {
            reject(error);
        });
    });

    csvData = await readLinesFromCSV;
    totalPages = Math.floor(lineNumber / chunkSize);
    return [totalPages, csvData];
};