
import React, { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { PageRoute } from '../App';

interface HeaderProps {
  onNavigate: (route: PageRoute) => void;
  currentRoute: PageRoute;
}

export default function Header({ onNavigate, currentRoute }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; hasDropdown?: boolean }[] = [
    { label: "รู้จัก OKMD", route: 'ABOUT', hasDropdown: true },
    { label: "ข่าวประชาสัมพันธ์", route: 'NEWS', hasDropdown: true },
    { label: "ปฏิทินและกิจกรรม", route: 'ACTIVITY', hasDropdown: false },
    { label: "บริการความรู้", route: 'KNOWLEDGE', hasDropdown: true },
    { label: "ร่วมงานกับเรา", route: 'CAREER', hasDropdown: true },
    { label: "ติดต่อเรา", route: 'CONTACT', hasDropdown: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-kanit">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-[100px] px-4 md:px-8 lg:px-12">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('HOME')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-5xl font-bold text-okmd-cyan leading-none tracking-tight">okmd</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`text-[16px] flex items-center gap-1 transition-colors ${
                  currentRoute === item.route ? 'text-okmd-dark font-bold' : 'text-okmd-dark font-normal hover:text-okmd-cyan'
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-okmd-dark hover:text-okmd-cyan transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Language & Accessibility */}
            <div className="flex items-center gap-3 border-l border-r border-gray-200 px-4 h-8">
              <div className="flex items-center gap-1">
                 <img src="https://flagcdn.com/w40/th.png" className="w-6 h-4 rounded-sm shadow-sm" alt="TH" />
                 <ChevronDown className="w-3 h-3 text-gray-500" />
              </div>
              
              <div className="flex gap-1 items-end">
                 <button className="w-5 h-5 bg-gray-100 rounded text-[10px] flex items-center justify-center text-black hover:bg-gray-200">ก</button>
                 <button className="w-6 h-6 bg-gray-100 rounded text-xs flex items-center justify-center text-black hover:bg-gray-200">ก</button>
                 <button className="w-7 h-7 bg-gray-100 rounded text-sm flex items-center justify-center text-black hover:bg-gray-200">ก</button>
              </div>

              <div className="flex gap-1">
                 <button className="w-6 h-6 bg-white border border-gray-300 rounded text-xs flex items-center justify-center text-black font-serif">C</button>
                 <button className="w-6 h-6 bg-black rounded text-xs flex items-center justify-center text-white font-serif">C</button>
                 <button className="w-6 h-6 bg-[#FFFF00] rounded text-xs flex items-center justify-center text-black font-serif border border-black">C</button>
              </div>
            </div>

            <button className="bg-okmd-secondary text-white px-4 py-2 rounded-md font-medium hover:bg-cyan-400 transition-colors shadow-sm text-sm">
                สิทธิประโยชน์ทางภาษี
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden p-2 text-okmd-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen z-50 overflow-y-auto pb-20">
          <div className="container mx-auto py-6 flex flex-col gap-4 px-6">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setIsMenuOpen(false);
                }}
                className={`text-left px-4 py-4 rounded-xl text-lg font-medium border-b border-gray-50 flex justify-between items-center ${
                  currentRoute === item.route ? 'text-okmd-cyan' : 'text-okmd-dark'
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
            <div className="mt-4 px-4 space-y-4">
                <button className="w-full bg-okmd-secondary text-white px-4 py-3 rounded-lg font-medium">
                    สิทธิประโยชน์ทางภาษี
                </button>
                
                {/* Mobile Accessibility */}
                <div className="flex flex-wrap gap-4 justify-center py-4 border-t border-gray-100">
                    <div className="flex gap-2 items-end">
                        <button className="w-8 h-8 bg-gray-100 rounded text-xs flex items-center justify-center text-black">ก</button>
                        <button className="w-10 h-10 bg-gray-100 rounded text-sm flex items-center justify-center text-black">ก</button>
                        <button className="w-12 h-12 bg-gray-100 rounded text-base flex items-center justify-center text-black">ก</button>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 bg-white border border-gray-300 rounded text-sm flex items-center justify-center text-black font-serif">C</button>
                        <button className="w-10 h-10 bg-black rounded text-sm flex items-center justify-center text-white font-serif">C</button>
                        <button className="w-10 h-10 bg-[#FFFF00] rounded text-sm flex items-center justify-center text-black font-serif border border-black">C</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
