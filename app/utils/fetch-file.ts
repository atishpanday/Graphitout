export default async function fetchFile(index: number = 0, path: string) {
    const fetchRes = await fetch(`/api/fetch?index=${index}&path=${path}`);
    const { totalPages, data } = await fetchRes.json();
    return { totalPages, data };
};