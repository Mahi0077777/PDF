import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Upload, ArrowRight, Loader2, Download, Trash2, Plus, Share2, Copy, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import FileCard from './components/FileCard';
import ContentSection from './components/ContentSection';
import { mergePdfFiles, getPageCount } from './services/pdfService';
import { PdfFile, MergeStatus } from './types';
import { cn } from './utils/cn';

const App: React.FC = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [status, setStatus] = useState<MergeStatus>(MergeStatus.IDLE);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Handle File Drops
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setErrorMessage(null);
    const newFiles: PdfFile[] = acceptedFiles.map((file) => ({
      id: uuidv4(),
      file,
      name: file.name,
      size: file.size,
      pageCount: undefined
    }));

    // Optimistic update
    setFiles((prev) => [...prev, ...newFiles]);

    // Async load page counts
    for (const newFile of newFiles) {
        const count = await getPageCount(newFile.file);
        setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, pageCount: count } : f));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    noClick: true,
    noKeyboard: true
  });

  // Handle List Reorder
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  };

  // Remove File
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    // Reset if we modify list after merge
    if (status === MergeStatus.COMPLETED) {
        resetState();
        // Keep files though, just reset status
        setStatus(MergeStatus.IDLE); 
    }
  };

  const resetState = () => {
      setStatus(MergeStatus.IDLE);
      setMergedPdfUrl(null);
      setErrorMessage(null);
      setIsCopied(false);
  };

  const handleClearAll = () => {
      setFiles([]);
      resetState();
  }

  // Merge Logic
  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMessage("Please upload at least 2 PDF files to merge.");
      return;
    }

    setStatus(MergeStatus.PROCESSING);
    setErrorMessage(null);

    // Small timeout to allow UI to update to "Processing" state
    setTimeout(async () => {
        try {
            const mergedBytes = await mergePdfFiles(files);
            const blob = new Blob([mergedBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            setMergedPdfUrl(url);
            setStatus(MergeStatus.COMPLETED);
        } catch (error) {
            console.error(error);
            setStatus(MergeStatus.ERROR);
            setErrorMessage("Failed to merge PDFs. One of the files might be corrupted or password protected.");
        }
    }, 100);
  };

  const downloadFile = () => {
      if (!mergedPdfUrl) return;
      const link = document.createElement('a');
      link.href = mergedPdfUrl;
      link.download = `merged-document-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleShare = async () => {
      const shareData = {
          title: 'MergeFlow - Free PDF Merger',
          text: 'I just merged my PDF files for free using MergeFlow! No upload limits and secure.',
          url: window.location.href
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err) {
              console.log('Share cancelled');
          }
      } else {
          // Fallback to copy to clipboard
          try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          } catch (err) {
              console.error('Failed to copy', err);
          }
      }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main>
        <Hero />

        {/* Main Interaction Area */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
            
            {/* Conditional Main Box */}
            <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5">
                
                {/* Empty State / Drop Zone */}
                {files.length === 0 && (
                    <div 
                        {...getRootProps()}
                        className={cn(
                            "flex flex-col items-center justify-center px-6 py-20 text-center transition-colors cursor-pointer rounded-2xl border-2 border-dashed",
                            isDragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"
                        )}
                        onClick={open}
                    >
                        <input {...getInputProps()} />
                        <div className="mb-4 rounded-full bg-indigo-50 p-4 ring-1 ring-indigo-100">
                            <Upload className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Drop PDF files here</h3>
                        <p className="mt-1 text-sm text-slate-500">or click to select files from your computer</p>
                        <button className="mt-6 rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Select PDF Files
                        </button>
                    </div>
                )}

                {/* File List & Actions */}
                {files.length > 0 && (
                    <div className="p-6 sm:p-8">
                        <div className="mb-6 flex items-center justify-between">
                             <h2 className="text-lg font-semibold text-slate-900">
                                {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
                             </h2>
                             <div className="flex gap-2">
                                <button 
                                    onClick={open}
                                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                                >
                                    <Plus className="h-4 w-4" /> Add More
                                </button>
                                <button 
                                    onClick={handleClearAll}
                                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" /> Clear
                                </button>
                             </div>
                        </div>

                        {/* Draggable List */}
                        <div className="mb-8">
                             <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="pdf-list">
                                    {(provided) => (
                                        <div 
                                            {...provided.droppableProps} 
                                            ref={provided.innerRef}
                                            className="flex flex-col gap-3"
                                        >
                                            {files.map((file, index) => (
                                                <FileCard 
                                                    key={file.id} 
                                                    file={file} 
                                                    index={index} 
                                                    onRemove={removeFile} 
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        
                        {/* Action Area */}
                        <div className="flex flex-col items-center justify-center gap-4 border-t border-slate-100 pt-8">
                            {errorMessage && (
                                <div className="mb-4 w-full rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
                                    {errorMessage}
                                </div>
                            )}

                            {status === MergeStatus.IDLE && (
                                <button
                                    onClick={handleMerge}
                                    disabled={files.length < 2}
                                    className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:w-auto"
                                >
                                    Merge PDFs <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            )}

                            {status === MergeStatus.PROCESSING && (
                                <button
                                    disabled
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 px-8 py-4 text-lg font-bold text-slate-400 sm:w-auto"
                                >
                                    <Loader2 className="h-5 w-5 animate-spin text-indigo-600" /> Processing...
                                </button>
                            )}

                            {status === MergeStatus.COMPLETED && (
                                <div className="flex w-full flex-col items-center gap-4">
                                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                                        <button
                                            onClick={downloadFile}
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-105 hover:bg-green-500 sm:w-auto"
                                        >
                                            <Download className="h-5 w-5" /> Download Merged PDF
                                        </button>
                                        
                                        {/* Viral Share Button */}
                                        <button
                                            onClick={handleShare}
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 sm:w-auto"
                                        >
                                            {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                                            {isCopied ? 'Link Copied!' : 'Share Tool'}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleClearAll();
                                            open();
                                        }}
                                        className="text-sm font-medium text-slate-500 hover:text-indigo-600"
                                    >
                                        Merge New Files
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">Secure Processing</h3>
                    <p className="mt-2 text-sm text-slate-500">Files are processed locally in your browser and are never uploaded to our servers.</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                     <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">Lightning Fast</h3>
                    <p className="mt-2 text-sm text-slate-500">No queuing, no upload time. The merging happens instantly on your device.</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                     <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">Drag & Drop</h3>
                    <p className="mt-2 text-sm text-slate-500">Intuitive interface. Reorder files easily before merging.</p>
                </div>
            </div>
        </div>

        {/* New Content Section injected here */}
        <ContentSection />

        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;