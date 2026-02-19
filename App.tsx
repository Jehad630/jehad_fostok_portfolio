import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-background text-white min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      {/* Global decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/5 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}

export default App;