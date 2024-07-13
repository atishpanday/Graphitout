import { ResponsiveBar } from "@nivo/bar";

interface BarGraphProps {
    data: Record<string, any>[],
    x: string,
    y: string,
};

export default function BarGraph({ data, x, y }: BarGraphProps) {
    const avgData: Record<string, number> = {};
    const countData: Record<string, number> = {};
    data.map((d, i) => {
        if (d[x] in avgData) {
            avgData[d[x]] += d[y];
            countData[d[x]] += 1;
        }
        else {
            avgData[d[x]] = d[y];
            countData[d[x]] = 1;
        }
    });
    const avgDataArr: Record<string, string | number>[] = [];
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
            colors={{ scheme: 'nivo' }}
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