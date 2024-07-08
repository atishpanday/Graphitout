import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import UploadFile from './upload-file';
import DataTable from './data-table';

export default function Data() {
    const csvData = useSelector((state: RootState) => state.csv.data);
    return (
        csvData.length === 0 ? <UploadFile /> : <DataTable />
    );
};
