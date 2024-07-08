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

export default function csvParse(file: File, onParseComplete: (results: ParseResult<Record<string, string>>) => void) {
    parse(file,
        {
            delimiter: ",",
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transform: transformInvalidValues,
            complete: onParseComplete,
        }
    );
};