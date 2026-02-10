import React from 'react';
import './About.css';

// 이미지 import
import harimImg from '../assets/img/about/harim.png';
import circlesImg from '../assets/img/about/circles.png';
import circles2Img from '../assets/img/about/circles2.png';
import bgSilkImg from '../assets/img/about/bg_silk.png';

// 스킬 이미지 (png)
import skill1 from '../assets/img/about/skill_1.png';
import skill2 from '../assets/img/about/skill_2.png';
import skill3 from '../assets/img/about/skill_3.png';
import skill4 from '../assets/img/about/skill_4.png';
import skill5 from '../assets/img/about/skill_5.png';

// 스킬 동영상 (mp4) - for hover effect
import skillVideo1 from '../assets/img/about/skill_1.mp4';
import skillVideo2 from '../assets/img/about/skill_2.mp4';
import skillVideo3 from '../assets/img/about/skill_3.mp4';
import skillVideo4 from '../assets/img/about/skill_4.mp4';
import skillVideo5 from '../assets/img/about/skill_5.mp4';

const About = () => {
    // 스킬 데이터
    const skills = [
        { id: 1, name: "html &\ncss", img: skill1, video: skillVideo1, count: "1/5" },
        { id: 2, name: "javascript &\njquery", img: skill2, video: skillVideo2, count: "2/5" },
        { id: 3, name: "figma", img: skill3, video: skillVideo3, count: "3/5" },
        { id: 4, name: "photoshop &\nillustrator", img: skill4, video: skillVideo4, count: "4/5" },
        { id: 5, name: "antigravity &\nvisual studio", img: skill5, video: skillVideo5, count: "5/5" }
    ];

    return (
        <section className="about-section" id="about">
            {/* 상단 배경 */}
            <div className="bg-silk-wrapper">
                <img src={bgSilkImg} alt="" className="bg-silk" />
            </div>

            {/* 컨텐츠 컨테이너 */}
            <div className="about-content">

                <h2 className="about-title">About Me</h2>

                <div className="profile-img-container">
                    <img src={harimImg} alt="Harim" className="harim-img" />
                </div>

                <div className="textBox">
                    <div className="left">
                        <img src={circles2Img} alt="" className="deco-circles2" />
                        <p className="intro-strong">
                            사용자의 여정을 더 넓은 우주로 확장시키는 디자이너, 하림
                        </p>
                        <div className="intro-body">
                            <p>
                                흩어져 있던 별들이 하나의 별자리가 되듯, 제 경험들도 그렇게 모여 지금의 저를 만들었습니다.
                                실무의 불편함을 해결하기 위해 배우고 시도했던 과정들이 이어져, 이제는 시스템의 논리와 사용자의 언어를 하나의 거대한 은하처럼 융합하는 디자이너라는 목표를 갖게 되었습니다.
                            </p>
                            <p>
                                전직장 내부 시스템에서 마주한 불편함들을 출발점으로 삼아 화면 구조를 분석하고 흐름을 재구성하는 과정에서 UX의 본질적인 재미를 느끼게 되었습니다. 개발의 언어와 디자인의 감성이 서로를 공전하듯 조화롭게 어우러지게 만들며 관점을 조율하고 더 좋은 방향을 찾아가는 경험은, 제가 '보이지 않는 구조'를 설계하고 사용자가 더 멀리 이동할 수 있는 여정을 만드는 단단한 기반이 되었습니다.
                            </p>
                            <p>
                                앞으로도 복잡한 흐름을 단순하고 명확하게 정리하여, 사용자가 은하수를 유영하듯 자연스럽게 이동할 수 있는 경험을 만드는 데 집중하고 싶습니다. 더 넓은 세계로 이어지는 사용자 여정을 설계하는 디자이너로 성장해 나가겠습니다.
                            </p>
                        </div>
                    </div>

                    <div className="right">
                        <img src={circlesImg} alt="" className="deco-circles" />

                        <div className="info-group">
                            <h3>Profile</h3>
                            <p>Name 김하림</p>
                            <p>Birth 1998.10.02</p>
                            <p>Phone 010-6810-8592</p>
                            <p>E-mail kknag213@gmail.com</p>
                            <p>Address 서울 구로구 항동</p>
                        </div>

                        <div className="info-group">
                            <h3>career</h3>
                            <p>(주)이크레더블 평가지원팀 재무파트 2021.07.24 ~ 2025.07.25</p>
                            <p>(주)미스터멘션 경영지원팀 사원(인턴) 2020.04.01 ~ 2020.12.01</p>
                        </div>

                        <div className="info-group">
                            <h3>certification</h3>
                            <p>웹디자인기능사 필기 / Q-Net / 26.01.24 합격</p>
                            <p>GTQ 포토샵 1급 / KPC 한국생산성본부 / 24.09.13 취득</p>
                        </div>

                        <div className="info-group">
                            <h3>education</h3>
                            <p>명지전문대 일본어과 2017.03 ~ 2020.03</p>
                            <p>서서울생활과학고등학교 국제관광과 2014.03 ~ 2017.02</p>
                            <p>이젠아카데미DX교육센터 UXUI디자인&웹기획 프론트엔드 부트캠프 2025.08.27 ~ 2026.02.13</p>
                            <p>더조은아카데미 자바스크립트 & 제이쿼리를 활용한 웹 개발 실무 입문 2025.01.07 ~ 2025.03.11</p>
                            <p>더조은아카데미 입문자를 위한 디지털 웹퍼블리셔 [HTML5&CSS3] 2024.10.23 ~ 2024.12.16</p>
                        </div>
                    </div>
                </div>

                {/* 3. Skills 섹션 */}
                <div className="skills-container">
                    <div className="skills-title-wrapper">
                        <p className="skills-cursive">skills</p>
                        <h2 className="skills-main-title">WHAT I DO</h2>
                    </div>

                    <div className="skills-grid">
                        {skills.map((skill) => (
                            <SkillCard key={skill.id} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// [추가] 개별 스킬 카드 컴포넌트 (Hover 상태 관리)
const SkillCard = ({ skill }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (isHovered && videoRef.current) {
            videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
        } else if (!isHovered && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // 되감기
        }
    }, [isHovered]);

    return (
        <div
            className="skill-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="skill-header">
                <span className="skill-label">skill</span>
                <span className="skill-count">{skill.count}</span>
            </div>

            <div className="skill-img-box">
                {/* 1. 기본 이미지 (호버 시 숨김) */}
                <img
                    src={skill.img}
                    alt={skill.name.replace('\n', ' ')}
                    style={{
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                        width: '340px',
                        height: '340px',
                        objectFit: 'contain'
                    }}
                />

                {/* 2. 호버 시 비디오 (이미지 위에 겹침) */}
                <video
                    ref={videoRef}
                    src={skill.video}
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '340px',
                        height: '340px',
                        objectFit: 'contain',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                    }}
                />
            </div>

            <h3 className="skill-name">{skill.name}</h3>
        </div>
    );
};

export default About;
