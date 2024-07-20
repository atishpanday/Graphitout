import { GraphProps } from "@/app/interfaces/graph";
import { RootState } from "@/app/store/store";
import { getAverageData } from "@/app/utils/get-average-data";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";

export default function LineGraph({ totalPages, x, y, graphOptions }: GraphProps) {
    const csvData = useSelector((state: RootState) => state.csv.data);
    const { avgDataArr, leftMargin, bottomMargin } = getAverageData(csvData, x, y);
    return (
        <ResponsiveLine
            data={avgDataArr}
            margin={{ top: 50, right: 50, bottom: bottomMargin, left: leftMargin }}
            xScale={{ type: 'point' }}
            colors={{ scheme: graphOptions.colorScheme }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: bottomMargin > 100 ? -45 : 0,
                legend: x,
                legendOffset: bottomMargin - 10,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendOffset: -leftMargin + 10,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            pointLabel="data.y"
            enableArea={true}
            areaBaselineValue={Math.min(...avgDataArr[0].data.map((d) => d.y as number))}
            enableTouchCrosshair={true}
            useMesh={false}
        />
    );
};