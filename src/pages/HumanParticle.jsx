import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HumanParticle = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const interactionRef = useRef({ x: 0, y: 0, isHovering: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        const particleCount = 20000;

        // Interaction event listeners
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            interactionRef.current.x = e.clientX - rect.left;
            interactionRef.current.y = e.clientY - rect.top;
            interactionRef.current.isHovering = true;
        };
        const handleMouseLeave = () => {
            interactionRef.current.isHovering = false;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        const svgW = 511;
        const svgH = 1270;
        const pathData = "M179.092 38.526C243.492 -19.474 370.258 5.35935 425.592 25.026C209.99 125.825 313.426 197.026 392.094 220.027C300.494 252.027 359.594 327.027 400.594 360.527C272.194 394.927 352.427 408.861 408.594 411.527L352.594 457.527C307.794 544.327 371.26 602.027 408.594 620.027C432.594 605.627 483.927 671.361 506.594 706.027L423.594 728.027C278.394 712.827 278.427 819.027 296.594 874.027C251.794 896.027 277.927 944.861 296.594 966.527C249.394 999.327 284.26 1039.19 307.594 1055.03C277.194 1073.43 294.927 1102.03 307.594 1114.03C181.994 1172.03 247.927 1201.53 296.594 1209.03C282.194 1245.03 302.594 1262.36 314.594 1266.53H113.589C87.9858 1212.13 74.9212 1147.53 71.5893 1122.03C37.9893 1105.63 13.9227 1070.53 6.08932 1055.03C-15.9107 976.227 68.5893 873.194 113.589 831.527L171.089 766.027C190.689 728.827 230.256 681.527 247.589 662.527C280.389 629.727 240.256 540.527 216.089 500.027C208.489 469.227 144.589 458.861 113.589 457.527C74.3893 454.327 78.256 417.194 85.0893 399.027C71.4893 390.627 70.4227 380.194 71.5893 376.027L85.0893 360.527C70.6893 353.327 70.0893 342.527 71.5893 338.027L85.0893 317.527C66.6893 311.527 59.756 296.027 58.5893 289.027L119.592 220.027C107.192 131.227 154.092 62.0265 179.092 38.526Z";

        const handleResize = (w, h) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const scale = Math.min((w * 0.95) / svgW, (h * 0.85) / svgH);
            const viewW = svgW * scale;
            const viewH = svgH * scale;
            const offsetX = (w - viewW) / 2;
            const offsetY = (h - viewH) / 2;

            const offscreen = document.createElement('canvas');
            offscreen.width = svgW;
            offscreen.height = svgH;
            const offCtx = offscreen.getContext('2d');
            const path = new Path2D(pathData);
            offCtx.fillStyle = 'black';
            offCtx.fill(path);
            const maskData = offCtx.getImageData(0, 0, svgW, svgH).data;

            gsap.killTweensOf(particles);
            particles = [];

            // 1. Pre-calculate valid points from maskData to avoid rejection sampling
            const validPoints = [];
            for (let y = 0; y < svgH; y += 2) { // Skip every other row for speed/sparsity
                for (let x = 0; x < svgW; x += 2) {
                    const index = (y * svgW + x) * 4 + 3;
                    if (maskData[index] > 10) {
                        validPoints.push({ x, y });
                    }
                }
            }

            gsap.killTweensOf(particles);
            particles = [];

            // Reduced count for drawing performance (12k is still very dense)
            const optimalCount = 6000;

            for (let i = 0; i < optimalCount; i++) {
                let rx, ry;
                let type = 'ambient';

                // Target approx 45% for silhouette
                if (i < optimalCount * 0.45 && validPoints.length > 0) {
                    // Optimized: Pick random from valid points directy
                    // Apply weighted random to maintain density gradient if desired
                    // Simple uniform sampling from valid points is much faster
                    const pt = validPoints[Math.floor(Math.random() * validPoints.length)];
                    rx = pt.x;
                    ry = pt.y;

                    // Apply density weights (optional, simplified for speed)
                    const xRatio = rx / svgW;
                    const xWeight = Math.pow(1 - xRatio, 1.8);
                    const normalizedY = (ry / svgH) * 2 - 1;
                    const yWeight = 1 - Math.pow(Math.abs(normalizedY), 4);

                    // Rejection based on density only (not shape) - rare retry
                    if (Math.random() > (xWeight * yWeight * 1.5)) {
                        // If rejected by density, pick another (low cost)
                        const pt2 = validPoints[Math.floor(Math.random() * validPoints.length)];
                        rx = pt2.x; ry = pt2.y;
                    }
                    type = 'silhouette';
                } else {
                    // Ambient noise logic (Optimized)
                    const amWX = svgW * 1.8;
                    const amOffX = -svgW * 0.4;
                    rx = Math.floor(Math.random() * amWX + amOffX);
                    ry = Math.floor(Math.random() * svgH * 1.15 - svgH * 0.075);

                    const normalizedY = ((ry + svgH * 0.075) / (svgH * 1.15)) * 2 - 1;
                    const yFade = 1 - Math.pow(Math.abs(normalizedY), 4.5);
                    const normalizedX = ((rx - amOffX) / amWX) * 2 - 1;
                    const xFade = 1 - Math.pow(Math.abs(normalizedX), 4.5);

                    if (Math.random() > (yFade * xFade)) continue;
                }

                // ... Rest of initialization
                const xRatio = rx / svgW;
                const edgeSoftness = type === 'silhouette' ? Math.pow(xRatio, 2.5) * 40 : 0;

                // ... (Continue to push)
                const xNoise = (Math.random() - 0.5) * (type === 'silhouette' ? (6 + edgeSoftness) : 180);
                const yNoise = (Math.random() - 0.5) * (type === 'silhouette' ? 3 : 70);

                // Scatter logic: "Exploded" view rather than pure random noise
                // Particles start scattered widely but somewhat related to their destination area
                // This prevents the "TV Static" look and feels like a dispersed soul/cloud.
                particles.push({
                    startX: rx * scale + offsetX + (Math.random() - 0.5) * w * 1.5, // Expanded cloud
                    startY: ry * scale + offsetY + (Math.random() - 0.5) * h * 1.5,
                    targetX: rx * scale + offsetX + xNoise,
                    targetY: ry * scale + offsetY + yNoise,
                    progress: 0,
                    size: type === 'silhouette'
                        ? (Math.random() * 2.0 + 0.8) * (1 - xRatio * 0.3)
                        : (Math.random() * 1.0 + 0.9), // Ambient only +0.2 (0.9~1.9)
                    noiseSeed: Math.random() * 2000,
                    speed: 0.001 + Math.random() * 0.002,
                    opacity: 0, // Hidden until motion starts
                    type: type,
                    baseX: 0,
                    baseY: 0
                });
            }

            gsap.registerPlugin(ScrollTrigger);

            gsap.to(particles, {
                progress: 1,
                opacity: (i, target) => target.type === 'silhouette' ? 1 : 0.45,
                duration: 0.8, // Faster duration
                stagger: {
                    each: 0.00004,
                    from: "random"
                },
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".faq-section",
                    start: "10% 30%",
                    end: "90% 70%",         // Disperse when leaving
                    toggleActions: "play reverse play reverse",
                }
            });
        };

        const animate = () => {
            const rect = container.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.fillStyle = '#141414';
            const time = Date.now();

            // Mouse Interaction Logic
            const mx = interactionRef.current.x;
            const my = interactionRef.current.y;
            const isHovering = interactionRef.current.isHovering;
            const radius = 120; // Radius of the interaction circle

            particles.forEach(p => {
                let currentX = p.startX + (p.targetX - p.startX) * p.progress;
                let currentY = p.startY + (p.targetY - p.startY) * p.progress;

                // Natural drift
                const driftX = Math.sin(time * p.speed + p.noiseSeed) * (p.type === 'silhouette' ? 1.5 : 3.5);
                const driftY = (Math.random() - 0.5) * 0.4;

                let finalX = currentX + driftX;
                let finalY = currentY + driftY;

                // Interactive Repulsion (Soft Lens/Bulge Effect - AWARDS style)
                if (isHovering) {
                    const dx = finalX - mx;
                    const dy = finalY - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const interactionRadius = 130;  // Matches the visual scale

                    if (dist < interactionRadius) {
                        const angle = Math.atan2(dy, dx);

                        // Calculate a smooth "bulge" force.
                        // Force is strongest at center (pushes particles out), weakest at edge.
                        // This creates a "magnifying glass" effect where center is sparse (zoomed in) and edges are dense.
                        const forceFactor = (interactionRadius - dist) / interactionRadius;
                        const repulsionStrength = 50; // Controls how much the sphere "bulges"

                        // Use power function for spherical feel
                        const displacement = Math.pow(forceFactor, 1.5) * repulsionStrength;

                        finalX += Math.cos(angle) * displacement;
                        finalY += Math.sin(angle) * displacement;
                    }
                }

                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            // White ring removed to match AWARDS reference (density defines the shape)

            animationFrameId = requestAnimationFrame(animate);
        };

        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) handleResize(width, height);
            }
        });
        ro.observe(container);

        animate();
        return () => {
            ro.disconnect();
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            gsap.killTweensOf(particles);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block', pointerEvents: 'none' }} />
        </div>
    );
};

export default HumanParticle;
