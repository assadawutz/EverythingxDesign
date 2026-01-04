
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center opacity-60 hover:opacity-100 transition-opacity duration-300">
      <div className="p-4 bg-slate-900/50 rounded-full border border-white/5 mb-4 shadow-inner group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-300 font-sans mb-1">{title}</h3>
      <p className="text-xs text-slate-500 font-mono max-w-xs mx-auto mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};
