"use client"

import { Provider } from "react-redux";
import Dashboard from "./_components/dashboard";
import { store } from "./_store/store";

export default function Home() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
};
