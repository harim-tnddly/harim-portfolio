import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Coding.css';

// Import Images
import circlesImg from '../assets/img/coding/circles.png';
import arrowRight from '../assets/img/coding/icons_right.png';
import arrowLeft from '../assets/img/coding/icons_left.png';

import musignImg from '../assets/img/coding/musign.png';
import crewImg from '../assets/img/coding/crew_a_la_mode.png';
import kcaImg from '../assets/img/coding/kca.png';
import hanwhaImg from '../assets/img/coding/hanwha_chemical.png';
import ystudioImg from '../assets/img/coding/ystudio.png';
import phomeinImg from '../assets/img/coding/phomein.png';
import conciergeImg from '../assets/img/coding/concierge.png';
import daebangImg from '../assets/img/coding/daebang.png';

const Coding = () => {
    // Initial Data
    const initialData = [
        {
            id: 1,
            title: "Musign",
            img: musignImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 2,
            title: "Crew a la mode",
            img: crewImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 3,
            title: "KCA",
            img: kcaImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 4,
            title: "Hanwha Chemical",
            img: hanwhaImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 5,
            title: "YStudio",
            img: ystudioImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 6,
            title: "PhoMein",
            img: phomeinImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 7,
            title: "Concierge",
            img: conciergeImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        },
        {
            id: 8,
            title: "Daebang",
            img: daebangImg,
            desc: ` 본 프로젝트는 실제 서비스의 UI/UX 구조와 기능 구현 방식을 
            분석·재현하기 위해 진행된 클론코딩 작업입니다.
            핵심 화면 구성과 인터랙션을 동일하게 구현하며, 원본에서 추상적으로 
            숨겨져 있던 로직을 직접 설계해보며 서비스 전체 흐름과 컴포넌트 구조를 
            깊이 이해하는 데 목적을 두었습니다.`
        }
    ];

    const [items, setItems] = useState(initialData);
    const [isAnimating, setIsAnimating] = useState(null); // 'next' | 'prev' | null
    const timerRef = useRef(null);

    const handleNext = () => {
        // If animating, force finish immediately
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.shift();
                newItems.push(firstItem);
                return newItems;
            });
            setIsAnimating(null);
            timerRef.current = null;
            return;
        }

        setIsAnimating('next');

        // Wait for animation to finish before swapping data
        timerRef.current = setTimeout(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.shift();
                newItems.push(firstItem);
                return newItems;
            });

            // Cleanup phase: momentarily disable transition for swapped items to prevent fly-back
            setIsAnimating('next-cleanup');

            timerRef.current = setTimeout(() => {
                setIsAnimating(null);
                timerRef.current = null;
            }, 50); // Short delay to allow DOM to update with "none" transition
        }, 800); // 0.8s Duration
    };

    const handlePrev = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const lastItem = newItems.pop();
                newItems.unshift(lastItem);
                return newItems;
            });
            setIsAnimating(null);
            timerRef.current = null;
            return;
        }

        setIsAnimating('prev');

        timerRef.current = setTimeout(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const lastItem = newItems.pop();
                newItems.unshift(lastItem);
                return newItems;
            });

            // Cleanup phase
            setIsAnimating('prev-cleanup');

            timerRef.current = setTimeout(() => {
                setIsAnimating(null);
                timerRef.current = null;
            }, 50);
        }, 800);
    };

    // The first item is always the "Active" one displayed in the text area
    const activeItem = items[0];

    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline();

        // Simple Slide Up & Fade In Animation for Text
        const targets = ['.coding-project-number', '.project-name', '.coding-project-desc'];

        tl.fromTo(targets,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1
            }
        );

    }, { scope: containerRef, dependencies: [activeItem.id] });

    return (
        <section className="coding-section" id="coding" ref={containerRef}>
            {/* Title Area */}
            <div className="coding-header">
                <img src={circlesImg} alt="Deco Circles" className="coding-circles-bg" />
                <h2 className="coding-title">Clone coding</h2>
            </div>

            {/* Content Area */}
            <div className="coding-content">

                {/* Left: Card Stack */}
                <div className="card-stack-container" style={{ zIndex: 100 }}> {/* Ensure stack is detailed above text */}
                    {items.map((item, index) => {
                        // Scattered Stack Logic for 8 cards
                        const transforms = [
                            { x: 0, y: 0, r: 0, s: 1, z: 10, o: 1 },           // 0: Active
                            { x: -40, y: -20, r: -5, s: 0.95, z: 9, o: 0.9 },   // 1
                            { x: 40, y: 20, r: 4, s: 0.9, z: 8, o: 0.8 },       // 2
                            { x: -30, y: 40, r: -3, s: 0.85, z: 7, o: 0.7 },    // 3
                            { x: 50, y: -30, r: 5, s: 0.8, z: 6, o: 0.6 },      // 4
                            { x: -50, y: 10, r: -4, s: 0.75, z: 5, o: 0.5 },    // 5
                            { x: 20, y: 50, r: 2, s: 0.7, z: 4, o: 0.5 },       // 6
                            { x: -30, y: -40, r: -6, s: 0.65, z: 3, o: 0.4 }    // 7
                        ];

                        let t = transforms[index] || { x: 0, y: 0, r: 0, s: 0.5, z: 0, o: 0 };

                        // [Synchronized Animation Logic]
                        if (isAnimating === 'next') {
                            if (index === 0) {
                                // Active: Fly RIGHT
                                t = { ...t, x: 1000, y: 50, r: 20, s: 1.1, z: 100, o: 0 };
                            } else {
                                // Others: Shift FORWARD (1->0, 2->1 ...)
                                // Card at index i moves to position of i-1
                                const target = transforms[index - 1];
                                if (target) t = target;
                            }
                        } else if (isAnimating === 'prev') {
                            if (index === 0) {
                                // Active: Fly LEFT - Ensure Z is highest
                                t = { ...t, x: -1000, y: 50, r: -20, s: 1.1, z: 1000, o: 0 };
                            } else if (index === items.length - 1) {
                                // Last Item (7): INSTANTLY move to Active Position (0)
                                // Z should be high enough to cover stack (max z is 8, as index 1 is forced to 5), but strictly lower than Active (1000)
                                t = { ...transforms[0], z: 9 };
                            } else {
                                // Others: Shift BACKWARD (1->2, 2->3 ...)
                                // Card at index i moves to position of i+1
                                const target = transforms[index + 1];
                                if (target) t = target;

                                // If this is Next Card (index 1), force its Z-index LOW
                                // so it doesn't accidentally show up if Last Card hasn't rendered yet
                                if (index === 1) {
                                    t = { ...t, z: 5 };
                                }
                            }
                        } else if (isAnimating === 'next-cleanup') {
                            // Old Active (now last) is moving from x=1000 to stack. Hide it.
                            // Force it to stay at x: 1000 while hiding
                            if (index === items.length - 1) {
                                t = { ...t, x: 1000, o: 0 };
                            }
                        } else if (isAnimating === 'prev-cleanup') {
                            // Old Active (now index 1) is moving from x=-1000 to stack. Hide it.
                            // Force it to stay at x: -1000 while hiding
                            if (index === 1) {
                                t = { ...t, x: -1000, o: 0 };
                            }
                        }

                        // Determine Transition Style
                        let transitionStyle = (isAnimating === 'next' || isAnimating === 'prev')
                            ? 'all 0.8s cubic-bezier(0.5, 0, 0.1, 1)'
                            : 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';

                        // CRITICAL: For Prev animation, the Last Item must INSTANTLY snap to pos 0 
                        // so it's ready underneath when Active flies away.
                        if (isAnimating === 'prev' && index === items.length - 1) {
                            transitionStyle = 'none';
                        }

                        // Cleanup Phase: Disable transition for swapped items to prevents "fly-back"
                        if (isAnimating === 'next-cleanup' && index === items.length - 1) transitionStyle = 'none';
                        if (isAnimating === 'prev-cleanup' && index === 1) transitionStyle = 'none';

                        return (
                            <div
                                key={item.id}
                                className="code-card"
                                style={{
                                    zIndex: t.z,
                                    transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${t.s})`,
                                    opacity: t.o,
                                    transition: transitionStyle
                                }}
                            >
                                <img src={item.img} alt={item.title} className="site-preview" />
                            </div>
                        )
                    })}

                    {/* Left Button - Fade out if first project (ID 1) */}
                    <div
                        className="nav-button-wrapper-left"
                        style={{
                            opacity: activeItem.id === 1 ? 0 : 1,
                            pointerEvents: activeItem.id === 1 ? 'none' : 'auto',
                            transition: 'opacity 0.3s ease'
                        }}
                    >
                        <button className="nav-arrow-btn" onClick={handlePrev}>
                            <img src={arrowLeft} alt="Prev" />
                        </button>
                    </div>

                    {/* Navigation Button Overlay (Right) */}
                    <div className="nav-button-wrapper">
                        <button className="nav-arrow-btn" onClick={handleNext}>
                            <img src={arrowRight} alt="Next" />
                        </button>
                    </div>
                </div>

                {/* Right: Info Area */}
                <div className="info-container">
                    {/* Removed 'hidden' class logic, GSAP handles opacity/presence */}
                    <div className="text-box">
                        <div className="project-header-group">
                            <div className="mask-box">
                                <span className="coding-project-number" key={`num-${activeItem.id}`}>
                                    {String(activeItem.id).padStart(2, '0') + '.'}
                                </span>
                            </div>
                            <div className="mask-box">
                                <h3 className="project-name" key={`title-${activeItem.id}`}>
                                    {activeItem.title}
                                </h3>
                            </div>
                        </div>
                        <div className="mask-box">
                            <p className="coding-project-desc" key={`desc-${activeItem.id}`}>
                                {activeItem.desc}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Coding;
