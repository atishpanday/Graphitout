export default async function fetchFile(index: number = 0, path: string) {
    const fetchRes = await fetch(`/api/retrieve?index=0&path=${path}`);
    const data = await fetchRes.json();
    return data;
}