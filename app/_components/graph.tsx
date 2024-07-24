import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import { colorSchemes } from "../_utils/color-scheme";
import { ColorScheme } from "../_interfaces/graph";
import GraphViewer from "./graph-viewer";

const chartTypes = ["Bar", "Line", "Scatter"];

export default function Graph() {
    const { csvData, numericalColumns, stringColumns } = useSelector((state: RootState) => state.csv);

    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>(chartTypes[0]);
    const [colorScheme, setColorScheme] = useState<ColorScheme>("set3");
    const [dataSpan, setDataSpan] = useState<"page" | "cumulative">("page");

    useEffect(() => {
        if (csvData.length === 0) {
            setX("");
            setY("");
        }
    }, [csvData]);

    return (
        <Viewer>
            {
                csvData.length > 0 ?
                    <div className="h-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex">
                                <DropDown
                                    label="Color scheme"
                                    selected={colorScheme}
                                    setSelected={(selected) => setColorScheme(selected as ColorScheme)}
                                    items={colorSchemes}
                                />
                                <DropDown
                                    label="Data span"
                                    selected={dataSpan}
                                    setSelected={(selected) => setDataSpan(selected as ("page" | "cumulative"))}
                                    items={["page", "cumulative"]}
                                />
                            </div>
                            <div className="flex">
                                <DropDown label="x" selected={x} setSelected={setX} items={chartType === "Scatter" ? numericalColumns : stringColumns} />
                                <DropDown label="y" selected={y} setSelected={setY} items={numericalColumns} />
                                <DropDown label="Plot type" selected={chartType} setSelected={setChartType} items={chartTypes} />
                            </div>
                        </div>
                        {
                            (x.length > 0 && y.length > 0)
                                ?
                                <GraphViewer csvData={csvData} colorScheme={colorScheme} dataSpan={dataSpan} chartType={chartType} x={x} y={y} />
                                :
                                <iframe src="https://lottie.host/embed/fabd2e03-010a-48f7-aa24-977d12c96253/0EZDPzi5lQ.json" height={"100%"} width={"100%"} />
                        }
                    </div>
                    :
                    <div className="h-full w-full flex justify-center items-center">
                        <iframe src="https://lottie.host/embed/fabd2e03-010a-48f7-aa24-977d12c96253/0EZDPzi5lQ.json" height={"100%"} width={"100%"} />
                    </div>
            }
        </Viewer >
    );
};
