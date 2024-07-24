import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import Pagination from './pagination';
import { useState } from 'react';
import fetchDataChunks from '../_utils/fetch-data-chunks';
import { clearCSVData, setCSVData } from '../_store/csv-slice';
import deleteFile from '../_utils/delete-file';
import Viewer from './viewer';

export default function DataTable() {
    const { fileName, totalPages, csvData } = useSelector((state: RootState) => state.csv);

    const [index, setIndex] = useState<number>(0);

    const dispatch = useDispatch();

    const handlePageChange = async (ind: number) => {
        const { totalPages, data } = await fetchDataChunks(ind, fileName || "");
        dispatch(setCSVData(data));
    };

    const handleDeleteData = async () => {
        await deleteFile(fileName || "");
        dispatch(clearCSVData());
    };

    return (
        <Viewer>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="overflow-y-scroll overflow-x-scroll">
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
                <div className="flex justify-between py-2 px-4 bg-gray-50 ring-1 ring-gray-200">
                    <div className="flex justify-start items-center">
                        <button className="px-4 py-2 mx-1 text-white rounded-sm bg-red-500 hover:bg-red-400" onClick={() => handleDeleteData()}>Delete</button>
                    </div>
                    <Pagination index={index} totalPages={totalPages} setIndex={setIndex} handlePageChange={handlePageChange} />
                </div>
            </div>
        </Viewer>
    );
};
