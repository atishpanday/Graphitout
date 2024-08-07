import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_store/store";
import Viewer from "./viewer";
import DropDown from "./dropdown";
import { colorSchemes } from "../_utils/color-scheme";
import { ColorScheme, GraphOptions } from "../_interfaces/graph";
import GraphViewer from "./graph-viewer";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";

const chartTypes = ["Bar", "Line", "Scatter"];

export default function Graph() {
    const { csvData, numericalColumns, stringColumns } = useSelector((state: RootState) => state.csv);

    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [chartType, setChartType] = useState<string>(chartTypes[0]);
    const [colorScheme, setColorScheme] = useState<ColorScheme>("set3");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const graphOptions: GraphOptions = {
        colorScheme: colorScheme,
        margin: { top: 20, right: 20, bottom: 60, left: 80 },
        axisOptions: {
            top: null,
            right: null,
            bottom: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: x,
                legendPosition: "middle",
                legendOffset: 40,
                truncateTickAt: 0
            },
            left: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendPosition: "middle",
                legendOffset: -70,
                truncateTickAt: 0
            }
        }
    };

    useEffect(() => {
        if (csvData.length === 0) {
            setX("");
            setY("");
        }
    }, [csvData]);

    useEffect(() => {
        if (chartType === "Scatter") {
            setX(numericalColumns[0]);
            setY(numericalColumns[1]);
        }
    }, [chartType]);

    return (
        <Viewer>
            {
                csvData.length > 0 ?
                    <div className="h-full w-full max-h-full flex flex-col">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex">
                                <DropDown
                                    label="Color scheme"
                                    selected={colorScheme}
                                    setSelected={(selected) => setColorScheme(selected as ColorScheme)}
                                    items={colorSchemes}
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
                                <GraphViewer graphOptions={graphOptions} chartType={chartType} x={x} y={y} />
                                :
                                <iframe src="https://lottie.host/embed/fabd2e03-010a-48f7-aa24-977d12c96253/0EZDPzi5lQ.json" height={"100%"} width={"100%"} />
                        }
                        {
                            (x.length > 0 && y.length > 0) &&
                            <div className="w-full flex justify-end items-center bg-gray-100 shadow-md p-2">
                                <button type="button" onClick={() => setModalOpen(prev => !prev)}>
                                    <GoScreenFull
                                        size={40}
                                        className="bg-white rounded-sm shadow-md cursor-pointer"
                                    />
                                </button>
                                <div
                                    id="full-screen-graph-modal"
                                    tabIndex={-1}
                                    className={`${!modalOpen && 'hidden'} h-full w-full p-12 bg-white bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center`}
                                >
                                    <div className="h-full w-full p-6 flex flex-col bg-white shadow-lg rounded-sm">
                                        <GraphViewer graphOptions={graphOptions} chartType={chartType} x={x} y={y} />
                                        <div className="flex justify-end">
                                            <button className="" type="button" onClick={() => setModalOpen(prev => !prev)}>
                                                <GoScreenNormal
                                                    size={40}
                                                    className="bg-white rounded-sm shadow-md cursor-pointer"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
