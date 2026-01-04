
import React from 'react';
import { PageRoute } from '../../App';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import NewsCard from '../NewsCard';
import { ChevronRight, BookOpen } from 'lucide-react';

export default function KnowledgeListPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-[#F9FAFB] min-h-screen font-kanit">
      <div className="container mx-auto px-4 md:px-12">
        <div className="mb-10">
            <SectionTitle title="คลังความรู้" subtitle="OKMD Knowledge Shelf" />
            <Breadcrumb items={[
            { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
            { label: "คลังความรู้" }
            ]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Menu - Styled to match Home Page Knowledge Box */}
          <aside className="md:col-span-3">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-okmd-cyan/10 rounded-xl flex items-center justify-center text-okmd-cyan">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-okmd-dark">หมวดหมู่</h3>
              </div>
              <ul className="space-y-2">
                {['ทั้งหมด', 'บทความ (Articles)', 'งานวิจัย (Research)', 'นิตยสาร (Magazine)', 'Infographic', 'VDO Knowledge'].map((item, idx) => (
                  <li key={item}>
                    <button className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex justify-between items-center group ${
                        idx === 0 
                        ? 'bg-okmd-cyan text-white shadow-md shadow-cyan-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-okmd-cyan'
                    }`}>
                      {item}
                      {idx !== 0 && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Grid */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <NewsCard 
                  key={i}
                  data={{
                    id: i,
                    title: `การบริหารจัดการความรู้ในยุคดิจิทัล ตอนที่ ${i}`,
                    category: 'Article',
                    date: '15 มี.ค. 2024'
                  }}
                  onClick={() => {}}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-16">
              <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-white hover:shadow-md transition-all font-bold text-gray-500">1</button>
              <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-okmd-dark text-white shadow-lg font-bold">2</button>
              <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-white hover:shadow-md transition-all font-bold text-gray-500">3</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
