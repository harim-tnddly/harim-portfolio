import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hobbys.css';

gsap.registerPlugin(ScrollTrigger);

const Hobbys = () => {
    // Dynamic import for hobby images
    const hobbyAssets = import.meta.glob('../assets/img/hobbys/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

    // Helper to find image by key (e.g., 'travel' -> 'travel.png' or 'travel.jpg')
    const getImage = (name) => {
        const found = Object.keys(hobbyAssets).find(key => key.toLowerCase().includes(name.toLowerCase()) && !key.includes('bg_hobbys'));
        return found ? hobbyAssets[found] : null;
    };

    const hobbyItems = [
        {
            id: 'travel',
            title: 'Travel',
            desc: '낯선 도시의 골목을 헤매고, 생경한 언어와 문화 속에 던져지는 경험을 사랑합니다. 익숙한 안전지대를 벗어나 마주하는 예상치 못한 상황들은 저에게 유연한 사고와 즉각적인 문제 해결 능력을 길러주는 최고의 훈련장입니다. 다양한 배경을 가진 사람들과의 만남을 통해 세상을 바라보는 시야를 넓히고, 서로 다름을 이해하는 포용력을 배웁니다. 여행지에서 얻은 날것의 영감과 에너지는 일상으로 돌아와 사용자 중심의 창의적인 서비스를 설계하는 데 큰 자산이 됩니다.',
            svgPath: 'M0 5.00001C0 2.23858 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V763.545C420 766.478 417.487 768.781 414.566 768.526L4.56572 732.779C1.98242 732.554 0 730.391 0 727.798V5.00001Z',
            width: 420,
            height: 769,
            paddingTop: 0
        },
        {
            id: 'crossfit',
            title: 'Crossfit',
            desc: '매일 한계에 도전하며 강인한 체력과 정신력을 기르고 있습니다. 고강도 운동을 통해 얻은 끈기와 포기하지 않는 태도는 어려운 개발 난제에 부딪혔을 때 끝까지 파고들어 해결하는 집요함으로 이어집니다. 꾸준한 자기 관리의 중요성을 몸소 실천하고 있습니다.',
            svgPath: 'M0 5C0 2.23857 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V685.575C420 688.497 417.505 690.796 414.593 690.558L4.59288 657.063C1.99795 656.852 0 654.684 0 652.08V5Z',
            width: 420,
            height: 691,
            paddingTop: 50
        },
        {
            id: 'drawing',
            title: 'Drawing',
            desc: '무심코 지나칠 수 있는 일상의 풍경이나 사물을 주의 깊게 관찰하고, 그 속에 숨겨진 아름다움과 특징을 포착해 하얀 캔버스 위에 옮기는 과정을 즐깁니다. 머릿속에만 존재하던 막연한 아이디어를 시각적으로 구체화하는 드로잉 작업은 저의 상상력과 표현력을 키워주는 소중한 시간입니다. 대상을 깊이 있게 들여다보는 관찰력과 디테일을 놓치지 않는 섬세함은 복잡한 정보를 직관적이고 사용하기 편리한 UI/UX 디자인으로 풀어내는 데 큰 도움을 줍니다.',
            svgPath: 'M0 4.99998C0 2.23855 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V753.531C420 756.469 417.479 758.774 414.553 758.511L4.55312 721.72C1.97523 721.489 0 719.329 0 716.74V4.99998Z',
            width: 420,
            height: 759,
            paddingTop: 0
        },
        {
            id: 'maraton',
            title: 'Maraton',
            desc: '마라톤은 인생의 축소판과 같다고 생각합니다. 당장의 속도보다는 자신만의 페이스를 유지하며 꾸준히 나아가는 것이 중요함을 배웁니다. 수많은 훈련을 통해 다져진 지구력과 레이스 도중 찾아오는 고비를 이겨내는 인내심은 장기 프로젝트를 지치지 않고 성공적으로 이끄는 원동력입니다. 목표를 향해 묵묵히 한 발 한 발 내딛는 마라토너의 자세로, 끊임없이 성장하며 완주하는 개발자가 되겠습니다.',
            svgPath: 'M0 4.99998C0 2.23856 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V708.649C420 711.544 417.549 713.833 414.661 713.637L4.661 685.776C2.0372 685.598 0 683.417 0 680.788V4.99998Z',
            width: 420,
            height: 714,
            paddingTop: 50
        },
        {
            id: 'famous restaurant',
            title: 'Famous restaurant',
            desc: '단순히 맛있는 음식을 먹는 것을 넘어, 끊임없이 변화하는 식문화 트렌드를 읽고 새로운 경험을 찾아 나서는 능동적인 탐험가입니다. 숨겨진 맛집을 발굴하기 위해 다양한 채널의 정보를 수집하고 분석하는 과정은 최신 기술 동향을 파악하는 저의 업무 습관과 닮아있습니다. 정성스럽게 준비된 음식에서 셰프의 철학을 발견하고, 좋은 식당이 주는 공간적 경험을 만끽합니다. 이렇게 얻은 즐거운 경험과 정보를 주변 사람들과 나누며 소통하는 시간은 제 삶의 큰 활력소입니다.',
            svgPath: 'M0 5C0 2.23857 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V741.632C420 744.533 417.539 746.825 414.645 746.619L4.6454 717.471C2.02817 717.284 0 715.107 0 712.483V5Z',
            width: 420,
            height: 747,
            paddingTop: 0
        },
        {
            id: 'baking',
            title: 'Baking',
            desc: '재료의 정확한 계량부터 반죽의 상태, 오븐의 온도와 시간까지 모든 과정이 정교하게 맞물려야 최상의 결과물이 나오는 베이킹은 마치 정밀한 코드를 짜는 것과 같습니다. 정해진 레시피를 철저히 따르면서도 때로는 과감하게 재료를 가감하며 나만의 새로운 맛을 창조해내는 과정에서 색다른 즐거움을 느낍니다. 오랜 시간과 정성을 들여 갓 구워낸 빵과 쿠키의 따뜻한 온기를 주변 사람들과 나눌 때 느끼는 행복감은 무엇과도 바꿀 수 없는 소중한 가치입니다.',
            svgPath: 'M0 5.00001C0 2.23858 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V732.545C420 735.478 417.487 737.781 414.565 737.526L4.56539 701.753C1.98223 701.527 0 699.365 0 696.772V5.00001Z',
            width: 420,
            height: 738,
            paddingTop: 50
        },
        {
            id: 'cook',
            title: 'Cook',
            desc: '냉장고 속에 있는 한정된 재료들을 조합하여 최적의 맛과 영양을 갖춘 근사한 한 끼를 만들어내는 과정은 창의적인 문제 해결 과정 그 자체입니다. 재료 손질부터 조리, 플레이팅까지 여러 단계를 동시에 효율적으로 관리하며 멀티태스킹 능력을 키웠습니다. 내가 정성껏 만든 요리를 사랑하는 사람들이 맛있게 먹는 모습을 볼 때 가장 큰 보람을 느낍니다. 요리는 저에게 타인을 향한 따뜻한 배려이자, 일상 속에서 창작의 기쁨을 맛보게 해주는 특별한 취미입니다.',
            svgPath: 'M0 5C0 2.23857 2.23858 0 5 0H415C417.761 0 420 2.23858 420 5V752.552C420 755.482 417.491 757.784 414.572 757.534L4.57188 722.298C1.98593 722.075 0 719.911 0 717.316V5Z',
            width: 420,
            height: 758,
            paddingTop: 0
        }
    ];

    // Horizontal Scroll Logic with GSAP ScrollTrigger
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useGSAP(() => {
        const container = scrollContainerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        // Determine scroll distance: Total width - Viewport width
        const getScrollAmount = () => {
            let measureWidth = container.offsetWidth;
            if (measureWidth < window.innerWidth) measureWidth = container.scrollWidth;
            return measureWidth - window.innerWidth;
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainerRef.current, // Trigger based on the container
                pin: section, // Pin the whole section
                scrub: 1,
                start: "center center", // Start when container center meets viewport center
                end: () => `+=${getScrollAmount() + 500}`,
                invalidateOnRefresh: true,
            }
        });

        // Horizontal Scroll
        tl.to(container, {
            x: () => -getScrollAmount(),
            ease: "none",
        });

        // Background Color & Text Color Transition
        // Triggered when section enters viewport
        gsap.fromTo(section,
            { backgroundColor: "#141414", color: "#FFFFFF" },
            {
                backgroundColor: "#ffffff",
                color: "#141414",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            }
        );

        // Animate only the main title to black
        gsap.to(".hobbys-title", {
            color: "#141414",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
            }
        });

        // Strict Nav Color Logic: Only Dark when section is effectively at top
        ScrollTrigger.create({
            trigger: section,
            start: "top 5%",
            end: "bottom 5%",
            onEnter: () => gsap.to(document.documentElement, { "--nav-color": "#141414", duration: 0.3, overwrite: true }),
            onLeave: () => gsap.to(document.documentElement, { "--nav-color": "#ffffff", duration: 0.3, overwrite: true }),
            onEnterBack: () => gsap.to(document.documentElement, { "--nav-color": "#141414", duration: 0.3, overwrite: true }),
            onLeaveBack: () => gsap.to(document.documentElement, { "--nav-color": "#ffffff", duration: 0.3, overwrite: true })
        });

        // 2. Handle Bottom Exit (Leaving to next section) logic merged above or separate?
        // The above handles the general section bounds (if not pinned).
        // BUT Hobbys is PINNED by a separate trigger.
        // If we use 'section' based trigger, 'end' refers to unpinned height.
        // If the section is pinned, "bottom" of section is reached only after pin duration?
        // The PIN trigger handles the scroll timeline.
        // We generally want nav to be dark WHILE PINNED too.
        // Pin trigger: trigger: scrollContainerRef.current, end: +=scrollAmount.
        // We should sync Nav Color with the PIN DURATION.

        ScrollTrigger.create({
            trigger: scrollContainerRef.current,
            start: "top 5%", // Matches when Pin starts??
            // Pin start is "center center" in code (line 106).
            // "center center" means section is vertically centered.
            // If section is centered, header (top) might not be at 5%.
            // If Hobbys is full height, center-center implies top is at 0 (if viewport fits).
            // Let's assume top 5% is safe.
            end: () => `+=${getScrollAmount() + 500}`, // Match pin duration
            onEnter: () => gsap.to(document.documentElement, { "--nav-color": "#141414", duration: 0.3, overwrite: true }),
            onLeave: () => gsap.to(document.documentElement, { "--nav-color": "#ffffff", duration: 0.3, overwrite: true }),
            onEnterBack: () => gsap.to(document.documentElement, { "--nav-color": "#141414", duration: 0.3, overwrite: true }),
            onLeaveBack: () => gsap.to(document.documentElement, { "--nav-color": "#ffffff", duration: 0.3, overwrite: true })
        });

    }, { scope: sectionRef });

    return (
        <section className="hobbys-section" id="hobbys" ref={sectionRef}>
            <h1 className="hobbys-title">Hobbys</h1>

            <div className="hobbys-scroll-area">
                <div className="hobbys-container" ref={scrollContainerRef}>
                    {hobbyItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`hobby-card ${item.id.replace(' ', '-')}`}
                            style={{
                                width: `${item.width}px`,
                                height: `${item.height}px`,
                                marginTop: `${item.paddingTop}px`
                            }}
                        >
                            <svg
                                className="hobby-card-bg"
                                width={item.width}
                                height={item.height}
                                viewBox={`0 0 ${item.width} ${item.height}`}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d={item.svgPath} fill="#141414" />
                            </svg>

                            <div className="hobby-content">
                                {getImage(item.id.split(' ')[0]) && (
                                    <div className="hobby-img-wrapper">
                                        <img
                                            src={getImage(item.id.split(' ')[0])}
                                            alt={item.title}
                                            className="hobby-img"
                                        />
                                    </div>
                                )}
                                <div className="text-area">
                                    <h3 className="hobby-item-title">{item.title}</h3>
                                    <p className="hobby-desc">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hobbys;
