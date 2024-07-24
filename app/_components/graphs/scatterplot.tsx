import { GraphProps } from '@/app/_interfaces/graph';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

export default function ScatterPlot({ graphOptions }: GraphProps) {
    return (
        <ResponsiveScatterPlot
            data={graphOptions.data}
            margin={graphOptions.margin}
            colors={{ scheme: graphOptions.colorScheme }}
            axisTop={graphOptions.axisOptions.top}
            axisRight={graphOptions.axisOptions.right}
            axisBottom={graphOptions.axisOptions.bottom}
            axisLeft={graphOptions.axisOptions.left}
        />
    );
};