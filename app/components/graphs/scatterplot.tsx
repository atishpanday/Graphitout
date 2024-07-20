import { GraphProps, ScatterPlotData } from '@/app/interfaces/graph';
import { RootState } from '@/app/store/store';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { useSelector } from 'react-redux';

export default function ScatterPlot({ totalPages, x, y, graphOptions }: GraphProps) {
    const csvData = useSelector((state: RootState) => state.csv.data);
    const avgData: Record<string, number> = {};
    const countData: Record<string, number> = {};

    const avgDataArr: ScatterPlotData[] = [{ id: "", data: [] }];
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
        avgDataArr[0].data.push({ x: key, y: avgData[key] / countData[key] });
    });
    return (
        <ResponsiveScatterPlot
            data={avgDataArr}
            margin={{ top: 60, right: 60, bottom: 90, left: 90 }}
            xScale={{ type: 'linear', min: 0, max: 'auto' }}
            xFormat=">-.2f"
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            yFormat=">-.2f"
            colors={{ scheme: graphOptions.colorScheme }}
            blendMode="multiply"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: x,
                legendPosition: 'middle',
                legendOffset: 60,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: y,
                legendPosition: 'middle',
                legendOffset: -60,
                truncateTickAt: 0
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};