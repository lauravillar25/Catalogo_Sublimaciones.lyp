/**
 * Transforma un enlace de Google Drive compartido en un enlace directo de imagen.
 * Soporta formatos:
 * - https://drive.google.com/file/d/[ID]/view?usp=sharing
 * - https://drive.google.com/open?id=[ID]
 * - Enlaces directos ya formateados
 * 
 * @param {string} url - El enlace de Google Drive
 * @returns {string} Enlace directo de la imagen
 */
export function convertDriveLink(url) {
    if (!url) return '';
    const trimmedUrl = url.trim();
    if (trimmedUrl.includes('drive.google.com')) {
        // Formato /file/d/[ID]/view
        const fileDMatch = trimmedUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileDMatch && fileDMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
        }
        // Formato open?id=[ID] u otros parámetros id=
        const idMatch = trimmedUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
        }
    }
    return trimmedUrl;
}
