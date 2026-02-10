import React, { useState, useMemo } from 'react';
import './Ai.css';

const Ai = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Load assets dynamically
    const assets = useMemo(() => {
        const glob = import.meta.glob('../assets/img/ai/*.{png,mp4}', { eager: true, import: 'default' });
        // keys look like "../assets/img/ai/ai_1.png"
        const items = Object.keys(glob)
            .filter(path => path.includes('ai_') && !path.includes('text_bg')) // Filter out text_bg just in case
            .map(path => {
                const fileName = path.split('/').pop();
                const match = fileName.match(/ai_(\d+)\.(png|mp4)/);
                if (!match) return null;
                const id = parseInt(match[1]);
                const type = match[2] === 'mp4' ? 'video' : 'image';
                return {
                    id,
                    src: glob[path],
                    type,
                    fileName
                };
            })
            .filter(Boolean)
            .sort((a, b) => a.id - b.id);
        return items;
    }, []);

    // Placeholder data for text - using the user's provided text for all for now, 
    // or we could vary it if we had more info.
    const getProjectInfo = (id) => {
        if (id === 3) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A high-end modern beauty editorial portrait of a beautiful East Asian woman. She is gently applying a glossy green skincare cream to her face with her fingers. Clean studio background with a soft, muted modern aesthetic, balanced professional softbox lighting that does not overly spotlight the subject. Face in sharp yet subtle focus, with a harmonious overall tonality so the woman blends naturally with the scene. Flawless skin, refined highlights, luxurious but understated skincare texture. Modern beauty campaign photography style."
            };
        }
        if (id === 4) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A close-up outdoor beauty photograph of a woman surrounded by soft green leaves and warm sunlight. She gently holds a bottle of Papa Recipe \"Bombee Toner\" in one hand, raising it naturally near her shoulder or face. The expression and pose remain calm and serene, with her head tilted toward the sunlight just like the reference image. Natural daylight filters through the leaves, creating soft highlights and subtle shadows on her skin. The product appears realistically integrated: correct size, natural reflections, no artificial glow. Organic, slightly imperfect textures on the foliage and light scattering keep the image feeling real and unedited. Warm, soft tones, shallow depth of field, and a cinematic but natural photographic look. Avoid overly polished skin, avoid plastic shine, avoid AI-like effects. Photographed feel, natural realism, gentle atmosphere."
            };
        }
        if (id === 5) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "calm minimalist meditation space in warm beige tones, a person sitting at the center in a peaceful meditative pose, raised platform surrounded by still reflective water, soft natural light, textured plaster walls, serene architectural geometry, subtle reflections extending across the wide space, quiet zen atmosphere, cinematic composition, high-end interior design"
            };
        }
        if (id === 6) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A soft, warm-toned cosmetic lifestyle photo, 2:3 ratio. A model holding the exact Papa Recipe Bombee Cream spherical container. Use the original product photo as-is: the text, typography, logo, spacing, and spherical shape must remain perfectly accurate and unchanged. Do not alter or recreate the product; preserve all details exactly. Place the product gently in the model’s arm, with natural skin texture and warm diffused lighting. Minimal, elegant, premium skincare aesthetic."
            };
        }
        if (id === 7) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A soft, minimal beauty portrait of a woman gently applying a toner pad to her cheek. She faces slightly to the side, with a calm and natural expression. Warm ivory background and diffused lighting create a clean, elegant skincare editorial mood. Her hair is neatly styled with a few loose strands, and her skin appears fresh, dewy, and natural without over-retouching. The toner pad is thin, round, and semi-translucent, held delicately between her fingers as she presses it onto her skin. Overall atmosphere is warm, minimalistic, and sophisticated, resembling a high-end skincare campaign."
            };
        }
        if (id === 8) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A macro close-up shot of a transparent skincare gel with suspended air bubbles. Soft cool-toned lighting creates subtle highlights and delicate reflections within the gel. The texture is smooth, glossy, and fluid, with natural curved edges and tiny bubbles scattered throughout. Background is clean and minimal in a pale, cool neutral tone, enhancing the clarity of the gel. Photographed in a realistic macro style with shallow depth of field, fine details, and no artificial effects."
            };
        }
        if (id === 9) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A hyper-realistic macro close-up of a long, curved stroke of crystal-clear cosmetic gel, with smooth flowing texture, high gloss, sharp highlights, and glass-like transparency. The gel forms elegant layered waves with subtle refractions and soft shadows on a clean white background. Professional skincare texture photography, ultra-detailed, minimal, luxurious, photorealistic lighting."
            };
        }
        if (id === 10) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "a serene portrait of a young woman with wet dark hair, leaning her head back with closed eyes beneath lush rain-soaked green leaves and fruit branches, soft misty atmosphere, dewy skin, gentle rainfall, dreamy and ethereal forest setting, natural light, pastel green color palette, tranquil and poetic mood, cinematic photography, shallow depth of field, soft focus bokeh"
            };
        }
        if (id === 11) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A high-end studio product shot of the exact same green Papa Recipe Tea Tree Control Skin bottle falling into clear water with bubbles forming around it. The bottle’s label, typography, logo, spacing, and printed text remain exactly the same as the real product, with no changes or distortions. Realistic water splash and rising bubbles, bright white background, clean reflections, sharp and accurate product rendering, premium cosmetic advertisement style."
            };
        }
        if (id === 12) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A warm, minimal lifestyle flatlay shot beside a pool. Soft sunlight casts natural shadows across a folded terry towel in muted rose tones. Next to the towel is a small cosmetic tube placed casually, creating a relaxed, summery atmosphere. The pool water gently ripples on the left side, with light reflections dancing on the stone surface. Texture details of the towel, stone tiles, and water are realistic and subtle, avoiding exaggerated shine or artificial effects. Color palette is warm, neutral, and sunlit, resembling a clean, modern skincare editorial."
            };
        }
        if (id === 13) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "a serene young woman sitting in tall grass in a lush forest, wearing a white vintage dress, long dark wavy hair flowing down her back, soft sunlight casting warm golden tones across the scene, subtle yellow highlights on the grass and foliage, dreamy and ethereal atmosphere, gentle breeze movement, cinematic composition, realistic skin texture, warm color palette with green and golden hues"
            };
        }
        if (id === 14) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A minimal, sunlit lifestyle scene featuring a woman sitting beside a stone surface. Her face is outside the frame, only her shoulder, neck, and arm visible. She gently holds her camisole strap with a relaxed gesture. Soft natural sunlight creates warm highlights and delicate shadows across her skin. Two pastel-colored candles sit on the stone surface in the foreground, casting soft reflections. The background is a clean, airy curtain fabric with diffused daylight, creating a calm and elegant atmosphere. Maintain the same pose, lighting direction, color palette, and composition, but extend the scene into a wider 16:9 frame with balanced negative space, aesthetic lifestyle photography, soft textures, high-end editorial look, serene and modern."
            };
        }
        if (id === 15) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "a cinematic bathroom scene inspired by image 1, a woman standing in front of a mirror, wet hair, soft muted lighting, tiled wall background. replace the woman in image 1 with the woman from image 2: delicate features, smooth glowing skin, full lips, natural makeup, soft long dark hair framing the face. she is positioned on the right 40% of the frame, and the wooden-framed mirror also remains on the right side of the composition. the reflection of her face appears naturally in the mirror, matching the lighting and angle. warm neutral tones, soft film texture, photorealistic details, premium beauty editorial mood. widescreen format"
            };
        }
        if (id === 16) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "a high-resolution cinematic photograph of a hand gently holding a small, transparent glass cosmetic bottle with no text or label, hovering just above the surface of sunlit water. warm golden-hour lighting creating soft reflections and glowing highlights. delicate ripples forming beneath the bottle, floating flower petals drifting across the water. dreamy bokeh in the background, soft natural shadows, ethereal and poetic atmosphere. muted warm tones, gentle fabric textures, romantic aesthetic, high-end editorial skincare mood. no text, no logo, no branding"
            };
        }
        if (id === 17) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "a cinematic 16:9 shot of a woman doing skincare in front of a vanity mirror. soft warm lighting, clean minimal interior, gentle beauty-film atmosphere. the woman has smooth radiant skin, natural soft makeup, full lips, delicate features, and long flowing dark hair with soft strands, matching the reference style. she is applying skincare or gently touching her cheek while looking into the mirror, with her reflection visible. vanity table with subtle blurred skincare items, elegant composition, shallow depth of field, premium skincare advertisement mood, ultra-realistic details."
            };
        }
        if (id === 18) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "same composition, same framing, same pose, same facial features, same hairstyle, same hand position, same product placement as the reference. A high-end beauty editorial portrait of the same East Asian woman, holding the same cosmetic compact near her face. Change only the mood and atmosphere: modern clean aesthetic, soft neutral tones, diffused lighting, airy and bright ambiance instead of dark brown tones. Smooth skin texture, subtle highlights, elegant and minimal beauty campaign style."
            };
        }
        if (id === 19) {
            return {
                title: "Papa recipe Web Renewal",
                desc: "A high-end modern beauty editorial portrait of a beautiful East Asian woman. She is gently applying a glossy green skincare cream to her face with her fingers. Clean studio background with a soft, muted modern aesthetic, balanced professional softbox lighting that does not overly spotlight the subject. Face in sharp yet subtle focus, with a harmonious overall tonality so the woman blends naturally with the scene. Flawless skin, refined highlights, luxurious but understated skincare texture. Modern beauty campaign photography style."
            };
        }
        return {
            title: "Papa recipe Web Renewal",
            desc: "A soft, ethereal beauty portrait of a woman leaning over calm water, her skin glowing with natural moisture. Wet hair strands fall delicately around her face, and subtle highlights shimmer along her cheekbones and shoulders. Her arms rest gently in the water, creating soft ripples and reflections around her. The color palette is airy and pastel, with pale blues and soft neutrals blending into a serene, dreamlike atmosphere. Lighting is diffused and gentle, emphasizing natural skin texture with a dewy, luminous finish. The composition feels intimate, calm, and elegant, resembling a high-end skincare photoshoot. No exaggerated shine or artificial effects everything is soft, real, and refined."
        };
    };

    const activeItem = assets[activeIndex] || {};
    const projectInfo = getProjectInfo(activeItem.id);

    return (
        <section className="ai-section" id="ai">

            {/* Background Marquee Text */}
            <div className="text-bg-wrapper">
                <div className="marquee-container marquee-1">
                    <div className="marquee-content">
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                    </div>
                    <div className="marquee-content" aria-hidden="true">
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                    </div>
                </div>

                <div className="marquee-container marquee-2">
                    <div className="marquee-content reverse">
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                    </div>
                    <div className="marquee-content reverse" aria-hidden="true">
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                        <span>Infinite Prompts Unique Works &nbsp;</span>
                    </div>
                </div>
            </div>

            <div className="ai-container">
                {/* Top Content: Text & Large Display */}
                <div className="ai-main-content">
                    {/* Left Side: Title & Text Info grouped in textBox */}
                    <div className="ai-textBox">
                        <h1 className="ai-showcase-title">
                            Ai
                            <br />
                            Showcase
                        </h1>
                        <div className="ai-text-info">
                            <div className="prompt-label">Midjourney Prompt</div>
                            <h2 className="ai-project-title">{projectInfo.title}</h2>
                            <p className="ai-project-desc">{projectInfo.desc}</p>
                        </div>
                    </div>

                    {/* Right Side: Large Display */}
                    <div className="ai-display-area">
                        {activeItem.type === 'video' ? (
                            <video
                                src={activeItem.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="main-media"
                                key={activeItem.src} // Force remount on change
                            />
                        ) : (
                            <img
                                src={activeItem.src}
                                alt={`AI Art ${activeItem.id}`}
                                className="main-media"
                                key={activeItem.src}
                            />
                        )}
                    </div>
                </div>

                {/* Bottom: Thumbnails */}
                <div className="ai-thumbnails">
                    {assets.map((item, index) => {
                        const isSelected = index === activeIndex;
                        return (
                            <div
                                key={item.id}
                                className={`thumbnail-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="thumb-wrapper">
                                    {item.type === 'video' ? (
                                        <video src={item.src} muted className="thumb-media" />
                                    ) : (
                                        <img src={item.src} alt={`thumb ${item.id}`} className="thumb-media" />
                                    )}
                                    {/* Overlay for unselected items */}
                                    <div className="thumb-overlay"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Ai;
