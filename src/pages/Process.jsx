import React from 'react';
import './Process.css';

const Process = () => {
    // Generate waveform lines to mimic the reference image
    // The reference shows a dense wave that is loud in the center and quieter at the sides.
    const waveLines = [];
    const count = 300; // Increase density for more detail

    for (let i = 0; i < count; i++) {
        // x position from 0 to 100%
        const x = (i / count) * 100;

        // Normalized position from -1 to 1 (0 is center)
        const normalizedX = (x - 50) / 50;

        // Envelope function: Gaussian-like shape for the main swell
        // e^(-3 * x^2) gives a nice bell curve width
        const envelope = Math.exp(-3 * normalizedX * normalizedX);

        // Combine with high-frequency noise + some randomness
        // The reference has some spikiness
        const noise = Math.random();

        // Calculate height: Base envelope * noise * scale
        const height = (envelope * 0.7 + 0.1) * noise * 45; // Max height ~45% of container

        // Opacity behaves similarly to envelope (fades at edges)
        const opacity = Math.min(envelope + 0.3, 0.8);

        waveLines.push(
            <line
                key={i}
                x1={`${x}%`} y1={`${50 - height / 2}%`}
                x2={`${x}%`} y2={`${50 + height / 2}%`}
                className="wave-line-svg"
                style={{ opacity: opacity }}
            />
        );
    }

    return (
        <section className="process-section" id="process">
            {/* Graphic Background (SVG) */}
            <div className="process-graphic-bg">
                <svg width="100%" height="100%" preserveAspectRatio="none" className="graphic-svg">
                    <defs>
                        <linearGradient id="fade-sides" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="white" stopOpacity="0" />
                            <stop offset="20%" stopColor="white" stopOpacity="1" />
                            <stop offset="80%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 1. Large Concentric Circles (Center Ripple) */}
                    <g className="circles-group" style={{ transformOrigin: '50% 50%' }}>
                        {/* Central Energy Burst Glow */}
                        <circle cx="50%" cy="50%" r="5%" fill="url(#center-glow)" opacity="0.8" />

                        {/* Rings */}
                        {[...Array(20)].map((_, i) => (
                            <circle
                                key={`c-${i}`}
                                cx="50%" cy="50%"
                                r={`${(i + 1) * 2.5}%`}
                                className="bg-circle"
                                style={{ strokeOpacity: Math.max(0.1, 0.8 - i * 0.04) }} // Fade out outward
                            />
                        ))}
                    </g>

                    {/* 2. Waveform Lines - High Contrast */}
                    <g className="waveform-group">
                        {waveLines}
                    </g>

                    {/* Definitions for Glow */}
                    <defs>
                        <radialGradient id="center-glow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>

                {/* Vignette Overlay (kept subtle) */}
                <div className="bg-overlay"></div>
            </div>

            {/* Decorative Arcs - Keep as requested overlay elements */}
            <div className="arc-top-right"></div>
            <div className="arc-bottom-left"></div>

            {/* Content Container */}
            <div className="process-content">
                {/* Vertical Text Top Left */}
                <div className="vertical-text top-left">
                    Think clearly. Create boldly.
                </div>

                {/* Vertical Text Bottom Right */}
                <div className="vertical-text bottom-right">
                    Great design starts with intention.
                </div>

                {/* Center Main Content */}
                <div className="center-container">
                    <div className="text-content">
                        <p className="sub-caption">Keep it simple. Start with purpose.</p>
                        <h1 className="process-title">
                            PORTFOLIO<br />
                            PROCESS
                        </h1>
                    </div>

                    <div className="button-container">
                        <button className="view-btn">
                            view
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
