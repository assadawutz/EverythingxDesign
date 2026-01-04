
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]' :
             type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]' :
             'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]';
  
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Info;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-in slide-in-from-right-10 fade-in duration-300 ${bg}`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm font-mono font-medium">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity"><X className="w-4 h-4" /></button>
    </div>
  );
};
