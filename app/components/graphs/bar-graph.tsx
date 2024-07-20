import { GraphProps } from "@/app/interfaces/graph";
import { RootState } from "@/app/store/store";
import { getAverageData } from "@/app/utils/get-average-data";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

export default function BarGraph({ totalPages, x, y, graphOptions }: GraphProps) {

    const csvData = useSelector((state: RootState) => state.csv.data);
    const { avgDataArr, leftMargin, bottomMargin } = getAverageData(csvData, x, y);
    return (
        <ResponsiveBar
            data={avgDataArr[0].data as BarDatum[]}
            keys={["y"]}
            indexBy={"x"}
            margin={{ top: 50, right: 50, bottom: bottomMargin, left: leftMargin }} // sin 45 = 0.85
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: graphOptions.colorScheme }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: bottomMargin > 100 ? -45 : 0,
                legend: x,
                legendPosition: "middle",
                legendOffset: bottomMargin - 10,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendPosition: "middle",
                legendOffset: -leftMargin + 10,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            enableLabel={false}
        />
    );
};