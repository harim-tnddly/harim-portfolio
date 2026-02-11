import React, { useState, useEffect, useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    // 0. Disable smooth scroll temporarily to ensure instant jump
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // 1. Force Scroll to Top on Refresh (Aggressive)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Clear any hash to prevent browser jumping to section
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Multiple attempts to force scroll to top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome/Firefox

    // Double check with timeout to override browser actions
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 0);

    // Triple check after layout settles
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // 2. Lock Scroll during Intro (Delayed slightly to allow scroll reset first)
    // If we lock immediately while browser is restoring scroll, scrollTo(0,0) might fail.
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
    }, 50);

    // 3. Unlock Scroll & Show Header after Intro (3s)
    const timer = setTimeout(() => {
      setShowHeader(true);
      document.body.style.overflow = 'unset'; // Unlock scroll

      // Auto-move logic disabled per request ("Go to Home top 0 first")
      // const nextSection = document.getElementById('about');
      // if (nextSection) {
      //   nextSection.scrollIntoView({ behavior: 'smooth' });
      // }
    }, 3000); // 3s delay

    // Safety: Reset scroll on unload to prevent restoration next time
    const handleUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset'; // Cleanup
      window.removeEventListener('beforeunload', handleUnload);
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