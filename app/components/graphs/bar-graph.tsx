import { GraphProps } from "@/app/interfaces/graph";
import fetchCumulativeDataAverage from "@/app/utils/fetch-cumulative-data-average";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

export default function BarGraph({ totalPages, x, y }: GraphProps) {

    const [avgDataArr, setAvgDataArr] = useState<Record<string, any>[]>([]);

    const getAvgData = async () => {
        const data = await fetchCumulativeDataAverage(totalPages, x, y);
        setAvgDataArr(data);
    };

    useEffect(() => {
        getAvgData();
    }, []);

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