import React from 'react';
import { EXPERIENCE } from '../constants';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
              
              <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-8 md:mb-0`}>
                  <h3 className="text-2xl font-bold text-white mb-1">{job.company}</h3>
                  <div className={`flex items-center gap-2 text-blue-400 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <Briefcase size={16} />
                    <span className="font-medium">{job.role}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.description.map((point, i) => (
                      <li key={i} className={`text-gray-400 text-sm leading-relaxed ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-blue-500 z-10">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                {/* Date & Location (Opposite Side) */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`inline-flex flex-col gap-2 p-4 rounded-xl bg-surface/50 border border-white/5 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      <span className="text-sm">{job.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;