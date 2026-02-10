import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './Faq.css';

const Faq = () => {
    const container = useRef();
    const questions = [
        { text: "프로젝트 진행 방식은 어떻게 되나요?", angle: -90 },
        { text: "어떤 문제를 해결해보았나요?", angle: -30 },
        { text: "앞으로 어떤 디자이너가 되고 싶나요?", angle: 30 },
        { text: "어떤 기준으로 디자인을 평가하나요?", angle: 90 },
        { text: "무엇을 할 수 있는가?", angle: 150 },
        { text: "당신은 어떤 사람인가요?", angle: 210 },
    ];

    useGSAP(() => {
        // Cleanup
        gsap.killTweensOf(".orbit-pair");
        gsap.set(".orbit-pair", { clearProps: "transform" });

        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Rotate Pair Y-axis ONLY
        // Text will rotate with the pair visually, but no separate tween on text.
        tl.to(".orbit-pair", {
            rotationY: -180,
            duration: 10,
            ease: "power1.inOut"
        });

    }, { scope: container });

    return (
        <section className="faq-section" id="faq" ref={container}>
            <h1 className="faq-title">FAQ</h1>

            {/* 2D Starburst Container - No 3D Sphere */}
            <div className="satellite-system">
                {/* Center Core - STATIC */}
                <div className="core-object">
                    USER JOURNEY<br />ARCHITECT
                </div>

                {/* Static Radial Layout */}
                <div className="satellite-radial-group">
                    {/* Group by Opposing Pairs */}
                    {[
                        [questions[0], questions[3]],
                        [questions[1], questions[4]],
                        [questions[2], questions[5]]
                    ].map((pair, groupIndex) => (
                        <div key={groupIndex} className="orbit-pair" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                            {pair.map((q, index) => {
                                let alignClass = "align-center";
                                if (q.angle === -30 || q.angle === 30) alignClass = "align-right";
                                if (q.angle === 150 || q.angle === 210) alignClass = "align-left";

                                return (
                                    <div
                                        key={index}
                                        className={`satellite-arm ${alignClass}`}
                                        style={{
                                            transform: `rotate(${q.angle}deg)`
                                        }}
                                    >
                                        <div className="satellite-line"></div>
                                        <div
                                            className={`satellite-node ${alignClass}`}
                                            style={{
                                                transform: `rotate(${-q.angle}deg)`
                                            }}
                                        >
                                            {q.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
