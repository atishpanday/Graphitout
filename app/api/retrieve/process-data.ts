import { createReadStream } from "fs";
import { parse, ParseResult } from "papaparse";
import { createInterface } from "readline";

const chunkSize = 100;

const invalidValues = ["none", "null", "na", "n/a", "nan", "", "missing", "nil", "undefined"];

const transformInvalidValues = (value: any) => {
    if (invalidValues.includes(value.toLowerCase()) || value === null || value === undefined) {
        return 0;
    }
    else {
        return value;
    }
};


export default async function processData(index: string, path: string) {
    const startLine = parseInt(index || "0") * chunkSize + 1;
    const endLine = startLine + chunkSize;
    let chunk = "";
    let csvData: Record<string, any>[] = [];
    let lineNumber = 0;

    const fileStream = createReadStream(path as string);
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
            parse(chunk, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                transform: transformInvalidValues,
                complete: (results: ParseResult<Record<string, any>>) => {
                    resolve(results.data);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });

        rl.on("error", (error) => {
            reject(error);
        });
    });

    csvData = await readLinesFromCSV;
    return csvData;
}