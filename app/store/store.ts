import { configureStore } from '@reduxjs/toolkit';
import csvReducer from './csv-slice';

export const store = configureStore({
    reducer: {
        csv: csvReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
