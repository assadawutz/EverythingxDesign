
import React, { useState } from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { UploadCloud, Check, X, FileText, Edit2, ChevronDown } from 'lucide-react';

export default function CareerDetailPage({ id, onNavigate }: { id: string | number | null, onNavigate: any }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-16 bg-white min-h-screen font-kanit">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "ร่วมงานกับเรา", onClick: () => onNavigate('CAREER') },
          { label: "รายละเอียดตำแหน่งงาน" }
        ]} />

        {!showForm ? (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-okmd-cyan font-bold tracking-widest text-sm uppercase mb-2 block">Full Time</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-okmd-dark leading-tight">เจ้าหน้าที่ช่วยปฏิบัติงานบริหารทรัพยากรกายภาพ ด้าน IT (สำนักภาคใต้ จ.สงขลา)</h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> เปิดรับสมัคร
                    </p>
                </div>
                <button 
                    onClick={() => setShowForm(true)}
                    className="hidden md:block px-8 py-3 bg-okmd-cyan hover:bg-[#138FA0] text-white font-bold rounded-xl shadow-lg shadow-cyan-200 transition-all"
                >
                    สมัครงานทันที
                </button>
            </div>
            
            <div className="space-y-8 text-gray-700 leading-relaxed">
                <div>
                <h3 className="text-xl font-bold text-okmd-dark mb-4">วัตถุประสงค์ตำแหน่งงาน (Job Purpose) :</h3>
                <p className="text-gray-600">
                    ประสานงานและดำเนินงานในส่วนงานบริหารจัดการด้านเทคโนโลยีสารสนเทศ การซ่อมแซม และการบำรุงรักษา วัสดุอุปกรณ์เทคโนโลยีสารสนเทศและโครงสร้างพื้นฐานของสำนักงาน เพื่อให้มีความปลอดภัย เพียงพอต่อการใช้งาน มีสภาพสมบูรณ์ และประหยัดพลังงาน ตลอดจนส่งเสริมวัฒนธรรมความปลอดภัยในการปฏิบัติงาน รวมถึงปฏิบัติงานตามระเบียบของสำนักงาน
                </p>
                </div>

                <div>
                <h3 className="text-xl font-bold text-okmd-dark mb-4">หน้าที่ความรับผิดชอบหลัก (Main Accountabilities) :</h3>
                <ul className="list-decimal pl-6 space-y-2 text-gray-600">
                    <li>ปฏิบัติงานเกี่ยวกับเครื่องมือและอุปกรณ์ด้านเทคโนโลยีสารสนเทศและการสื่อสารภายใน สำนักภาคใต้ ให้อยู่ในสภาพที่ดีมีประสิทธิภาพพร้อมใช้งาน เป็นไปตามระเบียบข้อบังคับและกฎหมายที่เกี่ยวข้อง เพื่อสนับสนุนและอำนวยความสะดวกในการดำเนินงานของบุคลากรและการให้บริการแก่สมาชิก</li>
                    <li>ปฏิบัติงานเกี่ยวกับอาคารสถานที่ พื้นที่ อุปกรณ์ สิ่งอำนวยความสะดวกและระบบงานต่างๆ สำนักภาคใต้ ให้อยู่ในสภาพที่ดีมีประสิทธิภาพพร้อมใช้งาน เป็นไปตามระเบียบข้อบังคับและกฎหมายที่เกี่ยวข้อง ประกอบด้วย ระบบรักษาความปลอดภัย ระบบสาธารณูปโภค ไฟฟ้า สุขาภิบาล แสงสว่าง โทรศัพท์ เครื่องปรับอากาศ และการรักษาความสะอาด เป็นต้น เพื่อสนับสนุนและอำนวยความสะดวกในการดำเนินงานของ บุคลากรและการให้บริการแก่สมาชิก</li>
                    <li>สนับสนุนงานทางด้านเทคโนโลยีสารสนเทศเพื่อช่วยในการปฏิบัติงานการจัดกิจกรรมส่งเสริมความรู้</li>
                    <li>ติดต่อประสานงานกับหน่วยงานภาครัฐ เอกชน สมาคมและสถานศึกษา เพื่อขอความร่วมมือเข้าใช้พื้นที่จัดกิจกรรมต่าง ๆ ภายนอกศูนย์ให้เป็นไปตามระยะเวลาที่กำหนด</li>
                    <li>ปฏิบัติงานสนับสนุนการจัดกิจกรรมและการให้บริการทั้งภายในและภายนอกสำนักภาคใต้</li>
                    <li>ปฏิบัติงานอื่น ๆ ตามที่ได้รับมอบหมาย</li>
                </ul>
                </div>

                <div>
                <h3 className="text-xl font-bold text-okmd-dark mb-4">คุณสมบัติที่ต้องการ (Required Qualifications) :</h3>
                <ul className="list-decimal pl-6 space-y-2 text-gray-600">
                    <li>เพศชาย/หญิง อายุ 24 - 35 ปี</li>
                    <li>วุฒิการศึกษาระดับปริญญาตรีขึ้นไป สาขาคอมพิวเตอร์ธุรกิจ เทคโนโลยีสารสนเทศ ศึกษาศาสตร์ ศิลปศาสตร์ หรือสาขาอื่นๆ ที่เกี่ยวข้องกับการบริหารจัดการด้านเทคโนโลยีสารสนเทศ</li>
                    <li>มีความสามารถในการบริหารจัดการระบบเครือข่ายและความปลอดภัยทางเทคโนโลยีดิจิทัล ระบบโครงสร้างพื้นฐานเทคโนโลยีดิจิทัล และการบริหารผู้รับจ้าง</li>
                    <li>มีทักษะในการสื่อสาร ประสานงานและใจรักงานบริการ</li>
                    <li>มีไหวพริบ และสามารถแก้ปัญหาเฉพาะหน้าได้ดี</li>
                    <li>มีความคิดริเริ่มสร้างสรรค์ พร้อมที่เรียนรู้คิดสร้างสรรค์สิ่งใหม่ๆ และคิดเชิงวิเคราะห์</li>
                    <li>มีทัศนคติและมนุษยสัมพันธ์ที่ดี สามารถประสานงานกับฝ่ายต่าง ๆ บริหารจัดการงานได้อย่างมีประสิทธิภาพ</li>
                    <li>มีความคล่องตัวในการเดินทาง สามารถเดินทางไปปฏิบัติงานนอกสถานที่ หรือต่างจังหวัดได้</li>
                    <li>มีความสามารถในการใช้ภาษาไทยและภาษาอังกฤษ ฟัง พูด อ่าน เขียน ในระดับดี</li>
                </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100 mt-8 md:hidden">
                <button 
                    onClick={() => setShowForm(true)}
                    className="w-full px-8 py-4 bg-okmd-cyan hover:bg-[#138FA0] text-white font-bold rounded-xl shadow-lg transition-all"
                >
                    สมัครงานออนไลน์
                </button>
            </div>
            </div>
        ) : (
            <div className="bg-white animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="mb-8 flex items-center gap-4">
                    <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                    <h2 className="text-3xl font-bold text-okmd-dark">ใบสมัครงาน</h2>
                </div>

                {/* Form Container */}
                <form className="space-y-8">
                    
                    {/* Header Strip */}
                    <div className="rounded-t-lg overflow-hidden">
                        <div className="bg-okmd-secondary px-6 py-4">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                ข้อมูลส่วนตัว <span className="text-red-300">*</span>
                            </h3>
                        </div>
                        <div className="bg-gray-50/50 p-6 md:p-8 rounded-b-lg border border-gray-200 border-t-0 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">ชื่อ - นามสกุล</label>
                                    <input type="text" placeholder="ชื่อ - นามสกุล" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">สัญชาติ</label>
                                    <input type="text" placeholder="สัญชาติ" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">เพศ</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700 appearance-none">
                                            <option>เลือก</option>
                                            <option>ชาย</option>
                                            <option>หญิง</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">เบอร์ติดต่อ</label>
                                    <input type="text" placeholder="เบอร์ติดต่อ" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">วันเดือนปีเกิด</label>
                                    <input type="text" placeholder="วันเดือนปีเกิด" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">อีเมล <span className="text-red-500">*</span></label>
                                    <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan bg-white text-gray-700 bg-gray-100" defaultValue="yasumin.s@hap-thailand.com" disabled />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700">แบบไฟล์ <span className="text-red-500">*</span></label>
                        
                        <button type="button" className="px-6 py-3 bg-okmd-secondary hover:bg-okmd-cyan text-white rounded-lg font-medium transition-all shadow-sm">
                            เพิ่มไฟล์เอกสารที่เกี่ยวข้องกับการสมัครงาน
                        </button>

                        <div className="space-y-3 mt-4">
                            {/* Mock Files */}
                            <div className="flex items-center justify-between bg-[#F5F7F8] p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <span className="font-bold text-gray-500 text-lg">📎</span>
                                    </div>
                                    <span className="font-medium text-gray-700">photo.pdf</span>
                                </div>
                                <button type="button" className="w-8 h-8 bg-okmd-secondary rounded-full flex items-center justify-center text-white hover:bg-okmd-cyan">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between bg-[#F5F7F8] p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <span className="font-bold text-gray-500 text-lg">📎</span>
                                    </div>
                                    <span className="font-medium text-gray-700">resume.pdf</span>
                                </div>
                                <button type="button" className="w-8 h-8 bg-okmd-secondary rounded-full flex items-center justify-center text-white hover:bg-okmd-cyan">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center bg-white mt-0.5 peer-checked:bg-okmd-cyan peer-checked:border-okmd-cyan">
                                <input type="checkbox" className="w-5 h-5 accent-okmd-cyan" />
                            </div>
                            <span className="text-sm font-bold text-gray-800 select-none">
                                กรุณาเลือกยอมรับเงื่อนไขข้อตกลงการใช้บริการ และ นโยบายความเป็นส่วนตัวของ OKMD
                            </span>
                        </label>
                    </div>

                    {/* Recaptcha Mock */}
                    <div className="w-[300px] h-[78px] bg-[#F9F9F9] border border-[#D3D3D3] rounded flex items-center justify-between px-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 border-2 border-[#C1C1C1] bg-white rounded-sm"></div>
                            <span className="text-sm font-medium text-gray-600">I'm not a robot</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8 h-8 opacity-70" alt="captcha" />
                            <span className="text-[9px] text-gray-500 mt-1">reCAPTCHA</span>
                            <span className="text-[8px] text-gray-400">Privacy - Terms</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6">
                        <button type="button" className="px-8 py-3 bg-okmd-secondary hover:bg-okmd-cyan text-white font-bold rounded-lg shadow-lg transition-all text-lg mr-4">
                            สมัครงานออนไลน์
                        </button>
                    </div>
                </form>
            </div>
        )}

      </div>
    </section>
  );
}
