"use client"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Pagination from './pagination';
import { useEffect, useState } from 'react';
import fetchFile from '../utils/fetch-file';
import { setCSVData, setTotalPages } from '../store/csv-slice';

export default function DataTable() {
    const csvData = useSelector((state: RootState) => state.csv.data);
    const totalPages = useSelector((state: RootState) => state.csv.totalPages);

    const [index, setIndex] = useState<number>(0);

    const dispatch = useDispatch();

    const handlePageChange = async () => {
        const filePath = localStorage.getItem("file-path")?.toString();
        const { totalPages, data } = await fetchFile(index, filePath || "");
        dispatch(setCSVData(data));
        dispatch(setTotalPages(totalPages))
    };

    useEffect(() => {
        handlePageChange();
    }, [index]);

    return (
        <div className="w-full max-h-lvh h-3/4 flex flex-col border-2 rounded-md border-gray-300">
            <div className="flex-10 overflow-y-scroll overflow-x-scroll rounded-t-md">
                <table className="bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 divide-x divide-white">
                            {Object.keys(csvData[0]).map((key) => (
                                <th
                                    key={key}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {csvData.map((row, index) => (
                            <tr key={index} className="divide-x divide-gray-200">
                                {Object.values(row).map((value, i) => (
                                    <td
                                        key={i}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex-1 flex justify-end p-1 bg-gray-50 shadow-md rounded-b-md">
                <Pagination index={index} totalPages={totalPages} setIndex={setIndex} handlePageChange={handlePageChange} />
            </div>
        </div>
    );
};
