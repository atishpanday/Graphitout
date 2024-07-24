import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";
import ScatterPlot from "./graphs/scatterplot";
import { colorSchemes } from "../_utils/color-scheme";
import { ColorScheme, GraphOptions } from "../_interfaces/graph";
import { getAverageData } from "../_utils/get-average-data";

const chartTypes = ["Bar", "Line", "Scatter"];

export default function Graph() {
    const { csvData, totalPages, numericalColumns, stringColumns } = useSelector((state: RootState) => state.csv);

    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>(chartTypes[0]);

    const { avgDataArr, leftMargin, bottomMargin } = useMemo(() => getAverageData(csvData, x, y), [x, y, csvData]);

    const [graphOptions, setGraphOptions] = useState<GraphOptions>({
        data: avgDataArr,
        colorScheme: "set3",
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        axisOptions: {
            top: null,
            right: null,
            bottom: null,
            left: null
        }
    });

    useEffect(() => {
        setGraphOptions((prev) => ({
            ...prev,
            data: avgDataArr,
            colorScheme: "set3",
            margin: { top: 50, right: 50, bottom: bottomMargin, left: leftMargin },
            axisOptions: {
                top: null,
                right: null,
                bottom: {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: bottomMargin > 100 ? -45 : 0,
                    legend: x,
                    legendPosition: "middle",
                    legendOffset: bottomMargin - 10,
                    truncateTickAt: 0
                },
                left: {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: y,
                    legendPosition: "middle",
                    legendOffset: -leftMargin + 10,
                    truncateTickAt: 0
                }
            }
        }))
    }, [avgDataArr, leftMargin, bottomMargin]);

    return (
        <Viewer>
            {
                csvData.length > 0 &&
                <div className="h-full flex flex-col justify-between items-center">
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
                            {chartType === "Bar" && <BarGraph graphOptions={graphOptions} />}
                            {chartType === "Line" && <LineGraph graphOptions={graphOptions} />}
                            {chartType === "Scatter" && <ScatterPlot graphOptions={graphOptions} />}
                        </>
                    }
                </div>
            }
        </Viewer >
    );
};
