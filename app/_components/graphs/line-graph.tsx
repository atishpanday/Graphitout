import { GraphProps } from "@/app/_interfaces/graph";
import { ResponsiveLine } from "@nivo/line";

export default function LineGraph({ graphOptions }: GraphProps) {

    return (
        <ResponsiveLine
            data={graphOptions.data}
            margin={graphOptions.margin}
            colors={{ scheme: graphOptions.colorScheme }}
            axisTop={graphOptions.axisOptions.top}
            axisRight={graphOptions.axisOptions.right}
            axisBottom={graphOptions.axisOptions.bottom}
            axisLeft={graphOptions.axisOptions.left}
            areaBaselineValue={Math.min(...graphOptions.data[0].data.map((d) => d.y as number))}
        />
    );
};