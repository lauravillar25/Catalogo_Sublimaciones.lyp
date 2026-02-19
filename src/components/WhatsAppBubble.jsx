import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppBubble = ({ phoneNumber }) => {
    const waMessage = 'Hola, quisiera pedir un presupuesto por mayor.';
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

    return (
        <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <div className="whatsapp-content">
                <span className="whatsapp-text">Pedir presupuesto por mayor</span>
                <i className="fab fa-whatsapp"></i>
            </div>
        </motion.a>
    );
};

export default WhatsAppBubble;
