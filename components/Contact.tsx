import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Work Together</h2>
        <p className="text-gray-400 mb-12 max-w-lg mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Email</h3>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Phone</h3>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Location</h3>
              <p className="text-sm text-gray-400">
                {PERSONAL_INFO.location}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Jehad Fostok. All rights reserved.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;