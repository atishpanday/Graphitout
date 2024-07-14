export default async function fetchData(index: number = 0, path: string) {
    const fetchRes = await fetch(`/api/fetch?index=${index}&path=${path}`);
    const { totalPages, data } = await fetchRes.json();
    return { totalPages, data };
};