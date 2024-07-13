import React from "react";

export default function Viewer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-3/4 overflow-y-scroll overflow-x-scroll border-2 rounded-md border-gray-300">
            {children}
        </div>
    )
};