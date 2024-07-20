import { GraphProps } from "@/app/interfaces/graph";
import { RootState } from "@/app/store/store";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";

export default function LineGraph({ totalPages, x, y, graphOptions }: GraphProps) {
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
        avgDataArr.push({ x: key, y: avgData[key] / countData[key] });
    });
    return (
        <ResponsiveLine
            data={[{ id: "0", data: avgDataArr }]}
            margin={{ top: 50, right: 50, bottom: 150, left: 100 }}
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
                tickRotation: -45,
                legend: x,
                legendOffset: 140,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendOffset: -70,
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
            areaBaselineValue={avgDataArr.reduce((accumulator, currentValue) => Math.min(accumulator as number, currentValue.y as number), avgDataArr[0].y)}
            enableTouchCrosshair={true}
            useMesh={false}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: true,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};