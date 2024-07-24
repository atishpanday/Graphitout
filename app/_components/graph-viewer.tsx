import { getAverageData } from "../_utils/get-average-data";
import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";
import ScatterPlot from "./graphs/scatterplot";
import { GraphOptions, GraphViewerProps } from "../_interfaces/graph";
import { useSelector } from "react-redux";
import { RootState } from "../_store/store";

export default function GraphViewer({ csvData, colorScheme, dataSpan, chartType, x, y }: GraphViewerProps) {

    const { fileName, totalPages } = useSelector((state: RootState) => state.csv);

    const { avgDataArr, leftMargin, bottomMargin } = getAverageData(csvData, x, y);

    const graphOptions: GraphOptions = {
        data: avgDataArr,
        colorScheme: colorScheme,
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
    };

    switch (chartType) {
        case "Bar":
            return (
                <BarGraph graphOptions={graphOptions} />
            );
        case "Line":
            return (
                <LineGraph graphOptions={graphOptions} />
            );
        case "Scatter":
            return (
                <ScatterPlot graphOptions={graphOptions} />
            );
        default:
            return (
                <BarGraph graphOptions={graphOptions} />
            );
    };
};