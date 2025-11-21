import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pb-12 pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
                The #1 Free PDF Merger Tool
            </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Merge PDF Files <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600">Online for Free</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          The fastest PDF Combiner and Joiner. Combine multiple PDF files into one document instantly. No uploads, no wait times, just a secure <strong>free PDF merger</strong> that runs in your browser.
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-x-8 text-sm leading-6 text-slate-500">
            <div className="flex items-center gap-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Unlimited Merging
            </div>
            <div className="flex items-center gap-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> No Signup Needed
            </div>
            <div className="flex items-center gap-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> 100% Secure
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;