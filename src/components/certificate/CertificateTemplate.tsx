'use client';

import React, { forwardRef } from 'react';

export interface CertificateTemplateProps {
  name: string;
  scale?: number;
  fontStyle?: 'script' | 'serif' | 'cinzel';
}

export const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ name, scale = 1, fontStyle = 'script' }, ref) => {
    const nameTrimmed = name ? name.trim() : '';
    
    // Format name so every word starts with a capital letter regardless of input case
    const formatDisplayName = (rawName: string) => {
      if (!rawName) return 'Jonathan Patterson';
      return rawName
        .trim()
        .split(/\s+/)
        .map((word) => {
          if (!word) return '';
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    };

    const displayName = formatDisplayName(nameTrimmed);
    const length = displayName.length;

    // Dynamic sizing tailored for Great Vibes Calligraphy Script
    let fontSizeStyle: React.CSSProperties = { fontSize: '62px' };
    if (length > 35) {
      fontSizeStyle = { fontSize: '34px' };
    } else if (length > 25) {
      fontSizeStyle = { fontSize: '44px' };
    } else if (length > 18) {
      fontSizeStyle = { fontSize: '52px' };
    }

    const getFontFamily = () => {
      switch (fontStyle) {
        case 'serif':
          return 'var(--font-playfair), Georgia, serif';
        case 'cinzel':
          return 'var(--font-cinzel), serif';
        case 'script':
        default:
          return 'var(--font-great-vibes), cursive';
      }
    };

    return (
      <div
        className="relative overflow-hidden select-none bg-white shadow-2xl transition-all duration-300"
        style={{
          width: '1024px',
          height: '723px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          margin: '0 auto',
        }}
      >
        {/* Printable Canvas Area */}
        <div
          ref={ref}
          id="yodha-certificate-print-area"
          className="relative w-full h-full bg-white"
          style={{ width: '1024px', height: '723px' }}
        >
          {/* Base Certificate Background Image */}
          <img
            src="/Green-Illustrated-Floral-Achievement-Certificate.png"
            alt="Project Yodha Certificate Template"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* NAME OVERLAY LAYER - Centered precisely over the right-side text content area */}
          <div
            className="absolute flex items-center justify-center text-center pointer-events-none"
            style={{
              left: '320px',
              width: '665px',
              top: '265px',
              height: '130px',
            }}
          >
            <span
              className="w-full text-center inline-block tracking-normal text-[#d4af37] font-medium"
              style={{
                fontFamily: getFontFamily(),
                ...fontSizeStyle,
                lineHeight: 1.2,
                wordBreak: 'break-word',
                maxHeight: '100%',
                color: '#d4af37',
                textAlign: 'center',
                textShadow: '0px 1px 1px rgba(180, 130, 20, 0.3)',
              }}
            >
              {displayName}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';
export default CertificateTemplate;

