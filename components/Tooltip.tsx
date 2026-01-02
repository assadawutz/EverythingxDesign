
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="group relative inline-block">
      {children}
      <div className={`absolute z-[60] scale-0 group-hover:scale-100 transition-all duration-200 origin-center pointer-events-none ${positionClasses[position]}`}>
        <div className="bg-slate-900 border border-white/10 text-white text-[10px] font-mono font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap uppercase tracking-wider">
          {content}
          <div className={`absolute w-2 h-2 bg-slate-900 border-r border-b border-white/10 rotate-45 ${
            position === 'top' ? 'top-full -translate-y-1/2 left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'bottom-full translate-y-1/2 left-1/2 -translate-x-1/2' :
            position === 'left' ? 'left-full -translate-x-1/2 top-1/2 -translate-y-1/2' :
            'right-full translate-x-1/2 top-1/2 -translate-y-1/2'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
