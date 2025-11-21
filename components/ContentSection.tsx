import React from 'react';
import { ShieldCheck, Zap, Layers, Globe } from 'lucide-react';

const ContentSection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Premium PDF Tools</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why use our Free PDF Merger?
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            MergeFlow is the best <strong>PDF Combiner</strong> on the web. Whether you need to join two documents or bind an entire ebook, our free tool handles it instantly on your device.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <ShieldCheck className="h-5 w-5 flex-none text-indigo-600" />
                Secure PDF Joiner
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Most online tools upload your files to a remote server. MergeFlow is different. We use a client-side <strong>PDF merger</strong> engine (WebAssembly) so your sensitive documents never leave your computer.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <Zap className="h-5 w-5 flex-none text-indigo-600" />
                Combine PDFs Instantly
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Stop waiting for uploads. Our <strong>online PDF combiner</strong> works at lightning speed. Drag, drop, and merge in milliseconds, regardless of file size.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <Layers className="h-5 w-5 flex-none text-indigo-600" />
                PDF Binder & Organizer
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Need to reorder pages? Use our visual <strong>PDF binder</strong> interface to arrange your files exactly how you want them before combining them into a single PDF file.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <Globe className="h-5 w-5 flex-none text-indigo-600" />
                Completely Free PDF Tool
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  We believe productivity should be free. Use this <strong>free PDF merger</strong> as many times as you want. No daily limits, no watermarks, and no hidden costs.
                </p>
              </dd>
            </div>
          </dl>
        </div>

        {/* How-To Section - Critical for "How to merge pdf" search queries */}
        <div className="mt-32 rounded-2xl bg-slate-50 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-2xl lg:max-w-none">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">
                    How to combine PDF files online?
                </h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-slate-900">
                            <span className="absolute left-0 top-1 text-indigo-600 font-bold">1.</span>
                            Select Files
                        </dt>
                        <dd className="mt-2 text-sm text-slate-600">
                            Click "Select PDF Files" or drag and drop your documents into the <strong>free PDF merger</strong> box.
                        </dd>
                    </div>
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-slate-900">
                            <span className="absolute left-0 top-1 text-indigo-600 font-bold">2.</span>
                            Arrange Order
                        </dt>
                        <dd className="mt-2 text-sm text-slate-600">
                            Use the drag-and-drop interface to sort your files. Our <strong>PDF combiner</strong> merges them in this exact order.
                        </dd>
                    </div>
                    <div className="relative pl-9">
                        <dt className="inline font-semibold text-slate-900">
                            <span className="absolute left-0 top-1 text-indigo-600 font-bold">3.</span>
                            Merge PDF
                        </dt>
                        <dd className="mt-2 text-sm text-slate-600">
                            Click the "Merge PDFs" button. The browser will <strong>combine your PDF files</strong> instantly.
                        </dd>
                    </div>
                     <div className="relative pl-9">
                        <dt className="inline font-semibold text-slate-900">
                            <span className="absolute left-0 top-1 text-indigo-600 font-bold">4.</span>
                            Download
                        </dt>
                        <dd className="mt-2 text-sm text-slate-600">
                            Your new merged document is ready. Save it securely to your device.
                        </dd>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;