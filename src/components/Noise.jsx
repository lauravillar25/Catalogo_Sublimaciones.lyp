import React, { useRef, useEffect } from 'react';

const Noise = ({
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15, // intensity
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;
        const patternCtx = patternCanvas.getContext('2d');
        const patternData = patternCtx.createImageData(patternSize, patternSize);

        const updatePattern = () => {
            for (let i = 0; i < patternData.data.length; i += 4) {
                const value = Math.random() * 255;
                patternData.data[i] = value;
                patternData.data[i + 1] = value;
                patternData.data[i + 2] = value;
                patternData.data[i + 3] = patternAlpha;
            }
            patternCtx.putImageData(patternData, 0, 0);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const pattern = ctx.createPattern(patternCanvas, 'repeat');
            ctx.fillStyle = pattern;
            ctx.save();
            ctx.scale(patternScaleX, patternScaleY);
            ctx.fillRect(0, 0, canvas.width / patternScaleX, canvas.height / patternScaleY);
            ctx.restore();
        };

        const loop = () => {
            if (frame % patternRefreshInterval === 0) {
                updatePattern();
                draw();
            }
            frame++;
            window.requestAnimationFrame(loop);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        loop();

        return () => window.removeEventListener('resize', handleResize);
    }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5,
                opacity: 0.1,
            }}
        />
    );
};

export default Noise;
