import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Coding from './pages/Coding';
import Ai from './pages/Ai';
import Process from './pages/Process';
import Portfolio from './pages/Portfolio';
import Hobbys from './pages/Hobbys';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

import BackgroundLines from './components/BackgroundLines';

function App() {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    // 1. Force Scroll to Top on Refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Lock Scroll during Intro
    document.body.style.overflow = 'hidden';

    // 3. Unlock Scroll & Show Header & Auto-Scroll after Intro (3s)
    const timer = setTimeout(() => {
      setShowHeader(true);
      document.body.style.overflow = 'unset'; // Unlock scroll

      // Auto-move to next section naturally
      const nextSection = document.getElementById('about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000); // 3s delay (2s stars + 1s formation buffer)

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset'; // Cleanup
    };
  }, []);

  return (
    <div className="App">
      <Header className={showHeader ? 'fade-in' : 'hidden'} />
      <main>
        <Home />
        <About />

        {/* Dark Zone with Background Lines */}
        <div className="dark-theme-zone">
          <BackgroundLines />
          <Project />
          <Coding />
          <Ai />
        </div>

        <Process />
        <Portfolio />
        <Hobbys />
        <Faq />
        <Contact />
        {/* 추후 추가 섹션 */}
      </main>
    </div>
  );
}

export default App;