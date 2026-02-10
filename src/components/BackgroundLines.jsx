import React from 'react';

const BackgroundLines = () => {
    return (
        <div className="background-lines-wrapper">
            {/* SVG 1 */}
            {/* User settings: width: 1190.49px; height: 2514.5px; rotate(-8.208deg); stroke-width: 3px; stroke: rgba(255, 255, 255, 0.80); */}
            <div
                className="bg-line-svg line-1"
                style={{
                    position: 'absolute',
                    width: '1190.49px',
                    height: '2514.5px',
                    top: '0',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-8.208deg)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' // Enhance shine
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1547 2638" fill="none">
                    <g filter="url(#filter0_g_1158_10572)">
                        <path d="M104.263 100.014C100.896 367.317 20.8411 925.708 904.409 926.249C1355.3 896.332 1889.94 1290.88 825.973 2536.44" stroke="white" strokeOpacity="0.8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    </g>
                    <defs>
                        <filter id="filter0_g_1158_10572" x="0" y="0" width="1546.5" height="2637.09" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="7521" />
                            <feDisplacementMap in="shape" scale="200" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                            <feMerge result="effect1_texture_1158_10572">
                                <feMergeNode in="displacedImage" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* SVG 2 */}
            {/* User settings: width: 1287.927px; height: 2496.453px; rotate(-1.013deg); */}
            <div
                className="bg-line-svg line-2"
                style={{
                    position: 'absolute',
                    width: '1287.927px',
                    height: '2496.453px',
                    top: '200px', // Slight offset
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-1.013deg)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1507 2688" fill="none">
                    <g filter="url(#filter0_g_1158_10574)">
                        <path d="M263.67 100.136C226.852 364.913 -250.579 1043.07 625.964 1154.27C1077.05 1181.06 2024.55 1484.77 812.967 2587.27" stroke="white" strokeOpacity="0.8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    </g>
                    <defs>
                        <filter id="filter0_g_1158_10574" x="0" y="0" width="1506.92" height="2688.01" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="7521" />
                            <feDisplacementMap in="shape" scale="200" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                            <feMerge result="effect1_texture_1158_10574">
                                <feMergeNode in="displacedImage" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default BackgroundLines;
