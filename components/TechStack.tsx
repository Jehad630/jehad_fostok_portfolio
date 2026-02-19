import React from 'react';
import { SKILLS } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white capitalize mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                {category}
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors p-2">
                      <i className={`${skill.iconClass} text-3xl transition-transform group-hover:scale-110`}></i>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;