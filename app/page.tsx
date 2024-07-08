"use client"

import { Provider } from "react-redux";
import Dashboard from "./components/dashboard";
import { store } from "./store/store";

export default function Home() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
};
