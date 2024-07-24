import { backend_url } from "@/environment-variables";

export default async function fetchDataChunks(index: number = 0, fileName: string) {
    const fetchRes = await fetch(`${backend_url}/api/fetch-data-chunks?index=${index}&file-name=${fileName}`);
    const { totalPages, data } = await fetchRes.json();
    console.log(data);
    return { totalPages, data };
};