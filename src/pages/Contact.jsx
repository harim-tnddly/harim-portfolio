import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            {/* Background Overlay if needed, usually managed via CSS background-image */}

            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">CONTACT</h1>
                    <div className="contact-signal-wrapper">
                        <span className="signal-line"></span>
                        <p className="contact-signal">SEND A SIGNAL</p>
                        <span className="signal-line"></span>
                    </div>
                </div>

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
