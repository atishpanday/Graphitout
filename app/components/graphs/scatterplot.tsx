import { GraphProps, GraphData } from '@/app/interfaces/graph';
import { RootState } from '@/app/store/store';
import { getAverageData } from '@/app/utils/get-average-data';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { useSelector } from 'react-redux';

export default function ScatterPlot({ totalPages, x, y, graphOptions }: GraphProps) {
    const csvData = useSelector((state: RootState) => state.csv.data);

    const { avgDataArr, leftMargin, bottomMargin } = getAverageData(csvData, x, y);
    return (
        <ResponsiveScatterPlot
            data={avgDataArr}
            margin={{ top: 50, right: 50, bottom: bottomMargin, left: leftMargin }}
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
        />
    );
};