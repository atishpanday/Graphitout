import { backend_url } from "@/environment-variables";

export default async function uploadFile(file: File | null) {
    if (!file) {
        console.log("No file selected");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${backend_url}/api/upload-file`, {
        method: "POST",
        body: formData,
    });
    return res;
}