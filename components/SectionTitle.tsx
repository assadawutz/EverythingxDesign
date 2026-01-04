
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, className = '', align = 'left' }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <span className="block text-okmd-cyan font-bold uppercase tracking-wider text-sm mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-okmd-dark leading-tight">
        {title}
      </h2>
      <div className={`h-1.5 w-16 bg-okmd-cyan mt-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
