import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";
import ScatterPlot from "./graphs/scatterplot";

const chartTypes = ["Bar", "Line", "Scatter"];

export default function Graph() {
    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>("Bar");

    const csvData = useSelector((state: RootState) => state.csv.data);
    const totalPages = useSelector((state: RootState) => state.csv.totalPages);

    return (
        <Viewer>
            {
                csvData.length > 0 &&
                <div className="p-1 h-full flex flex-col justify-between items-center">
                    <div className="w-full flex justify-end items-center text-gray-900">
                        x: <DropDown selected={x} setSelected={setX} items={Object.keys(csvData[0] || [])} />
                        y: <DropDown selected={y} setSelected={setY} items={Object.keys(csvData[0] || [])} />
                        Plot type: <DropDown selected={chartType} setSelected={setChartType} items={chartTypes} />
                    </div>
                    {
                        x.length > 0 && y.length > 0 &&
                        <>
                            {chartType === "Bar" && <BarGraph totalPages={totalPages} x={x} y={y} />}
                            {chartType === "Line" && <LineGraph totalPages={totalPages} x={x} y={y} />}
                            {chartType === "Scatter" && <ScatterPlot totalPages={totalPages} x={x} y={y} />}
                        </>
                    }
                </div>
            }
        </Viewer >
    );
};
