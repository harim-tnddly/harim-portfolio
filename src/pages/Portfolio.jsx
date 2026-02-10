import React from 'react';
import './Portfolio.css';
import mainVideo from '../assets/img/main_video.mp4';

const Portfolio = () => {
    return (
        <section className="portfolio-section" id="portfolio">
            <div className="video-container">
                <video
                    className="portfolio-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={mainVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
};

export default Portfolio;
