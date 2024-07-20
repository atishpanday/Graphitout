import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CSVState {
    totalPages: number;
    data: Record<string, string>[];
    numericalColumns: string[];
    stringColumns: string[];
};

const initialState: CSVState = {
    totalPages: 0,
    data: [],
    numericalColumns: [],
    stringColumns: [],
};

export const csvSlice = createSlice({
    name: 'csv',
    initialState,
    reducers: {
        setCSVData: (state, action: PayloadAction<Record<string, any>[]>) => {
            state.data = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setNumericalColumns: (state, action: PayloadAction<string[]>) => {
            state.numericalColumns = action.payload;
        },
        setStringColumns: (state, action: PayloadAction<string[]>) => {
            state.stringColumns = action.payload;
        },
        clearCSVData: (state) => {
            state.data = [];
        },
    },
});

export const { setCSVData, setTotalPages, setNumericalColumns, setStringColumns, clearCSVData } = csvSlice.actions;

export default csvSlice.reducer;
