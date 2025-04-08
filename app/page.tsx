"use client";

import { Provider } from "react-redux";
import { store } from "./_store/store";
import Dashboard from "./_components/dashboard";

export default function Home() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}
