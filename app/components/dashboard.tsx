import React from "react"
import Data from "./data"
import Graph from "./graph"
import Banner from "./banner"

export default function Dashboard() {

    return (
        <div className="p-4">
            <Banner />
            <div className="w-full h-lvh grid grid-cols-2 gap-x-2 gap-y-2 my-4">
                <Data />
                <Graph />
            </div>
        </div>
    );
};
