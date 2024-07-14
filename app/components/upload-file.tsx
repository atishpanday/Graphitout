import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { useDispatch } from "react-redux";
import { setCSVData, setTotalPages } from "../store/csv-slice";
import uploadFile from "../utils/upload-file";
import fetchData from "../utils/fetch-data";

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
                const filePath = (await uploadRes.json()).path
                localStorage.setItem("file-path", filePath);
                const { totalPages, data } = await fetchData(0, filePath);
                dispatch(setCSVData(data));
                dispatch(setTotalPages(totalPages));
            }
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [file]);

    return (
        <div
            {...getRootProps()}
            className={`h-3/4 w-full flex flex-col justify-center items-center border-4 border-dashed ${isDragActive ? "border-blue-500" : "border-gray-300"} rounded-md`}
        >
            <form>
                <input {...getInputProps()} />
                <button
                    type="button"
                    className="px-4 py-2 m-1 font-semibold border-2 border-solid border-blue-500 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Upload or drag and drop a file (.csv, .txt, .xlsx)
                </button>
                <div>{file?.name}</div>
            </form>
        </div>
    );
};
