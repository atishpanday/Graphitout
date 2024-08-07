import { GraphProps } from '@/app/_interfaces/graph';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

export default function ScatterPlot({ graphOptions, plotData }: GraphProps) {
    return (
        <ResponsiveScatterPlot
            data={plotData}
            margin={graphOptions.margin}
            colors={{ scheme: graphOptions.colorScheme }}
            axisTop={graphOptions.axisOptions.top}
            axisRight={graphOptions.axisOptions.right}
            axisBottom={graphOptions.axisOptions.bottom}
            axisLeft={graphOptions.axisOptions.left}
        />
    );
};