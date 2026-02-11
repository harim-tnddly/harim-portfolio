import React from 'react';
import './Project.css';

// 이미지 import
import orbitImg from '../assets/img/project/orbit.png';
import planet1 from '../assets/img/project/planet_1.png';
import planet2 from '../assets/img/project/planet_2.png';
import project1Img from '../assets/img/project/project_1.png';
import project2Img from '../assets/img/project/project_2.png';
import project3Img from '../assets/img/project/project_3.png';
import circle1 from '../assets/img/project/circle_1.png';
import circle2 from '../assets/img/project/circle_2.png';

const Project = () => {
    // State for active project and rotation
    const [activeId, setActiveId] = React.useState(1);
    const [rotation, setRotation] = React.useState(0); // Current interpolation value
    const [targetRotation, setTargetRotation] = React.useState(0); // Target rotation degree
    const [isContentChanging, setContentChanging] = React.useState(false); // For content transition

    // Use velocity for elastic orbit distortion (spring effect)
    const velocityRef = React.useRef(0);
    const [orbitOffset, setOrbitOffset] = React.useState(0);
    const [tick, setTick] = React.useState(0); // Force render for continuous pulse
    const [hoveredNode, setHoveredNode] = React.useState(null); // Track hover state

    // Ref for scrolling to content
    const contentRef = React.useRef(null);

    // Animation Loop
    React.useEffect(() => {
        let animationFrame;
        const animate = () => {
            setRotation(prev => {
                const diff = targetRotation - prev;
                // Calculate pseudo-velocity based on the step size
                const step = diff * 0.05;
                velocityRef.current = step;

                // Update orbit offset based on velocity (makes it wiggle when moving)
                setOrbitOffset(step * 0.5); // Multiplier triggers the distortion intensity

                if (Math.abs(diff) < 0.1) {
                    velocityRef.current = 0;
                    setOrbitOffset(0); // Snap back when stopped
                    // Don't return early; keep loop running for pulse
                    return targetRotation;
                }
                return prev + step;
            });
            setTick(t => t + 1); // Force re-render for pulse animation
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [targetRotation]);

    // Handle Click - Update Active ID and Target Rotation
    const handlePlanetClick = (id) => {
        if (id === activeId) return;

        // Scroll to content view smoothly (with delay to ensure render)
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        // 1. Start Exit Animation
        setContentChanging(true);

        // 2. Trigger Orbit Rotation
        // Base target phases for each planet to be at bottom (90deg)
        // P1: 0, P2: -120, P3: -240
        let basePhase = 0;
        if (id === 1) basePhase = 0;
        if (id === 2) basePhase = -120;
        if (id === 3) basePhase = -240;

        // Calculate next target rotation that is at least 360 degrees away (one full spin)
        // Ensure consistent direction (counter-clockwise / negative)
        let nextTarget = targetRotation - 360;

        // Adjust to match the basePhase
        // (nextTarget - basePhase) should be divisible by 360
        const remainder = (nextTarget - basePhase) % 360;
        nextTarget -= remainder;

        // Extra check: ensure it really spins enough
        if (nextTarget > targetRotation - 200) {
            nextTarget -= 360;
        }

        setTargetRotation(nextTarget);

        // 3. Change Content after 400ms (match CSS transition)
        setTimeout(() => {
            setActiveId(id);
            setContentChanging(false); // Start Enter Animation
        }, 400);
    };

    // Calculate position on ellipse and Pulse Scale
    // Container size is approx 100% x 100%. Center is (50%, 50%).
    // Ellipse Radii: RX ~ 45%, RY ~ 38%
    const getPlanetStyle = (startAngle, id) => {
        const angle = (startAngle + rotation) * (Math.PI / 180); // Convert to radians
        const rx = 45; // Horizontal Radius (%)
        const ry = 28; // Vertical Radius (%) - Adjusted from 38 to 28 so bottom is 78%

        // Calculate percentages
        const x = 50 + rx * Math.cos(angle);
        const y = 50 + ry * Math.sin(angle); // 90deg is bottom

        // Pulse Calculation (Synced)
        const time = Date.now();
        const cycle = time % 4000;
        let scale = 1;

        // Priority: Active > Hover > Pulse
        if (id === activeId) {
            scale = 1.2;
        } else if (id === hoveredNode) {
            scale = 1.1;
        } else {
            // Pulse: 2 beats in first 1 sec
            if (cycle < 1000) {
                const t = cycle / 1000;
                // -cos(4PI * t) starts at -1(0) -> 1(1) -> -1(0) -> 1(1) -> -1(0)
                const val = (1 - Math.cos(t * 4 * Math.PI)) * 0.5;
                scale = 1 + 0.1 * val;
            } else {
                scale = 1;
            }
        }

        const zIndex = Math.floor(y); // Lower y = lower z-index (back)

        return {
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${scale})`, // JS driven scale
            zIndex: zIndex,
            opacity: 1, // Always fully visible
            transition: 'transform 0.1s linear' // Smooth out framerate jitters, but fast enough for pulse
        };
    };


    // Project Data
    const projects = [
        {
            id: 1,
            title: "Papa recipe Web Renewal",
            desc: `파파레시피 웹 리뉴얼 프로젝트는 기존 사이트의 친근한 이미지는 유지하면서도,
            K-뷰티 브랜드로서의 신뢰와 고급스러움을 강화하기 위해 진행된 개선 프로젝트입니다.
            브랜드 스토리·제품 정보·구매 흐름을 자연스럽게 연결해
            사용자가 제품 가치를 더 명확하게 이해하고 집중할 수 있도록
            UX/UI 전반을 재구성했습니다.`,
            meta: "기간 : 2025.12.01 ~ 2025.12.29    총 인원 : 6명    기여도 : 30%",
            mainImg: project1Img,
            siteUrl: "https://suin-yu.github.io/paparecipe/",
            planUrl: "https://www.figma.com/proto/HUbMCY9N27WPpr53i5BVnz/K-Brand-2%EC%A1%B0?page-id=4278%3A815&node-id=4278-1064&viewport=49%2C-250%2C0.21&t=MecBHI7ECbaEwq8B-1&scaling=scale-down-width&content-scaling=fixed"
        },
        {
            id: 2,
            title: "F1 Fandom App - Force 1",
            desc: `Force-1은 F1의 역동성과 팬덤 문화의 소통 경험을 
동시에 강화하기 위해 만들어진 팬 플랫폼입니다. 
경기 일정·팀/드라이버 정보·순위 등 핵심 정보를 한 흐름으로 연결하고, 
Live Talk·게시글·투표 등 팬 커뮤니티 기능을 자연스럽게 통합하여 
사용자가 F1을 ‘보고, 알고, 함께 이야기하는’ 경험을 직관적으로 즐길 수 있도록 
UX/UI를 재구성했습니다.`,
            meta: "기간 : 2026.01.10 ~ 2026.02.04    총 인원 : 7명    기여도 : 25%",
            mainImg: project2Img,
            siteUrl: "https://force1-five.vercel.app/",
            planUrl: "https://www.figma.com/proto/Iv1nL4EndfSqweSIu1oEEQ/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_2%EC%A1%B0?page-id=3432%3A12449&node-id=3432-12450&viewport=75%2C-10597%2C0.38&t=ylnn3APbKTPH2A5W-1&scaling=min-zoom&content-scaling=fixed"
        },
        {
            id: 3,
            title: "Finance App – SSobi",
            desc: `Sobi는 소비 관리의 복잡함을 줄이고, 사용자가 일상 속에서 자연스럽게 
지출 습관을 형성할 수 있도록 만든 금융 습관 앱입니다.
게이미피케이션 기반 캐릭터 성장 구조와 직관적인 UI를 결합해
‘오늘의 목표 금액 설정 → 소비 기록 → 보상 경험’으로 이어지는 흐름을 단순화하고,
사용자가 재무 관리에 꾸준히 동기부여를 느낄 수 있도록 UX/UI를 설계했습니다.`,
            meta: "기간 : 2025.09.08 ~ 2025.10.22    총 인원 : 1명    기여도 : 100%",
            mainImg: project3Img
        }
    ];

    // Get current active project data
    const activeProject = projects.find(p => p.id === activeId);

    return (
        <section className="project-section" id="project">

            {/* 1. Orbit Header */}
            <div className="project-header">
                <h2 className="project-title">PROJECT<br />ORBIT</h2>

                <div className="orbit-container">

                    {/* CSS Orbit Circles - Elastic Wiggle Effect */}
                    {/* They distort based on orbitOffset (velocity) and return to 0 */}
                    <div className="orbit-circles-bg">
                        {/* Circle 1: Original +8deg. Add offset. */}
                        <div className="orbit-circle circle-1" style={{ transform: `translate(-50%, -50%) rotate(${8 + orbitOffset}deg)` }}></div>

                        {/* Circle 2: Original 0deg. Counter-rotate. */}
                        <div className="orbit-circle circle-2" style={{ transform: `translate(-50%, -50%) rotate(${-orbitOffset * 0.5}deg)` }}></div>

                        {/* Circle 3: Original 0deg. Subtle shift. */}
                        <div className="orbit-circle circle-3" style={{ transform: `translate(-50%, -50%) rotate(${orbitOffset * 0.2}deg)` }}></div>

                        {/* Circle 4: Original -15deg. Add offset. */}
                        <div className="orbit-circle circle-4" style={{ transform: `translate(-50%, -50%) rotate(${-15 + orbitOffset}deg)` }}></div>
                    </div>

                    {/* Planet 01 (Start Angle: 90deg - Bottom) */}
                    <div
                        className={`planet-node ${activeId === 1 ? 'active' : ''}`}
                        style={getPlanetStyle(90, 1)}
                        onClick={() => handlePlanetClick(1)}
                        onMouseEnter={() => setHoveredNode(1)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <img src={planet1} alt="Planet 1" />
                        <span className="planet-label">project 01</span>
                    </div>

                    {/* Planet 02 (Start Angle: 210deg - Left Top) */}
                    <div
                        className={`planet-node ${activeId === 2 ? 'active' : ''}`}
                        style={getPlanetStyle(210, 2)}
                        onClick={() => handlePlanetClick(2)}
                        onMouseEnter={() => setHoveredNode(2)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <img src={planet2} alt="Planet 2" />
                        <span className="planet-label">project 02</span>
                    </div>

                    {/* Planet 03 (Start Angle: 330deg - Right Top) */}
                    <div
                        className={`planet-node ${activeId === 3 ? 'active' : ''}`}
                        style={getPlanetStyle(330, 3)}
                        onClick={() => handlePlanetClick(3)}
                        onMouseEnter={() => setHoveredNode(3)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <span className="planet-label">project 03</span>
                        <img src={planet2} alt="Planet 3" />
                    </div>
                </div>
            </div>

            {/* 수직선 */}
            <div className="vertical-line"></div>

            {/* 2. Content Area (3-Part Layout) */}
            <div className="project-content" ref={contentRef}>

                <div className="project-3part-layout">

                    {/* Left: Main Project Image */}
                    <div className={`part-left ${isContentChanging ? 'content-hidden' : ''}`}>
                        <img key={activeProject.id} src={activeProject.mainImg} alt={`Project ${activeProject.id} Main`} className="img-project-main" />
                    </div>

                    {/* Middle: Circle 2 Background (SVG) */}
                    <div className="part-middle">

                        {/* [New] Texture Stroke Arc (Circle 2 위에 위치) */}
                        <svg className="svg-stroke-arc" xmlns="http://www.w3.org/2000/svg" width="883" height="561" viewBox="0 0 883 561" fill="none">
                            <g filter="url(#filter0_g_1158_10552)" style={{ mixBlendMode: 'hard-light' }}>
                                <path d="M105.176 459.959C99.2006 269.85 244.938 111.003 430.69 105.164C616.443 99.3257 771.868 248.707 777.844 438.816" stroke="url(#paint0_linear_1158_10552)" strokeOpacity="0.3" strokeWidth="10" />
                            </g>
                            <defs>
                                <filter id="filter0_g_1158_10552" x="0" y="0" width="882.844" height="560.117" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="451" />
                                    <feDisplacementMap in="shape" scale="200" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                                    <feMerge result="effect1_texture_1158_10552">
                                        <feMergeNode in="displacedImage" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="paint0_linear_1158_10552" x1="430.69" y1="105.164" x2="441.51" y2="449.388" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="#999999" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <svg className="svg-circle2" xmlns="http://www.w3.org/2000/svg" width="681" height="681" viewBox="0 0 681 681" fill="none">
                            <g filter="url(#filter0_d_1158_10550)" style={{ mixBlendMode: 'hard-light' }}>
                                <path d="M677 336.5C677 522.344 526.344 673 340.5 673C154.656 673 4 522.344 4 336.5C4 150.656 154.656 0 340.5 0C526.344 0 677 150.656 677 336.5Z" fill="url(#paint0_linear_1158_10550)" fillOpacity="0.2" shapeRendering="crispEdges" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1158_10550" x="0" y="0" width="681" height="681" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1158_10550" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1158_10550" result="shape" />
                                </filter>
                                <linearGradient id="paint0_linear_1158_10550" x1="968.299" y1="-224.333" x2="968.299" y2="448.667" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="#999999" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Right: SVG Circle 1 + Text */}
                    <div className={`part-right ${isContentChanging ? 'content-hidden' : ''}`}>
                        {/* [FIX] SVG Graphic Replacement */}
                        <svg className="svg-circle1" xmlns="http://www.w3.org/2000/svg" width="886" height="886" viewBox="0 0 886 886" fill="none">
                            <g filter="url(#filter0_d_1158_10551)" style={{ mixBlendMode: 'hard-light' }}>
                                <path d="M882 439C882 681.453 685.453 878 443 878C200.547 878 4 681.453 4 439C4 196.547 200.547 0 443 0C685.453 0 882 196.547 882 439Z" fill="url(#paint0_linear_1158_10551)" fillOpacity="0.2" shapeRendering="crispEdges" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1158_10551" x="0" y="0" width="886" height="886" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1158_10551" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1158_10551" result="shape" />
                                </filter>
                                <linearGradient id="paint0_linear_1158_10551" x1="1262.03" y1="-292.667" x2="1262.03" y2="585.333" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="#999999" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="project-text-box">
                            <span className="project-number">{String(activeProject.id).padStart(2, '0')}.</span>
                            <h3>{activeProject.title}</h3>
                            <p className="project-desc">{activeProject.desc}</p>
                            <p className="project-meta">{activeProject.meta}</p>

                            <div className="btn-group">
                                <button className="btn-view" onClick={() => activeProject.planUrl && window.open(activeProject.planUrl, '_blank')}>View Plan</button>
                                <button className="btn-view" onClick={() => activeProject.siteUrl && window.open(activeProject.siteUrl, '_blank')}>View Site</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Project;
