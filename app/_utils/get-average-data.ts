import { AverageData, GraphData } from "../_interfaces/graph";

export function getAverageData(data: Array<Record<string, any>>, x: string, y: string): AverageData {
    if (x.length > 0 && y.length > 0 && data.length > 0) {
        const avgData: Record<string, number> = {};
        const countData: Record<string, number> = {};
        let longestXLabel: number = 1;
        let longestYLabel: number = 1;

        const avgDataArr: GraphData[] = [{ id: "0", data: [] }];
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

        const bottomMargin = Math.max(50, longestXLabel * 5 * 0.85) + 20;
        const leftMargin = Math.max(50, longestYLabel * 5 * 0.85) + 20;

        return {
            avgDataArr,
            leftMargin,
            bottomMargin,
        };
    }
    else {
        return {
            avgDataArr: [],
            leftMargin: 0,
            bottomMargin: 0,
        }
    }
};