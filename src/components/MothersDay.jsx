import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { madresPromos, PROMO_END } from '../data/madresPromos';

// Paleta rosa/violeta — una por tarjeta
const PALETTES = [
  { gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', border: '#f9a8d4', accent: '#be185d', badge: '#e11d48' },
  { gradient: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)', border: '#c4b5fd', accent: '#7c3aed', badge: '#7c3aed' },
  { gradient: 'linear-gradient(135deg, #fff0f6 0%, #fce7f3 100%)', border: '#f9a8d4', accent: '#db2777', badge: '#be185d' },
  { gradient: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)', border: '#d8b4fe', accent: '#9333ea', badge: '#7e22ce' },
];
const FALLBACK_ICONS = ['🎁', '☕', '🌷', '💝', '🛁', '🎀'];

/* ── Countdown ── */
function Countdown({ targetDate }) {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) return setT(null);
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!t) return null;
  return (
    <div className="md-countdown">
      {[['Días', t.days], ['Hs', t.hours], ['Min', t.minutes], ['Seg', t.seconds]].map(([label, val]) => (
        <div key={label} className="md-countdown-block">
          <span className="md-countdown-num">{String(val).padStart(2, '0')}</span>
          <span className="md-countdown-lbl">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Mini carrusel de imágenes ── */
function ImageCarousel({ images, title, fallbackIcon }) {
  const [current, setCurrent] = useState(0);
  const hasImages = images && images.length > 0;

  return (
    <div className="md-promo-img-wrap">
      {hasImages ? (
        <>
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={`/assets/${images[current]}`}
              alt={title}
              className="md-promo-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </AnimatePresence>
          {images.length > 1 && (
            <div className="md-img-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`md-img-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="md-promo-icon-fallback">{fallbackIcon}</div>
      )}
    </div>
  );
}

/* ── Tarjeta de promo ── */
function PromoCard({ promo, index, phoneBase }) {
  const pal  = PALETTES[index % PALETTES.length];
  const icon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];

  const priceLabel = promo.price ? promo.price : 'Consultar precio';
  const isPriceSet = !!promo.price;

  return (
    <motion.div
      className="md-promo-card"
      style={{ background: pal.gradient, borderColor: pal.border }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 * index }}
      whileHover={{ y: -7, boxShadow: `0 20px 48px ${pal.border}cc` }}
    >
      {/* Badge */}
      <span className="md-promo-badge" style={{ background: pal.badge }}>{promo.badge}</span>

      {/* Imagen o ícono */}
      <ImageCarousel images={promo.images} title={promo.title} fallbackIcon={icon} />

      {/* Info */}
      <h3 className="md-promo-title" style={{ color: pal.accent }}>{promo.title}</h3>
      <p className="md-promo-desc">{promo.description}</p>

      {/* Lista de productos incluidos */}
      <ul className="md-promo-includes">
        {promo.includes.map((item, i) => (
          <li key={i}>
            <span className="md-include-dot" style={{ background: pal.accent }}></span>
            {item}
          </li>
        ))}
      </ul>

      {/* Precio */}
      <div
        className={`md-promo-price ${!isPriceSet ? 'md-promo-price--consult' : ''}`}
        style={{ color: pal.accent }}
      >
        {priceLabel}
      </div>

      {/* CTA WhatsApp */}
      <a
        href={`${phoneBase}${encodeURIComponent(promo.whatsapp)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="md-promo-btn"
        style={{ background: pal.accent }}
      >
        <i className="fab fa-whatsapp"></i>
        {isPriceSet ? 'Pedir ahora' : 'Consultar precio'}
      </a>
    </motion.div>
  );
}

/* ── Sección principal ── */
export default function MothersDay({ whatsappNumber }) {
  const phoneBase = `https://wa.me/${whatsappNumber}?text=`;

  return (
    <motion.section
      className="md-section"
      id="dia-de-la-madre"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* ── Header ── */}
      <div className="md-header">
        <div className="md-petals" aria-hidden="true">
          {['🌸','💐','🌹','🌷','🌸','💐','🌹','🌷'].map((p, i) => (
            <span key={i} className="md-petal" style={{ '--delay': `${i * 0.5}s` }}>{p}</span>
          ))}
        </div>

        <motion.div
          className="md-header-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="md-eyebrow">🌸 Especial octubre 2026</span>
          <h2 className="md-title">Día de la Madre</h2>
          <p className="md-subtitle">
            Regalá amor hecho a mano. Combos 100% personalizados
            para la persona más especial de tu vida.
          </p>
          <div className="md-countdown-wrapper">
            <span className="md-countdown-label-top">⏳ Promos disponibles por</span>
            <Countdown targetDate={PROMO_END} />
          </div>
        </motion.div>
      </div>

      {/* ── Grilla de combos ── */}
      <div className="md-promos-grid">
        {madresPromos.map((promo, idx) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            index={idx}
            phoneBase={phoneBase}
          />
        ))}
      </div>

      {/* ── Nota al pie ── */}
      <div className="md-footer-note">
        <i className="fas fa-truck"></i>&nbsp;
        Envíos a domicilio en Corrientes Capital&nbsp;·&nbsp;
        <i className="fas fa-clock"></i>&nbsp;
        Pedidos con anticipación para asegurar entrega en fecha
      </div>
    </motion.section>
  );
}
