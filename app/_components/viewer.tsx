import React from "react";

export default function Viewer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[calc(100vh/1.5)] p-4 overflow-y-scroll overflow-x-scroll bg-white shadow-md">
            {children}
        </div>
    )
};