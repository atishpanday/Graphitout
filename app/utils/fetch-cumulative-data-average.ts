import fetchData from "./fetch-data";

export default async function fetchCumulativeDataAverage(_totalPages: number, x: string, y: string) {
    const avgData: Record<string, number> = {};
    const countData: Record<string, number> = {};

    const avgDataArr: Record<string, string | number>[] = [];

    const filePath = localStorage.getItem("file-path");

    for (let i = 0; i < _totalPages; i++) {
        try {
            const { totalPages, data } = await fetchData(i, filePath as string);
            data.map((d: Record<string, any>, i: number) => {
                if (d[x] in avgData) {
                    avgData[d[x]] += d[y];
                    countData[d[x]] += 1;
                }
                else {
                    avgData[d[x]] = d[y];
                    countData[d[x]] = 1;
                }
            });
            Object.keys(avgData).map((key, i) => {
                avgDataArr.push({ [x]: key, [y]: avgData[key] / countData[key] });
            });
        } catch (error) {
            console.log(error);
        }
    }

    return avgDataArr;
};