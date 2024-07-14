export default async function deleteFile(filePath: string) {
    try {
        const res = await fetch(`/api/delete-file?path=${filePath}`, {
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