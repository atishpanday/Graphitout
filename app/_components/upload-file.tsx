import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { useDispatch } from "react-redux";
import { setCSVData, setFileName, setNumericalColumns, setStringColumns, setTotalPages } from "../_store/csv-slice";
import uploadFile from "../_utils/upload-file";
import fetchDataChunks from "../_utils/fetch-data-chunks";
import Viewer from "./viewer";

export default function UploadFile() {
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useDispatch();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, [file]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv", ".txt"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        },
        multiple: false,
    });

    const handleSubmit = async () => {
        if (file) {
            const uploadRes = await uploadFile(file);

            if (uploadRes?.ok) {
                const fileName = (await uploadRes.json()).fileName
                dispatch(setFileName(fileName));
                const { totalPages, data, numericalColumns, stringColumns } = await fetchDataChunks(0, fileName);
                dispatch(setCSVData(data));
                dispatch(setNumericalColumns(numericalColumns));
                dispatch(setStringColumns(stringColumns));
                dispatch(setTotalPages(totalPages));
            }
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [file]);

    return (
        <Viewer>
            <div
                {...getRootProps()}
                className={`w-full h-full flex flex-col justify-center items-center border-4 border-dashed ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
            >
                <form>
                    <input {...getInputProps()} />
                    <button
                        type="button"
                        className="px-4 py-2 m-1 font-semibold rounded-sm shadow-md hover:bg-gray-100"
                    >
                        Upload or drag and drop a file (.csv, .txt, .xlsx)
                    </button>
                    <div>{file?.name}</div>
                </form>
            </div>
        </Viewer>
    );
};
