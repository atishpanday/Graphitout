import { GraphProps } from "@/app/_interfaces/graph";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

export default function BarGraph({ graphOptions, plotData }: GraphProps) {

    return (
        <ResponsiveBar
            data={plotData[0].data as BarDatum[]}
            keys={["y"]}
            indexBy={"x"}
            margin={graphOptions.margin}
            colors={{ scheme: graphOptions.colorScheme }}
            axisTop={graphOptions.axisOptions.top}
            axisRight={graphOptions.axisOptions.right}
            axisBottom={graphOptions.axisOptions.bottom}
            axisLeft={graphOptions.axisOptions.left}
        />
    );
};