import React from "react"
import Data from "./data"
import Graph from "./graph"

export default function Dashboard() {

    return (
        <div className="w-full h-lvh grid grid-cols-2 gap-x-2 gap-y-2 p-4">
            <Data />
            <Graph />
        </div>
    )
}
