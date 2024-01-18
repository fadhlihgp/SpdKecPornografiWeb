import axios from "axios";
import Cookies from "js-cookie";

export const handleDownloadFile = async (apiUrl) => {
    try {
        // Panggil API yang mengembalikan file langsung
        const response = await axios.post(apiUrl, null ,{
            responseType: 'blob', // Set responseType ke 'blob' untuk mengambil respons sebagai blob
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        });

        // Dapatkan header 'Content-Disposition' dari respons
        const contentDispositionHeader = response.headers['content-disposition'];

        // Ekstrak nama file dari header menggunakan regex
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = fileNameRegex.exec(contentDispositionHeader);
        const fileName = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : 'default-file-name';

        // Buat URL objek untuk file blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Buat elemen <a> dan simulasikan klik untuk memulai unduhan
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Bebaskan sumber daya URL objek
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error:', error);
        // alert('Error: ' + error);
    }
}