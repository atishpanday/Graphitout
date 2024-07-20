export interface GraphProps {
    totalPages: number,
    x: string,
    y: string,
    graphOptions: GraphOptions,
};

export interface LineGraphData {
    id: string | number,
    data: Array<{
        x: number | string | Date,
        y: number | string | Date,
    }>,
};

export interface ScatterPlotData {
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

export interface GraphOptions {
    colorScheme: ColorScheme
};
