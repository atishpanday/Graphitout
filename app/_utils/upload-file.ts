import { backend_url } from "@/environment-variables";

export default async function uploadFile(formData: FormData) {
    if (!formData) {
        console.log("No file selected");
        return;
    }
    const res = await fetch(`${backend_url}/api/upload-file`, {
        method: "POST",
        body: formData,
    });
    return res;
}
