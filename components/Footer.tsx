import React from 'react';
import { Heart, Shield, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col items-center md:items-start">
             <span className="text-lg font-bold text-slate-900">MergeFlow PDF</span>
             <p className="mt-2 text-sm text-slate-500 text-center md:text-left max-w-md">
                 The best <strong>Free PDF Merger</strong> on the web. Securely combine, join, and bind your PDF files instantly without uploads.
             </p>
          </div>
          
          <div className="mt-8 flex flex-col items-center md:mt-0 md:items-end">
            <p className="flex items-center text-sm text-slate-500">
              Made with <Heart className="mx-1 h-4 w-4 fill-red-500 text-red-500" /> for the web
            </p>
            <p className="mt-2 text-xs text-slate-400">
                © {new Date().getFullYear()} MergeFlow. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Trust & Privacy Section - Critical for SEO TrustRank */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
            <div className="text-xs text-slate-500">
                <div className="flex items-center gap-2 mb-2 font-semibold text-slate-700">
                    <Lock className="h-3 w-3" /> Privacy Policy
                </div>
                <p className="leading-relaxed">
                    MergeFlow operates entirely in your browser using client-side technology. 
                    <strong>We do not store, upload, or view your files.</strong> 
                    Your documents remain on your device at all times. 
                    We do not use cookies for tracking or personalized ads.
                </p>
            </div>
             <div className="text-xs text-slate-500">
                <div className="flex items-center gap-2 mb-2 font-semibold text-slate-700">
                    <Shield className="h-3 w-3" /> Terms of Service
                </div>
                <p className="leading-relaxed">
                    This service is provided "as is" completely free of charge. 
                    MergeFlow is not responsible for any data loss or corruption. 
                    By using this tool, you agree that all processing happens locally on your machine.
                </p>
            </div>
        </div>

        {/* SEO Keywords Footer Block - Helps with long-tail indexing */}
        <div className="mt-8 border-t border-slate-100 pt-8">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
                Popular Searches: 
                <span className="mx-1">Free PDF Merger</span> • 
                <span className="mx-1">Combine PDF Files</span> • 
                <span className="mx-1">Join PDF Online</span> • 
                <span className="mx-1">PDF Combiner Free</span> • 
                <span className="mx-1">Merge PDF Documents</span> • 
                <span className="mx-1">No Limit PDF Merger</span> •
                <span className="mx-1">Combine PDF Mac</span> •
                <span className="mx-1">PDF Binder Windows</span>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;