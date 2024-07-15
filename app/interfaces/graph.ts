export interface GraphProps {
    totalPages: number,
    x: string,
    y: string,
};

export interface LineGraphData {
    id: string | number
    data: Array<{
        x: number | string | Date
        y: number | string | Date
    }>
}

export interface ScatterPlotData {
    id: string | number
    data: Array<{
        x: number | string | Date
        y: number | string | Date
    }>
}