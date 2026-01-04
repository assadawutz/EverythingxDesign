
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';

export default function AboutPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-[960px]">
        <SectionTitle title="เกี่ยวกับ OKMD" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "เกี่ยวกับเรา" }
        ]} />
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="lead font-light text-xl">
            สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน) หรือ OKMD จัดตั้งขึ้นเพื่อส่งเสริมให้สังคมไทยเป็นสังคมแห่งการเรียนรู้
          </p>
          <img src="https://placehold.co/960x400/eef2f6/333?text=Organization+Structure" className="w-full rounded-2xl my-8 border border-gray-100" alt="Org" />
          
          <h3>วิสัยทัศน์ (Vision)</h3>
          <blockquote className="border-l-4 border-okmd-cyan bg-cyan-50 p-6 rounded-r-lg not-italic">
            "ขับเคลื่อนสังคมอุดมปัญญา ด้วยการจัดการความรู้และความคิดสร้างสรรค์"
          </blockquote>

          <h3>พันธกิจ (Mission)</h3>
          <ol>
            <li>พัฒนาแหล่งเรียนรู้ต้นแบบที่ทันสมัย</li>
            <li>ส่งเสริมนวัตกรรมทางความคิด</li>
            <li>สร้างเครือข่ายการเรียนรู้ทั่วประเทศ</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
