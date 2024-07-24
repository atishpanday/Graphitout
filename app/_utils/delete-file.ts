import { backend_url } from "@/environment-variables";

export default async function deleteFile(fileName: string) {
    try {
        const res = await fetch(`${backend_url}/api/delete-file?file-name=${fileName}`, {
            method: "DELETE",
        });
        if (res.ok) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}