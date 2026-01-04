
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
      <Home className="w-4 h-4 mb-0.5" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
          {item.onClick ? (
            <button 
              onClick={item.onClick}
              className="hover:text-okmd-cyan transition-colors font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-okmd-cyan font-bold truncate">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
