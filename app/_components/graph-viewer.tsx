import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";
import ScatterPlot from "./graphs/scatterplot";
import { GraphData, GraphViewerProps } from "../_interfaces/graph";
import fetchPlotData from "../_utils/fetch-plot-data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_store/store";

export default function GraphViewer({ graphOptions, chartType, x, y }: GraphViewerProps) {

    const { fileName } = useSelector((state: RootState) => state.csv);
    const [plotData, setPlotData] = useState<GraphData[]>([{ id: "0", data: [] }]);

    const getPlotData = async () => {
        const responseData = await fetchPlotData(fileName, x, y, chartType);
        const data = responseData.map((d: Record<string, any>) => ({ x: d[x], y: d[y] }));
        setPlotData(prev => [{ id: "0", data: data }]);
    };

    useEffect(() => {
        getPlotData();
    }, [x, y, chartType]);

    const graphType = () => {
        switch (chartType) {
            case "Bar":
                return (
                    <BarGraph graphOptions={graphOptions} plotData={plotData} />
                );
            case "Line":
                return (
                    <LineGraph graphOptions={graphOptions} plotData={plotData} />
                );
            case "Scatter":
                return (
                    <ScatterPlot graphOptions={graphOptions} plotData={plotData} />
                );
            default:
                return (
                    <BarGraph graphOptions={graphOptions} plotData={plotData} />
                );
        };
    };

    return (
        <div className="w-full h-full">
            {graphType()}
        </div>
    );
};