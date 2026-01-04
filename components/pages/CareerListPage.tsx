
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { Briefcase, MapPin, ArrowRight, Clock } from 'lucide-react';

export default function CareerListPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-[#F9FAFB] min-h-screen font-kanit">
      <div className="container mx-auto px-4 md:px-12">
        <SectionTitle title="ร่วมงานกับเรา" subtitle="Careers at OKMD" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "ร่วมงานกับเรา" }
        ]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              onClick={() => onNavigate('CAREER_DETAIL', i)}
              className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-okmd-cyan/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-4 bg-okmd-cyan/10 rounded-2xl text-okmd-cyan group-hover:bg-okmd-cyan group-hover:text-white transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-[#E8F6FA] text-okmd-cyan px-4 py-1.5 rounded-full border border-blue-100">Full Time</span>
              </div>
              
              <h3 className="text-2xl font-bold text-okmd-dark mb-3 group-hover:text-okmd-cyan transition-colors relative z-10">
                นักจัดการความรู้ (Knowledge Manager)
              </h3>
              
              <div className="flex flex-col gap-2 mb-8 relative z-10">
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" /> สำนักงานใหญ่ (พญาไท)
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" /> ประสบการณ์ 2 ปีขึ้นไป
                 </div>
              </div>

              <div className="flex items-center text-okmd-cyan font-bold gap-2 text-sm group-hover:gap-4 transition-all relative z-10">
                ดูรายละเอียดตำแหน่ง <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
