
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { MapPin, Clock, Users, CalendarCheck, ArrowLeft } from 'lucide-react';

export default function ActivityDetailPage({ id, onNavigate }: { id: string | number | null, onNavigate: any }) {
  return (
    <section className="py-16 bg-[#F9FAFB] min-h-screen font-kanit">
      <div className="container mx-auto px-4 md:px-12 max-w-[1100px]">
        
        <button 
            onClick={() => onNavigate('ACTIVITY')}
            className="mb-8 flex items-center gap-2 text-gray-500 hover:text-okmd-cyan transition-colors font-medium"
        >
            <ArrowLeft className="w-5 h-5" /> ย้อนกลับ
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 mb-10">
          <div className="relative h-[400px]">
             <img 
                src="https://placehold.co/1200x600/1B1D20/white?text=Activity+Banner" 
                className="w-full h-full object-cover" 
                alt="Activity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="bg-okmd-cyan text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider w-fit mb-4 shadow-lg">Workshop</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">Design Thinking for Innovation</h1>
                <p className="text-white/80 text-lg">ปลดล็อกความคิดสร้างสรรค์ สู่การพัฒนานวัตกรรม</p>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            
            {/* Bento Grid Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#E8F6FA] p-6 rounded-2xl border border-blue-50">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-okmd-cyan mb-4 shadow-sm">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-okmd-dark text-lg">วันและเวลา</h4>
                <p className="text-gray-600 mt-1">25 เมษายน 2567<br/>09:00 - 16:00 น.</p>
              </div>
              
              <div className="bg-[#FFF8E1] p-6 rounded-2xl border border-yellow-50">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-yellow-500 mb-4 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-okmd-dark text-lg">สถานที่</h4>
                <p className="text-gray-600 mt-1">ห้องประชุม TK Park ชั้น 8<br/>Central World</p>
              </div>

              <div className="bg-[#F3F4F6] p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-500 mb-4 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-okmd-dark text-lg">จำนวนรับสมัคร</h4>
                <p className="text-gray-600 mt-1">50 ท่าน (ไม่มีค่าใช้จ่าย)<br/>*คัดเลือกจากการลงทะเบียน</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3 prose max-w-none text-gray-600">
                    <h3 className="text-2xl font-bold text-okmd-dark mb-4">รายละเอียดกิจกรรม</h3>
                    <p className="mb-6 leading-relaxed">
                        เรียนรู้กระบวนการคิดเชิงออกแบบ (Design Thinking) เพื่อการพัฒนานวัตกรรม และการแก้ปัญหาอย่างสร้างสรรค์ ผ่านการลงมือทำจริง (Workshop) กับวิทยากรผู้เชี่ยวชาญจากสถาบันชั้นนำ ผู้เข้าร่วมจะได้ฝึกฝนการ Empathize, Define, Ideate, Prototype และ Test อย่างเข้มข้น
                    </p>
                    <h4 className="font-bold text-xl text-okmd-dark mb-4">สิ่งที่จะได้รับ</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0">
                        <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> ความเข้าใจพื้นฐาน Design Thinking</li>
                        <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> เครื่องมือสำหรับการระดมสมอง</li>
                        <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> เครือข่ายนักสร้างสรรค์</li>
                        <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"><div className="w-2 h-2 bg-okmd-cyan rounded-full"></div> ใบประกาศนียบัตร (Certificate)</li>
                    </ul>
                </div>
                
                <div className="lg:w-1/3">
                    <div className="bg-okmd-dark text-white p-8 rounded-3xl sticky top-32 text-center">
                        <h3 className="text-2xl font-bold mb-2">ลงทะเบียน</h3>
                        <p className="text-white/60 mb-8 text-sm">ที่นั่งมีจำนวนจำกัด กรุณาลงทะเบียนล่วงหน้า</p>
                        <button className="w-full py-4 bg-okmd-cyan hover:bg-[#138FA0] text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all mb-4">
                            ลงทะเบียนทันที
                        </button>
                        <p className="text-xs text-white/40">หมดเขตรับสมัคร 20 เม.ย. 2567</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
