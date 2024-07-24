import { parse, ParseResult } from "papaparse";

const invalidValues = ["none", "null", "na", "n/a", "nan", "", "missing", "nil", "undefined"];

const transformInvalidValues = (value: any) => {
    if (invalidValues.includes(value.toLowerCase()) || value === null || value === undefined) {
        return 0;
    }
    else {
        return value;
    }
};

export default function csvParser(
    chunk: string,
    handleCompletion: (value: any) => void,
    handleError: (error: any) => void,
) {
    parse(chunk, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: transformInvalidValues,
        complete: (results: ParseResult<Record<string, any>>) => {
            handleCompletion(results.data);
        },
        error: (error: any) => {
            handleError(error);
        }
    });
};