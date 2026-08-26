import { useState, useEffect } from 'react';
import { products as fallbackProducts } from '../data/products';
// Import local fallback products

// URL de exportación a CSV de la planilla
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1pog9laSsjVA7h2IVDRw1gf7T2gJf_kRuvjbqdCMqzOI/export?format=csv&gid=0';

/**
 * Determina la categoría del producto según su ID
 * para mantener la estructura visual del catálogo original.
 */
function getCategoryFromId(id) {
    const numId = Number(id);
    if (numId >= 1000) return "COMBOS ¡OFERTAS!";
    if (numId > 0 && numId < 90) return "Tazas de Cerámica";
    if (numId === 90 || numId === 91) return "Botellitas";
    if (numId === 92 || numId === 100 || numId === 101) return "Jarros de Polímero";
    if (numId >= 110 && numId <= 120) return "Polímeros Varios";
    if (numId >= 130 && numId <= 132) return "Llaveros";
    if (numId === 140 || numId === 150) return "Pads y Remeras";
    return "Otros";
}

/**
 * Hook para obtener el catálogo completo de productos dinámicamente.
 * Hace fetch del CSV de Google Sheets, lo parsea y realiza transformaciones
 * para links de imágenes en Google Drive.
 * 
 * Si falla (ej: por permisos), usa products.js local como respaldo (fallback).
 */
export function useCatalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                // Cache busting agregando un timestamp al final
                const urlWithCacheBuster = `${CSV_URL}&t=${Date.now()}`;
                
                const response = await fetch(urlWithCacheBuster, {
                    cache: 'no-store'
                });

                if (!response.ok) throw new Error('No se pudo conectar con Google Sheets');

                const text = await response.text();

                // Si Google Sheets devuelve HTML en lugar de CSV, significa que es privado
                if (text.trim().startsWith('<!DOCTYPE') || text.includes('<html') || text.includes('Google Accounts')) {
                    throw new Error(
                        'El documento es privado. Por favor compártelo como "Cualquier persona con el enlace puede ver" en Google Sheets.'
                    );
                }

                const lines = text.split(/\r?\n/);
                const parsedProducts = [];
                const seenIds = new Set();

                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;

                    // Parsear fila de CSV respetando comillas
                    const row = [];
                    let inQuotes = false;
                    let currentValue = '';

                    for (let j = 0; j < line.length; j++) {
                        const char = line[j];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            row.push(currentValue);
                            currentValue = '';
                        } else {
                            currentValue += char;
                        }
                    }
                    row.push(currentValue);

                    // Columna A (ID), Columna B (Precio), Columna C (Nombre), Columna D (Imagen/Drive), Columna E (Categoría), Columna F (Stock)
                    const id = row[0] ? row[0].replace(/^"|"$/g, '').trim() : '';
                    const priceRaw = row[1] ? row[1].replace(/^"|"$/g, '').trim() : '';
                    const name = row[2] ? row[2].replace(/^"|"$/g, '').trim() : '';
                    const imageUrl = row[3] ? row[3].replace(/^"|"$/g, '').trim() : '';
                    const categoryCol = row[4] ? row[4].replace(/^"|"$/g, '').trim() : '';
                    const stockCol = row[5] ? row[5].replace(/^"|"$/g, '').trim().toLowerCase() : '';

                    // Limpieza: Ignorar si no tiene nombre
                    if (!name) continue;

                    // Determinar si el producto está sin stock
                    // Si la columna F dice "no", "sin stock", "agotado", "0" → sin stock
                    const outOfStockValues = ['no', 'sin stock', 'agotado', '0', 'false'];
                    const isOutOfStock = stockCol ? outOfStockValues.includes(stockCol) : false;

                    // Formatear precio
                    const cleanPrice = priceRaw.replace(/[^0-9.]/g, '');
                    const price = cleanPrice ? Number(cleanPrice) : 0;

                    // Buscar el producto local por ID O por Coincidencia de Nombre para heredar imágenes, descripción y categoría
                    let localProduct = fallbackProducts.find(p => id && String(p.id) === String(id));
                    if (!localProduct && name) {
                        const cleanName = name.toLowerCase().trim();
                        localProduct = fallbackProducts.find(p => 
                            p.title.toLowerCase().trim().includes(cleanName) || 
                            cleanName.includes(p.title.toLowerCase().trim())
                        );
                    }

                    const finalId = id || (localProduct ? String(localProduct.id) : `custom-${i}`);

                    // Evitar productos duplicados en el catálogo (ej. Mate de Polímero doble en CSV)
                    if (seenIds.has(finalId)) continue;
                    seenIds.add(finalId);

                    const finalCategory = categoryCol || (localProduct ? localProduct.category : getCategoryFromId(finalId));

                    parsedProducts.push({
                        id: finalId,
                        title: localProduct?.title || name,
                        price: price || localProduct?.price || 0,
                        image: localProduct?.image || `./assets/logo.png`,
                        images: localProduct?.images || [],
                        category: finalCategory,
                        description: localProduct?.description || `Producto personalizado disponible en catálogo.`,
                        isPromo: localProduct?.isPromo || (finalCategory === "COMBOS ¡OFERTAS!"),
                        outOfStock: isOutOfStock
                    });
                }

                if (parsedProducts.length === 0) {
                    throw new Error('El archivo CSV no contiene registros válidos.');
                }

                setProducts(parsedProducts);
                setError(null);
            } catch (err) {
                console.warn('Error cargando catálogo dinámico (CSV), usando respaldo local:', err.message);
                setError(err.message);
                // Usamos los productos locales estáticos como fallback
                setProducts(fallbackProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalog();
    }, []);

    return { products, loading, error };
}
