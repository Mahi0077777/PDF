import { PDFDocument } from 'pdf-lib';
import { PdfFile } from '../types';

export const mergePdfFiles = async (files: PdfFile[]): Promise<Uint8Array> => {
  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of files) {
      // Read the file as an ArrayBuffer
      const fileBuffer = await pdfFile.file.arrayBuffer();
      
      // Load the PDF
      const pdf = await PDFDocument.load(fileBuffer);
      
      // Copy all pages from the source PDF to the merged PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      
      // Add each copied page to the merged PDF
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await mergedPdf.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error merging PDFs:", error);
    throw new Error("Failed to merge PDF files. Please ensure files are not corrupted.");
  }
};

export const getPageCount = async (file: File): Promise<number> => {
    try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        return doc.getPageCount();
    } catch (e) {
        console.warn("Could not count pages for file", file.name);
        return 0;
    }
};