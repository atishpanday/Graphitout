import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

const chartTypes = ["Bar", "Area", "Line", "Scatter"];

export default function Graph() {
    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>("Bar");

    const csvData = useSelector((state: RootState) => state.csv.data);

    return (
        <Viewer>
            {
                csvData.length > 0 && <div className="p-1 h-full flex flex-col justify-between items-center">
                    <div className="w-full flex justify-end items-center text-gray-900">
                        x: <DropDown selected={x} setSelected={setX} items={Object.keys(csvData[0] || [])} />
                        y: <DropDown selected={y} setSelected={setY} items={Object.keys(csvData[0] || [])} />
                        Plot type: <DropDown selected={chartType} setSelected={setChartType} items={chartTypes} />
                    </div>
                    {
                        x.length > 0 && y.length > 0 &&
                        <VictoryChart theme={VictoryTheme.material} width={800} height={500}>
                            <VictoryBar data={csvData} x={x} y={y} style={{ data: { fill: "#ff00ff" } }} />
                            <VictoryAxis tickValues={csvData.map(data => data[y])} label={x} />
                            <VictoryAxis dependentAxis label={y} />
                        </VictoryChart>
                    }
                </div>
            }
        </Viewer >
    );
};
