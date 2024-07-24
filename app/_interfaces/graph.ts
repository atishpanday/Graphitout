export interface GraphProps {
    graphOptions: GraphOptions,
};

export interface GraphData {
    id: string | number,
    data: Array<{
        x: number | string | Date,
        y: number | string | Date,
    }>,
};

export type ColorScheme = "nivo"
    | "category10"
    | "accent"
    | "dark2"
    | "paired"
    | "pastel1"
    | "pastel2"
    | "set1"
    | "set2"
    | "set3"
    | "brown_blueGreen"
    | "purpleRed_green"
    | "pink_yellowGreen"
    | "purple_orange"
    | "red_blue"
    | "red_grey"
    | "red_yellow_blue"
    | "red_yellow_green"
    | "spectral"
    | "blues"
    | "greens"
    | "greys"
    | "oranges"
    | "purples"
    | "reds"
    | "blue_green"
    | "blue_purple"
    | "green_blue"
    | "orange_red"
    | "purple_blue_green"
    | "purple_blue"
    | "purple_red"
    | "red_purple"
    | "yellow_green_blue"
    | "yellow_green"
    | "yellow_orange_brown"
    | "yellow_orange_red";

export interface Margin {
    top: number,
    right: number,
    bottom: number,
    left: number,
};

export interface AxisOptions {
    tickSize: number,
    tickPadding: number,
    tickRotation: number,
    legend: string,
    legendPosition: "start" | "middle" | "end" | undefined,
    legendOffset: number,
    truncateTickAt: number,
};

export interface AxisOptionsOrientations {
    top: AxisOptions | null,
    right: AxisOptions | null,
    bottom: AxisOptions | null,
    left: AxisOptions | null,
};

export interface GraphOptions {
    data: GraphData[],
    colorScheme: ColorScheme,
    margin: Margin,
    axisOptions: AxisOptionsOrientations,
};

export interface AverageData {
    avgDataArr: GraphData[],
    leftMargin: number,
    bottomMargin: number,
};
