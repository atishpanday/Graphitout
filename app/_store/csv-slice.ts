import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CSVState {
    fileName: string,
    totalPages: number,
    csvData: Record<string, string>[],
    numericalColumns: string[],
    stringColumns: string[],
};

const initialState: CSVState = {
    fileName: "",
    totalPages: 0,
    csvData: [],
    numericalColumns: [],
    stringColumns: [],
};

export const csvSlice = createSlice({
    name: 'csv',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setCSVData: (state, action: PayloadAction<Record<string, any>[]>) => {
            state.csvData = action.payload;
        },
        setNumericalColumns: (state, action: PayloadAction<string[]>) => {
            state.numericalColumns = action.payload;
        },
        setStringColumns: (state, action: PayloadAction<string[]>) => {
            state.stringColumns = action.payload;
        },
        clearCSVData: (state) => {
            state.fileName = "";
            state.totalPages = 0;
            state.csvData = [];
            state.numericalColumns = [];
            state.stringColumns = [];
        },
    },
});

export const { setFileName, setTotalPages, setCSVData, setNumericalColumns, setStringColumns, clearCSVData } = csvSlice.actions;

export default csvSlice.reducer;
