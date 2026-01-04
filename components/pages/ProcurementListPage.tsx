
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { FileText, Download } from 'lucide-react';

export default function ProcurementListPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-white min-h-screen font-kanit">
      <div className="container mx-auto px-4">
        <SectionTitle title="จัดซื้อจัดจ้าง" subtitle="Procurement" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "จัดซื้อจัดจ้าง" }
        ]} />

        <div className="space-y-6 mt-8">
            {/* Header for list (Optional, but adds structure) */}
            <div className="bg-okmd-secondary text-white px-6 py-4 rounded-t-lg hidden md:block">
                <h3 className="font-bold">รายการประกาศจัดซื้อจัดจ้างล่าสุด</h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-b-lg rounded-t-lg md:rounded-t-none overflow-hidden shadow-sm">
            {[1, 2, 3, 4, 5].map((i) => (
                <div 
                key={i} 
                className="p-6 border-b border-gray-100 last:border-0 hover:bg-[#F9FAFB] transition-colors flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer"
                onClick={() => onNavigate('PROCUREMENT_DETAIL', i)}
                >
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-okmd-dark mb-3 group-hover:text-okmd-cyan transition-colors leading-relaxed">
                        ประกาศประกวดราคาจ้างเหมาบริการดูแลรักษาระบบสารสนเทศ ประจำปีงบประมาณ 256{8-i} ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์ (e-bidding)
                    </h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> เลขที่โครงการ: 65037{i}0932</span>
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> วันที่ประกาศ: {10+i} มี.ค. 2567</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0 self-start md:self-center w-full md:w-auto mt-2 md:mt-0">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-okmd-cyan text-okmd-cyan hover:bg-okmd-cyan hover:text-white rounded-lg transition-all text-sm font-bold w-full md:w-auto">
                        <Download className="w-4 h-4" /> ดาวน์โหลดเอกสาร
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">{'<'}</button>
            {[1, 2, 3, 4, 5].map(page => (
                <button key={page} className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${page === 1 ? 'bg-okmd-cyan text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    {page}
                </button>
            ))}
            <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">{'>'}</button>
        </div>
      </div>
    </section>
  );
}
