'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Download, CheckCircle, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface CertificateControlsProps {
  certificateRef: React.RefObject<HTMLDivElement | null>;
  participantName: string;
}

export const CertificateControls: React.FC<CertificateControlsProps> = ({
  certificateRef,
  participantName,
}) => {
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [downloadingPNG, setDownloadingPNG] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  const formatFileName = (name: string, extension: string) => {
    // Format name: trim, replace multi-spaces with single space, replace spaces with hyphens
    const cleanName = name
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, ''); // strip any system filename unsafe characters
    return `Project-Yodha-Certificate-${cleanName}.${extension}`;
  };

  const showNotification = (text: string, type: 'success' | 'error') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '' });
    }, 4000);
  };

  const handleDownloadPNG = async () => {
    if (!certificateRef.current) return;
    setDownloadingPNG(true);
    setStatusMessage({ text: 'Generating PNG image...', type: '' });

    try {
      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024,
        windowHeight: 723,
        onclone: (clonedDoc) => {
          const clonedArea = clonedDoc.getElementById('yodha-certificate-print-area');
          if (clonedArea) {
            clonedArea.style.transform = 'none';
            if (clonedArea.parentElement) {
              clonedArea.parentElement.style.transform = 'none';
              clonedArea.parentElement.style.width = '1024px';
              clonedArea.parentElement.style.height = '723px';
            }
          }
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = formatFileName(participantName, 'png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('PNG certificate downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PNG:', error);
      showNotification('Failed to generate PNG certificate.', 'error');
    } finally {
      setDownloadingPNG(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setDownloadingPDF(true);
    setStatusMessage({ text: 'Generating PDF document...', type: '' });

    try {
      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024,
        windowHeight: 723,
        onclone: (clonedDoc) => {
          const clonedArea = clonedDoc.getElementById('yodha-certificate-print-area');
          if (clonedArea) {
            clonedArea.style.transform = 'none';
            if (clonedArea.parentElement) {
              clonedArea.parentElement.style.transform = 'none';
              clonedArea.parentElement.style.width = '1024px';
              clonedArea.parentElement.style.height = '723px';
            }
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // A4 Landscape dimensions: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.save(formatFileName(participantName, 'pdf'));
      
      showNotification('PDF certificate downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showNotification('Failed to generate PDF certificate.', 'error');
    } finally {
      setDownloadingPDF(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mt-6 px-4">
      {/* Dynamic Status / Progress Alert */}
      {statusMessage.text && (
        <div
          className={`flex items-center space-x-2 text-sm px-4 py-2.5 rounded-full border transition-all duration-300 ${
            statusMessage.type === 'success'
              ? 'bg-[#1b3a24]/85 text-emerald-300 border-emerald-500/40'
              : statusMessage.type === 'error'
              ? 'bg-red-950/80 text-rose-300 border-rose-500/30'
              : 'bg-[#142a1b]/90 text-zinc-300 border-[#d4af37]/30'
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
          {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {!statusMessage.type && (
            <div className="w-3.5 h-3.5 border-2 border-t-transparent border-[#d4af37] rounded-full animate-spin" />
          )}
          <span className="font-sans font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Button controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* PDF Download Button */}
        <motion.button
          onClick={handleDownloadPDF}
          disabled={downloadingPDF || downloadingPNG}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group overflow-hidden rounded-xl p-[2px] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {/* Animated golden gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#aa771c] via-[#fcf6ba] to-[#b38728] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center justify-center space-x-2.5 bg-[#0b170e] hover:bg-[#0f2214] text-white px-6 py-3.5 rounded-[10px] transition-colors font-semibold font-sans tracking-wide">
            {downloadingPDF ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-[#d4af37] rounded-full animate-spin" />
            ) : (
              <FileText className="w-5 h-5 text-[#d4af37] group-hover:animate-bounce" />
            )}
            <span>Download PDF</span>
          </div>
        </motion.button>

        {/* PNG Download Button */}
        <motion.button
          onClick={handleDownloadPNG}
          disabled={downloadingPDF || downloadingPNG}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group overflow-hidden rounded-xl p-[2px] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {/* Subtle gold gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#1b3a24] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center justify-center space-x-2.5 bg-[#142a1b] hover:bg-[#1b3a24] text-white px-6 py-3.5 rounded-[10px] transition-colors font-semibold font-sans tracking-wide shadow-lg border border-[#d4af37]/20">
            {downloadingPNG ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <Image className="w-5 h-5 text-[#ffd700] group-hover:scale-110 transition-transform" />
            )}
            <span>Download PNG</span>
          </div>
        </motion.button>
      </div>

      {/* Security note / high quality label */}
      <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-wider text-center">
        High Resolution Print-Ready Files • Generated Client-Side
      </span>
    </div>
  );
};
export default CertificateControls;
