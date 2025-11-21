import React from 'react';
import { FileStack, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-500/30">
            <FileStack className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">MergeFlow</span>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Features</a>
          <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center gap-4">
             <a 
                href="#" 
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
                onClick={(e) => e.preventDefault()}
             >
                 v1.0.0
             </a>
        </div>
      </div>
    </header>
  );
};

export default Header;