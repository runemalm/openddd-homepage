
import React from 'react';
import { X, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-slate-900 py-12 md:py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-white/70">© {new Date().getFullYear()} OpenDDD. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 items-center">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
              <span className="sr-only">X (formerly Twitter)</span>
              <X className="h-5 w-5" />
            </a>
            <a href="https://github.com/runemalm/OpenDDD.NET" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
