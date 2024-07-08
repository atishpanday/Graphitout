export default async function uploadFile(file: File | null) {
    if (!file) {
        console.log("No file selected");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    return res;
}