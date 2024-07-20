import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";
import ScatterPlot from "./graphs/scatterplot";
import { colorSchemes } from "../utils/color-scheme";
import { ColorScheme, GraphOptions } from "../interfaces/graph";

const chartTypes = ["Bar", "Line", "Scatter"];

export default function Graph() {
    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>("Bar");
    const [graphOptions, setGraphOptions] = useState<GraphOptions>({
        colorScheme: "set3"
    });

    const { data: csvData, totalPages, numericalColumns, stringColumns } = useSelector((state: RootState) => state.csv);

    return (
        <Viewer>
            {
                csvData.length > 0 &&
                <div className="p-1 h-full flex flex-col justify-between items-center">
                    <div className="w-full flex justify-between items-center text-gray-900">
                        <div className="flex">
                            <DropDown label="Color scheme" selected={graphOptions.colorScheme} setSelected={(selected) => setGraphOptions(prev => ({ ...prev, colorScheme: selected as ColorScheme }))} items={colorSchemes} />
                        </div>
                        <div className="flex">
                            <DropDown label="x" selected={x} setSelected={setX} items={chartType === "Scatter" ? numericalColumns : stringColumns} />
                            <DropDown label="y" selected={y} setSelected={setY} items={numericalColumns} />
                            <DropDown label="Plot type" selected={chartType} setSelected={setChartType} items={chartTypes} />
                        </div>
                    </div>
                    {
                        x.length > 0 && y.length > 0 &&
                        <>
                            {chartType === "Bar" && <BarGraph totalPages={totalPages} x={x} y={y} graphOptions={graphOptions} />}
                            {chartType === "Line" && <LineGraph totalPages={totalPages} x={x} y={y} graphOptions={graphOptions} />}
                            {chartType === "Scatter" && <ScatterPlot totalPages={totalPages} x={x} y={y} graphOptions={graphOptions} />}
                        </>
                    }
                </div>
            }
        </Viewer >
    );
};
