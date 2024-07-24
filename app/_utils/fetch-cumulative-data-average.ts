import { AverageData, GraphData } from "../_interfaces/graph";
import fetchDataChunks from "./fetch-data-chunks";

export default async function fetchCumulativeDataAverage(_totalPages: number, x: string, y: string, fileName: string): Promise<AverageData> {
    const avgData: Record<string, number> = {};
    const countData: Record<string, number> = {};
    let longestXLabel: number = 1;
    let longestYLabel: number = 1;

    const avgDataArr: GraphData[] = [];
    let bottomMargin = 0;
    let leftMargin = 0;

    for (let i = 0; i < _totalPages; i++) {
        try {
            const { totalPages, data } = await fetchDataChunks(i, fileName);
            data.map((d: Record<string, any>, i: number) => {
                if (d[x].length > longestXLabel) {
                    longestXLabel = d[x].length;
                }
                if (d[y].length > longestYLabel) {
                    longestYLabel = d[y].length;
                }
                if (d[x] in avgData) {
                    avgData[d[x]] += d[y];
                    countData[d[x]] += 1;
                }
                else {
                    avgData[d[x]] = d[y];
                    countData[d[x]] = 1;
                }
            });
            Object.keys(avgData).map((key, i) => {
                avgDataArr[0].data.push({ x: key, y: avgData[key] / countData[key] });
            });

            bottomMargin = Math.max(50, longestXLabel * 5 * 0.85) + 20;
            leftMargin = Math.max(50, longestYLabel * 5 * 0.85) + 20;

        } catch (error) {
            console.log(error);
        }
    }

    return {
        avgDataArr,
        leftMargin,
        bottomMargin,
    };
};