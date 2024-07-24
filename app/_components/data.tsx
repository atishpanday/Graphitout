import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import UploadFile from './upload-file';
import DataTable from './data-table';

export default function Data() {
    const csvData = useSelector((state: RootState) => state.csv.csvData);
    return (
        csvData.length === 0 ? <UploadFile /> : <DataTable />
    );
};
