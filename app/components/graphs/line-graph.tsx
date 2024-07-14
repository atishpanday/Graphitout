import { GraphProps } from "@/app/interfaces/graph";
import { RootState } from "@/app/store/store";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";

export default function LineGraph({ totalPages, x, y }: GraphProps) {
    const csvData = useSelector((state: RootState) => state.csv.data);
    const transformedData = csvData.map((d, i) => ({ id: i, data: [{ x: d[x], y: d[y] }] }))
    return (
        <ResponsiveLine
            data={transformedData}
        />
    );
};