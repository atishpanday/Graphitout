"use client"

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Pagination from './pagination';
import { useState } from 'react';

export default function DataTable() {
    const csvData = useSelector((state: RootState) => state.csv.data);

    const [index, setIndex] = useState<number>(0);

    return (
        <div className="w-full h-[700px] flex flex-col border-2 rounded-md border-gray-300">
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
                <Pagination index={index} totalPages={10} setIndex={setIndex} />
            </div>
        </div>
    );
}
