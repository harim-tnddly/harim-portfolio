import React, { useState } from 'react';
import './Header.css';

const Header = ({ className }) => {
    const [activeNav, setActiveNav] = useState('Home');
    const isManualScroll = React.useRef(false);

    const handleNavClick = (navName, id) => {
        setActiveNav(navName);
        isManualScroll.current = true;
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

        // Timeout to re-enable scroll spy after scrolling finishes (approx 800-1000ms)
        setTimeout(() => {
            isManualScroll.current = false;
        }, 1000);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            if (isManualScroll.current) return;

            const sections = [
                { id: 'home', name: 'Home' },
                { id: 'about', name: 'About' },
                { id: 'project', name: 'Project' },
                { id: 'coding', name: 'Coding' },
                { id: 'ai', name: 'AI' },
                { id: 'hobbys', name: 'Hobbys' },
                { id: 'faq', name: 'FAQ' }
            ];

            const scrollPos = window.scrollY + 10; // Trigger when section hits top (with small buffer)

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();

                    // Check if the section overlaps the top of the viewport (with a small buffer)
                    // If top is above (or at) the trigger line, AND bottom is still below it.
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveNav(section.name);
                        break; // Stop checking. Priority given to the top-most visible section satisfying the condition.
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header-container ${className}`}>
            {/* Navigation Bar */}
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li className={`nav-item ${activeNav === 'Home' ? 'active' : ''}`} onClick={() => handleNavClick('Home', 'home')}>Home</li>
                    <li className={`nav-item ${activeNav === 'About' ? 'active' : ''}`} onClick={() => handleNavClick('About', 'about')}>About</li>
                    <li className={`nav-item ${activeNav === 'Project' ? 'active' : ''}`} onClick={() => handleNavClick('Project', 'project')}>Project</li>
                    <li className={`nav-item ${activeNav === 'Coding' ? 'active' : ''}`} onClick={() => handleNavClick('Coding', 'coding')}>Coding</li>
                    <li className={`nav-item ${activeNav === 'AI' ? 'active' : ''}`} onClick={() => handleNavClick('AI', 'ai')}>AI</li>
                    <li className={`nav-item ${activeNav === 'Hobbys' ? 'active' : ''}`} onClick={() => handleNavClick('Hobbys', 'hobbys')}>Hobbys</li>
                    <li className={`nav-item last ${activeNav === 'FAQ' ? 'active' : ''}`} onClick={() => handleNavClick('FAQ', 'faq')}>FAQ</li>
                </ul>
            </nav>

            {/* Contact Button */}
            <a href="#contact" className="contact-btn">contact</a>
        </header>
    );
};

export default Header;
