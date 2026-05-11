// URL de tu Google Apps Script - se configura en src/config/sheetsConfig.js
import { SHEETS_API_URL } from '../config/sheetsConfig';

import { useState, useEffect } from 'react';

/**
 * Hook que obtiene los precios desde Google Sheets.
 * Si falla, usa los precios del archivo products.js como respaldo.
 */
export function usePrices(products) {
    const [pricedProducts, setPricedProducts] = useState(products);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!SHEETS_API_URL) {
            // Si no hay URL configurada, usamos los precios del archivo
            setLoading(false);
            return;
        }

        const fetchPrices = async () => {
            try {
                const response = await fetch(SHEETS_API_URL);
                if (!response.ok) throw new Error('No se pudo conectar con Google Sheets');

                const prices = await response.json();

                // Aplicar los precios de la planilla a los productos
                const updated = products.map(product => {
                    const newPrice = prices[String(product.id)];
                    if (newPrice !== undefined && newPrice !== null && newPrice !== '') {
                        return { ...product, price: Number(newPrice) };
                    }
                    return product;
                });

                setPricedProducts(updated);
            } catch (err) {
                console.warn('No se pudieron cargar precios desde Google Sheets, usando precios locales.', err);
                setError(err.message);
                // Fallback: mantiene los precios del archivo
                setPricedProducts(products);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    return { pricedProducts, loading, error };
}
