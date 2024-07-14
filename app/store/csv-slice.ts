import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CSVState {
    totalPages: number;
    data: Record<string, string>[];
};

const initialState: CSVState = {
    totalPages: 0,
    data: [],
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
        clearCSVData: (state) => {
            state.data = [];
        },
    },
});

export const { setCSVData, setTotalPages, clearCSVData } = csvSlice.actions;

export default csvSlice.reducer;
