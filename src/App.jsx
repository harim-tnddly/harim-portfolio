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
    // [FIX] Simple & Robust Timer: Show header exactly after 5 seconds
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 5000);

    return () => clearTimeout(timer);
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