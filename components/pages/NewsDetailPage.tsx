
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { Calendar, Share2, Facebook, Twitter, Link, ArrowLeft } from 'lucide-react';

export default function NewsDetailPage({ id, onNavigate }: { id: string | number | null, onNavigate: any }) {
  return (
    <section className="py-16 bg-[#F9FAFB] min-h-screen font-kanit">
      <div className="container mx-auto px-4 max-w-[1000px]">
        
        <button 
            onClick={() => onNavigate('NEWS')}
            className="mb-8 flex items-center gap-2 text-gray-500 hover:text-okmd-cyan transition-colors font-medium"
        >
            <ArrowLeft className="w-5 h-5" /> ย้อนกลับ
        </button>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="bg-okmd-cyan/10 text-okmd-cyan px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">PR News</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 20 มี.ค. 2024</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-okmd-dark leading-[1.2] mb-8">
                OKMD จับมือพันธมิตร ยกระดับศูนย์การเรียนรู้ชุมชนสู่ Digital Knowledge Hub
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
                <img 
                    src="https://placehold.co/960x540/f0f0f0/cccccc?text=News+Cover" 
                    className="w-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="News Cover" 
                />
            </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed">
            <p className="text-xl md:text-2xl text-okmd-dark font-medium mb-8 leading-relaxed">
                สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน) หรือ OKMD เดินหน้าโครงการพัฒนาแหล่งเรียนรู้ต้นแบบ นำร่อง 10 จังหวัดทั่วประเทศ มุ่งเน้นการเข้าถึงองค์ความรู้ผ่านเทคโนโลยีดิจิทัล
            </p>
            <p className="mb-6">
                เนื้อหาข่าวโดยละเอียด... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h3 className="text-2xl font-bold text-okmd-dark mt-10 mb-4">เป้าหมายของโครงการ</h3>
            <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> ยกระดับคุณภาพชีวิตชุมชนด้วยความรู้</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> สร้างเครือข่ายการเรียนรู้ที่ยั่งยืน</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> พัฒนานวัตกรรมชุมชน</li>
            </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-okmd-dark flex items-center gap-2">
                    <Share2 className="w-5 h-5" /> แชร์ข่าวนี้ :
                    </span>
                    <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"><Facebook className="w-5 h-5" /></button>
                    <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"><Twitter className="w-5 h-5" /></button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"><Link className="w-5 h-5" /></button>
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
