
import React from 'react';
import { PageRoute } from '../App';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-okmd-cyan text-white pt-16 pb-8 font-kanit relative overflow-hidden">
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-10">
          {/* Brand */}
          <div className="space-y-4 max-w-md">
            <h1 className="text-6xl font-bold mb-2 tracking-tighter">okmd</h1>
            <h2 className="text-3xl md:text-4xl font-medium leading-tight">
              Office of Knowledge<br/>
              Management and<br/>
              Development
            </h2>
            <div className="pt-4 text-lg font-light text-white/90">
              <p>โทรศัพท์ : 0 2105 6500</p>
              <p>อีเมล : saraban@okmd.or.th</p>
            </div>
          </div>

          {/* Social & Complaint */}
          <div className="flex flex-col items-start lg:items-end gap-6">
             <div>
                <h4 className="text-lg font-medium mb-4 lg:text-right">ช่องทางติดตาม</h4>
                <div className="flex gap-3">
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-facebook-f text-xl"></i></a>
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-line text-xl"></i></a>
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-youtube text-xl"></i></a>
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-tiktok text-xl"></i></a>
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-instagram text-xl"></i></a>
                   <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-okmd-cyan hover:opacity-90 transition-opacity"><i className="fa-brands fa-x-twitter text-xl"></i></a>
                </div>
             </div>
             <button 
                onClick={() => onNavigate('COMPLAINT')}
                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-lg"
             >
                รับเรื่องร้องเรียน
             </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-t border-white/20">
            <div className="space-y-3">
               <a href="#" className="block hover:underline text-white/90 font-light">คำรับรองการปฏิบัติงาน</a>
               <a href="#" className="block hover:underline text-white/90 font-light">การกำกับการดูแลกิจการ</a>
               <a href="#" className="block hover:underline text-white/90 font-light">แผนการดำเนินงาน</a>
               <a href="#" className="block hover:underline text-white/90 font-light">เอกสารและรายงาน</a>
               <a href="#" className="block hover:underline text-white/90 font-light">ศูนย์ข้อมูลข่าวสารอิเล็กทรอนิกส์ของ สบร.</a>
               <a href="#" className="block hover:underline text-white/90 font-light">คู่มือ / แนวทางการปฎิบัติงาน</a>
               <a href="#" className="block hover:underline text-white/90 font-light">ข้อมูลสาธารณะขององค์กร</a>
            </div>
            <div className="space-y-3">
               <a href="#" className="block hover:underline text-white/90 font-light">OKMD AI</a>
               <a href="#" className="block hover:underline text-white/90 font-light">OKMD Knowledge Portal</a>
               <a href="#" className="block hover:underline text-white/90 font-light">OKMD Magazine</a>
            </div>
            <div className="space-y-3">
               <a href="#" className="block hover:underline text-white/90 font-light">จัดซื้อจัดจ้าง</a>
               <a href="#" className="block hover:underline text-white/90 font-light">สมัครงาน</a>
               <a href="#" className="block hover:underline text-white/90 font-light">ฝึกงาน</a>
            </div>
            <div className="space-y-3">
               {/* Spacer or additional links */}
            </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light text-white/80">
          <p>ลิขสิทธิ์ © 2547 - 2568 OKMD สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน) สงวนลิขสิทธิ์</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">นโยบายการคุ้มครองส่วนบุคคล</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:underline">แผนผังเว็บ</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:underline">นโยบายการใช้คุกกี้</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
