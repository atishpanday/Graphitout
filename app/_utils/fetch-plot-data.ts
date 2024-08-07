import { backend_url } from "@/environment-variables";

export default async function fetchPlotData(fileName: string, x: string, y: string, chartType: string) {
    try {
        const res = await fetch(`${backend_url}/api/fetch-plot-data?file-name=${fileName}&x=${x}&y=${y}&chart-type=${chartType}`);
        const { data } = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};