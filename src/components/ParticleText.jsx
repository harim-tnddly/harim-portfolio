import React, { useRef, useEffect } from 'react';

const ParticleText = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        let particles = [];
        let animationFrameId;
        let mouse = { x: null, y: null, radius: 100 }; // Interaction radius

        // Configuration
        const CONFIG = {
            text: "SHOT ON HARIM",
            particleColor: '#CFD0D4',
            bgColor: '#141414',
            particleSize: 1.5, // Slightly larger for visibility
            particleCount: 0, // dynamic based on text
            mouseRadius: 80,
            forceMultiplier: 5, // interaction strength
            returnSpeed: 0.1,   // speed to return to text shape
            formationDelay: 3500, // ms before text starts forming
            fontSize: 300,
            fontFamily: 'Anton, sans-serif'
        };

        let isForming = false; // Flag to track state

        // Determine Canvas Size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Particle Class
        class Particle {
            constructor(x, y, targetX, targetY) {
                // Initial State: Random scattered position
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;

                // Target: Where it belongs in the text
                this.targetX = targetX;
                this.targetY = targetY;

                // Motion Variables
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.2 + 0.05;
                this.size = Math.random() * 1.5 + 0.5;
                this.density = (Math.random() * 30) + 1;

                // [KEY MAGIC] : Only 1.5% of particles are visible as "Stars" initially
                this.isStar = Math.random() < 0.015;
                this.opacity = this.isStar ? 1 : 0;
            }

            draw() {
                if (this.opacity <= 0) return;

                ctx.fillStyle = CONFIG.particleColor;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            update() {
                if (!isForming) {
                    // STATE 1: Starfield
                    if (this.isStar) {
                        this.angle += 0.002;
                        this.x += Math.cos(this.angle) * this.speed;
                        this.y += Math.sin(this.angle) * this.speed;

                        if (this.x < 0) this.x = canvas.width;
                        if (this.x > canvas.width) this.x = 0;
                        if (this.y < 0) this.y = canvas.height;
                        if (this.y > canvas.height) this.y = 0;
                    }

                } else {
                    // STATE 2: Formation
                    if (this.opacity < 1) {
                        this.opacity += 0.01;
                    }

                    // [FIX] Check if mouse is active/valid
                    let isMouseActive = mouse.x !== null && mouse.x !== undefined;

                    if (isMouseActive) {
                        let dx = mouse.x - this.x;
                        let dy = mouse.y - this.y;
                        let distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < CONFIG.mouseRadius) {
                            let forceDirectionX = dx / distance;
                            let forceDirectionY = dy / distance;
                            let force = (CONFIG.mouseRadius - distance) / CONFIG.mouseRadius;
                            let directionX = forceDirectionX * force * this.density;
                            let directionY = forceDirectionY * force * this.density;

                            this.x -= directionX;
                            this.y -= directionY;
                        } else {
                            this.returnToText();
                        }
                    } else {
                        this.returnToText();
                    }
                }
            }

            returnToText() {
                if (this.x !== this.targetX) {
                    let dxMove = this.x - this.targetX;
                    this.x -= dxMove * CONFIG.returnSpeed;
                }
                if (this.y !== this.targetY) {
                    let dyMove = this.y - this.targetY;
                    this.y -= dyMove * CONFIG.returnSpeed;
                }
            }
        }

        // Initialize - Calculate Text Positions
        function init() {
            // ⚠️ IMPORTANT: Clear canvas completely before scanning text
            // This prevents existing particles from being rescanned as part of the text
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles = [];

            // Responsive dynamic font size
            const fontSize = Math.min(canvas.width * 0.15, 300); // Max 300px, but scales down

            // 1. Draw Text temporarily to get pixel data
            ctx.font = `${fontSize}px ${CONFIG.fontFamily}`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Center the text
            ctx.fillText(CONFIG.text, canvas.width / 2, canvas.height / 2);

            // 2. Scan pixel data
            const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // [FIX 3] Restore HIGH DENSITY for the text (Gap 4)
            // But we will hide 98% of them during the "Starfield" phase so it's not gross.
            const gap = canvas.width < 800 ? 3 : 4;

            for (let y = 0; y < textCoordinates.height; y += gap) {
                for (let x = 0; x < textCoordinates.width; x += gap) {
                    // check alpha value of pixel (4th byte)
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        let positionX = x;
                        let positionY = y;
                        particles.push(new Particle(positionX, positionY, positionX, positionY));
                    }
                }
            }
        }

        // Animation Loop
        function animate() {
            ctx.fillStyle = CONFIG.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        // Event Listeners
        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        // [FIX] Reset mouse interaction when cursor leaves data window
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Start Sequence after fonts are loaded
        document.fonts.ready.then(() => {
            init();
            animate();

            // Trigger Convergence after delay
            setTimeout(() => {
                isForming = true;
            }, CONFIG.formationDelay);
        });


        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', (e) => {
                mouse.x = e.x;
                mouse.y = e.y;
            });
            window.removeEventListener('mouseout', () => {
                mouse.x = null;
                mouse.y = null;
            });
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', /* [FIX] Scroll with parent, not fixed to screen */
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#141414',
                touchAction: 'none'
            }}
        />
    );
};

export default ParticleText;
