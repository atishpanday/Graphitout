import { GraphProps } from "@/app/interfaces/graph";
import { RootState } from "@/app/store/store";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

export default function BarGraph({ totalPages, x, y }: GraphProps) {

    const csvData = useSelector((state: RootState) => state.csv.data);
    const avgData: Record<string, number> = {};
    const countData: Record<string, number> = {};

    const avgDataArr: Record<string, string | number>[] = [];
    csvData.map((d: Record<string, any>, i: number) => {
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
        avgDataArr.push({ [x]: key, [y]: avgData[key] / countData[key] });
    });

    return (
        <ResponsiveBar
            data={avgDataArr}
            keys={[y]}
            indexBy={x}
            margin={{ top: 60, right: 60, bottom: 120, left: 120 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: "dark2" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "",
                legendPosition: "middle",
                legendOffset: 100,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendPosition: "middle",
                legendOffset: -60,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
        />
    );
};