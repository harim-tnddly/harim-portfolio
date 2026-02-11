import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Faq.css';
import HumanParticle from './HumanParticle';

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const section = containerRef.current;
        if (!section) return;

        // Select specific element in scope
        const visual = section.querySelector(".faq-visual-side");
        if (!visual) return;

        // Force initial state: Right 30%
        gsap.set(visual, { xPercent: 30 });

        // ScrollTrigger with direct tweens and overwrite protection
        ScrollTrigger.create({
            trigger: section,
            start: "top 5%",
            end: "bottom 5%",
            onEnter: () => {
                // Nav -> Dark
                gsap.to(document.documentElement, { "--nav-color": "#141414", "--btn-hover-bg": "rgba(20, 20, 20, 0.1)", duration: 0.3, overwrite: true });
                // Visual -> 0 (Delay 1s)
                gsap.to(visual, {
                    xPercent: 0,
                    duration: 1.0,
                    delay: 1,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            },
            onLeave: () => {
                // Nav -> Light
                gsap.to(document.documentElement, { "--nav-color": "#ffffff", "--btn-hover-bg": "rgba(255, 255, 255, 0.2)", duration: 0.3, overwrite: true });
                // Visual -> 30
                gsap.to(visual, {
                    xPercent: 30,
                    duration: 0.5,
                    ease: "power3.in",
                    overwrite: "auto",
                });
            },
            onEnterBack: () => {
                // Nav -> Dark
                gsap.to(document.documentElement, { "--nav-color": "#141414", "--btn-hover-bg": "rgba(20, 20, 20, 0.1)", duration: 0.3, overwrite: true });
                // Visual -> 0 (Delay 1s)
                gsap.to(visual, {
                    xPercent: 0,
                    duration: 1.0,
                    delay: 1,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            },
            onLeaveBack: () => {
                // Nav -> Light
                gsap.to(document.documentElement, { "--nav-color": "#ffffff", "--btn-hover-bg": "rgba(255, 255, 255, 0.2)", duration: 0.3, overwrite: true });
                // Visual -> 30
                gsap.to(visual, {
                    xPercent: 30,
                    duration: 0.5,
                    ease: "power3.in",
                    overwrite: "auto",
                });
            },
        });
    }, { scope: containerRef });

    const faqData = [
        {
            q: "당신은 어떤 사람인가요?",
            a: "저는 ‘왜 이렇게 쓰고 있을까?’를 궁금해하고, 그 이유를 직접 확인하고 싶어서 배우는 사람입니다. 불편함을 발견하면 바로 수정해보고, 원리가 궁금하면 끝까지 파고드는 성향입니다. 그래서 저는 저를 사용자의 여정을 더 좋은 방향으로 정렬하는 사람이라고 소개합니다."
        },
        {
            q: "무엇을 할 수 있는가?",
            a: "UI/UX 설계, 사용자 흐름 분석, 프로토타입 제작, 그리고 React·GSAP 기반의 인터랙티브한 웹 구현까지 가능합니다. 아이디어에서 구조를 만들고, 화면으로 표현하고, 인터랙션으로 생명을 부여하는 전 과정을 직접 실행할 수 있습니다. 즉, 디자인과 프론트엔드 사이의 빈 공간을 메우는 역할을 합니다."
        },
        {
            q: "프로젝트 진행 방식은 어떻게 되나요?",
            a: "저는 문제를 보면 자연스럽게 구조부터 떠올리는 사람입니다. 업무에서 느낀 불편함을 개선해 보고 싶다는 마음으로 디자인을 시작했기 때문에, 겉으로 보이는 화면보다 보이지 않는 흐름과 논리를 먼저 설계하는 방식이 몸에 익어 있습니다. 사용자 경험을 더 좋은 방향으로 만들기 위해 스스로 배우고 시도하는 것을 즐깁니다."
        },
        {
            q: "어떤 문제를 해결해보았나요?",
            a: "이전 직무에서 내부 평가·재무 시스템의 비효율적인 흐름을 직접 분석하고, 복잡한 화면을 단순화하는 UI 구조를 제안한 경험이 있습니다. 사용자가 매일 반복적으로 겪던 작은 불편들을 발견해 더 빠르고 자연스러운 작업 흐름을 만들기 위한 방식을 고민해왔습니다. “불편함을 캐치하는 감각”이 제 강점입니다."
        },
        {
            q: "어떤 기준으로 디자인을 평가하나요?",
            a: "디자인을 구성하는 요소들은 결국 하나의 ‘여정’을 만든다고 생각합니다. 그래서 저는 사용자가 어디로 이동하는지, 어떤 행동을 하게 되는 지, 그 과정이 자연스러운지 이 세 가지를 기준으로 디자인을 평가합니다. 예쁘기만 한 화면보다 사용자가 실제로 움직일 수 있는 길을 만드는 디자인을 중요하게 봅니다."
        },
        {
            q: "앞으로 어떤 디자이너가 되고 싶나요?",
            a: "사용자의 여정을 더 넓은 우주처럼 확장시키는 디자이너가 되고 싶습니다. 단순히 화면을 만드는 사람이 아니라, 사용자가 이동하는 전체 흐름을 설계하는 아키텍트가 목표입니다. 기능의 목적, 구조의 이유, 사용자의 심리를 모두 고려하여 더 나은 방향으로 안내하는 디자이너가 되고 싶습니다."
        }
    ];

    return (
        <section className="faq-section" id="faq" ref={containerRef}>
            <h1 className="faq-title">FAQ</h1>

            <div className="faq-content-wrapper">
                <div className="faq-questions-list">
                    {faqData.map((item, i) => (
                        <div
                            key={i}
                            className={`faq-question-item ${activeIndex === i ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            // onMouseLeave={() => setActiveIndex(null)} // 호버가 끝났을 때 닫히게 하려면 주석 해제. 보통 FAQ는 읽어야 하므로 유지하는 게 좋을 수도 있지만, 다른 항목 호버 시 변경되므로 괜찮음.
                            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            tabIndex={0}
                            onFocus={() => setActiveIndex(i)}
                        >
                            <div className="faq-question-row">
                                <div className="faq-indicator-bar"></div>
                                <div className="faq-question-text">{item.q}</div>
                            </div>
                            <div className="faq-answer-text">
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-visual-side">
                    <HumanParticle />
                </div>
            </div>
        </section>
    );
};

export default Faq;
