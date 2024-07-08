import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CSVState {
    data: Record<string, string>[];
}

const initialState: CSVState = {
    data: [],
};

export const csvSlice = createSlice({
    name: 'csv',
    initialState,
    reducers: {
        setCSVData: (state, action: PayloadAction<Record<string, string>[]>) => {
            state.data = action.payload;
        },
    },
});

export const { setCSVData } = csvSlice.actions;

export default csvSlice.reducer;
