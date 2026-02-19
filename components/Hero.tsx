import React from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO, IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-2 border border-blue-500/20">
              Available for hire
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{PERSONAL_INFO.name}</span>
              <br />
              <span className="text-2xl md:text-4xl text-gray-400 font-semibold">{PERSONAL_INFO.title}</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a 
                href="#projects" 
                className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                View Projects <ChevronRight size={18} />
              </a>
              <a 
                href="https://drive.google.com/drive/folders/1Cd_oyQeYg8PSe76m1wCOlKPkuox4c8Es?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Download CV <Download size={18} />
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-6 text-gray-400">
              {PERSONAL_INFO.socials.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-full"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            {/* Adjusted container for portrait aspect ratio */}
            <div className="relative w-64 md:w-80 aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl -rotate-6 border border-white/10"></div>
              <img 
                src={IMAGES.profile} 
                alt="Jehad Fostok" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Fallback if the user hasn't uploaded the image yet
                  target.src = "https://placehold.co/600x800/171717/ffffff?text=Upload+profile.png";
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;