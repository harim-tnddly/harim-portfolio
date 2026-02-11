import React from 'react';
import './Contact.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import contactUpImg from '../assets/img/contact_up.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    useGSAP(() => {
        // 1. Content Reveal: Individual elements trigger when reaching 70% viewport
        const targets = gsap.utils.toArray('.contact-header, .contact-available, .contact-ready, .contact-footer-group');

        targets.forEach((el) => {
            gsap.from(el, {
                y: "30vh",
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", // Start early when entering
                    end: "bottom bottom", // End when fully visible (safe for footer)
                    scrub: 1
                }
            });
        });

        // Sphere Animation (Separate for distinct timing/distance)
        gsap.from('.contact-sphere', {
            y: "50vh", // Start lower for dramatic rise
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-sphere',
                start: "top 90%",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // 2. Background Transition: Fade in gradient over white (FAQ)
        gsap.fromTo('.contact-bg',
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: "top 88%", // User request: Contact 5% meets Viewport 70%
                    end: "30% 35%",
                    scrub: true
                }
            }
        );

    }, []);

    return (
        <section className="contact-section" id="contact">
            {/* Background Gradient Layer for Animation */}
            <div className="contact-bg"></div>

            {/* Content Container */}
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">CONTACT</h1>
                    <div className="contact-signal-wrapper">
                        <span className="signal-line"></span>
                        <p className="contact-signal">SEND A SIGNAL</p>
                        <span className="signal-line"></span>
                    </div>
                </div>

                {/* Sphere Image */}
                <img src={contactUpImg} alt="" className="contact-sphere" />

                <h2 className="contact-available">AVAILABLE FOR UI/UX, PRODUCT & MOTION</h2>

                <h2 className="contact-ready">READY TO BUILD</h2>

                <div className="contact-footer-group">
                    <div className="contact-info-left">
                        <p className="info-name">HARIM</p>
                        <p className="info-item">CONTACT kknag213@gmail.com</p>
                        <p className="info-item">PHONE 010-6810-8592</p>
                        <p className="info-item">SEOUL, SOUTH KOREA</p>
                        <p className="info-item">LINKEDIN · INSTAGRAM · GITHUB</p>
                    </div>

                    <h1 className="contact-soon">I'LL GET BACK TO YOU SOON.</h1>
                </div>
            </div>
        </section>
    );
};

export default Contact;
