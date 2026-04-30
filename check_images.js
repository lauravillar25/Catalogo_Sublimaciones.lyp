import fs from 'fs';
import path from 'path';
import { products, galleryImages } from 'file:///d:/Usuario/Desktop/catalogo%20subli/src/data/products.js';

const publicDir = 'd:\\Usuario\\Desktop\\catalogo subli\\public';
let missingImages = [];

products.forEach(p => {
    if (p.image) {
        const fullPath = path.join(publicDir, p.image).replace(/\\/g, '/');
        if (!fs.existsSync(fullPath)) {
            missingImages.push({ id: p.id, type: 'main', path: p.image });
        }
    }
    if (p.images && p.images.length > 0) {
        p.images.forEach(img => {
            const fullPath = path.join(publicDir, img).replace(/\\/g, '/');
            if (!fs.existsSync(fullPath)) {
                missingImages.push({ id: p.id, type: 'gallery', path: img });
            }
        });
    }
});

console.log(JSON.stringify(missingImages, null, 2));
