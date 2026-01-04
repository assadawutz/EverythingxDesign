
import React, { useState } from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { ShieldCheck, Lock, MapPin, Phone, Mail, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function ComplaintPage({ onNavigate }: { onNavigate: any }) {
  const [activeTab, setActiveTab] = useState<'form' | 'channels' | 'reports'>('form');

  return (
    <section className="py-16 bg-white min-h-screen font-kanit">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <SectionTitle title="รับเรื่อง ร้องเรียน" className="mb-4" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "รับเรื่อง ร้องเรียน" },
          { label: activeTab === 'form' ? "ช่องทางการร้องเรียน" : activeTab === 'reports' ? "รายงานผลการร้องเรียน" : "รับเรื่องร้องเรียน" }
        ]} />

        {/* Tabs - Underline Style */}
        <div className="flex border-b border-gray-200 mb-8 mt-8">
            <button 
                onClick={() => setActiveTab('channels')}
                className={`py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'channels' ? 'text-okmd-cyan font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
                ช่องทางการร้องเรียน
                {activeTab === 'channels' && <div className="absolute bottom-0 left-0 w-full h-1 bg-okmd-cyan rounded-t-md"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('form')}
                className={`py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'form' ? 'text-okmd-cyan font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
                รับเรื่องร้องเรียน
                {activeTab === 'form' && <div className="absolute bottom-0 left-0 w-full h-1 bg-okmd-cyan rounded-t-md"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'reports' ? 'text-okmd-cyan font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
                ติดตามเรื่องร้องเรียนของท่าน
                {activeTab === 'reports' && <div className="absolute bottom-0 left-0 w-full h-1 bg-okmd-cyan rounded-t-md"></div>}
            </button>
             <button 
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'reports' ? 'text-okmd-cyan font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
                รายงานผลการร้องเรียน
                {activeTab === 'reports' && <div className="absolute bottom-0 left-0 w-full h-1 bg-okmd-cyan rounded-t-md"></div>}
            </button>
        </div>

        <div className="mt-8 animate-in fade-in duration-300">
          
          {/* TAB 1: FORM */}
          {activeTab === 'form' && (
            <div className="max-w-[1000px]">
                {/* Header Blue Bar */}
                <div className="bg-okmd-secondary text-white px-6 py-3 rounded-t-lg">
                    <span className="font-bold">ข้อมูลส่วนตัว *</span>
                </div>
                
                <div className="bg-[#0f1025] text-white p-4 mb-6 flex items-center gap-4 rounded-b-lg shadow-md">
                    <div className="flex-1">
                        <span className="font-bold text-yellow-400">ThaiD</span> <span className="text-white">คลิก ThaiD เพื่อยืนยันตัวตนและกรอกข้อมูลอัตโนมัติ (สำหรับผู้ที่มี ThaiD)</span>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ชื่อ - นามสกุล (ผู้แจ้ง) <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกชื่อ - นามสกุล" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ข้อมูลบัตรประชาชน <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกข้อมูลบัตรประชาชน" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-bold text-gray-700">ที่อยู่ผู้แจ้ง <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกที่อยู่ผู้แจ้ง" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ตำบล/แขวง <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="ตำบล/แขวง" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">อำเภอ/เขต <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="อำเภอ/เขต" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">จังหวัด</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan appearance-none bg-white">
                                    <option>กรุณาเลือกจังหวัด</option>
                                    <option>กรุงเทพมหานคร</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">รหัสไปรษณีย์ <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกรหัสไปรษณีย์" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">โทรศัพท์ <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกโทรศัพท์" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">อีเมล</label>
                            <input type="text" placeholder="กรอกอีเมล" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">ส่วนงานที่ร้องเรียน <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan appearance-none bg-white">
                                    <option>กรุณาเลือกส่วนงานที่ร้องเรียน</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">เรื่องที่ร้องเรียน <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="กรอกเรื่องที่ร้องเรียน" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">รายละเอียดการร้องเรียน <span className="text-red-500">*</span></label>
                            <textarea rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-okmd-cyan resize-none"></textarea>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700">เอกสารประกอบ (ขนาดไฟล์ไม่เกิน 5 MB เป็นไฟล์ที่มีนามสกุลดังนี้ gif, jpg, png, pdf, doc, xls) <span className="text-red-500">*</span></label>
                        <button type="button" className="px-6 py-2.5 bg-okmd-secondary hover:bg-okmd-cyan text-white rounded-lg font-medium transition-all shadow-sm text-sm">
                            เพิ่มไฟล์เอกสารที่เกี่ยวข้อง
                        </button>
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

                    <div className="pt-6">
                        <button type="submit" className="px-10 py-3 bg-okmd-secondary hover:bg-okmd-cyan text-white font-bold rounded-lg shadow-lg transition-all text-lg">
                            ส่งเรื่องร้องเรียน
                        </button>
                    </div>
                </form>
            </div>
          )}

          {/* TAB 2: CHANNELS */}
          {activeTab === 'channels' && (
            <div className="space-y-8">
                {/* Header */}
                <div className="bg-okmd-secondary text-white px-6 py-4 rounded-t-lg">
                    <h3 className="font-bold text-lg">ช่องทางการร้องเรียนการทุจริตและประพฤติมิชอบ</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-none border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="h-20 mb-6 flex items-center justify-center">
                            <span className="text-5xl font-bold text-okmd-cyan">okmd</span>
                        </div>
                        <div className="text-left w-full space-y-4 text-sm text-gray-700">
                            <p className="font-bold">ส่วนงานกลาง :<br/>สำนักงานบริหารและพัฒนาองค์ความรู้ (สบร.)</p>
                            <p className="flex gap-2 items-start"><MapPin className="w-4 h-4 shrink-0 mt-1"/> <span className="underline">69/18-19 อาคารวิทยาลัยการจัดการ มหาวิทยาลัยมหิดล ชั้น 18 ถนนวิภาวดีรังสิต แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400</span></p>
                            <p className="flex gap-2 items-center"><Phone className="w-4 h-4 shrink-0"/> 02 105 6552</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-none border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="h-20 mb-6 flex items-center justify-center">
                             <img src="https://placehold.co/150x80/white/white?text=Museum+Siam" className="h-16 object-contain filter grayscale opacity-50" />
                             {/* Mocking Logo with text */}
                             <div className="text-center leading-none">
                                <span className="text-red-700 text-3xl font-bold block">MU</span>
                                <span className="text-red-700 text-xs">SEUM</span>
                                <span className="text-gray-500 text-xs block">SIAM</span>
                             </div>
                        </div>
                        <div className="text-left w-full space-y-4 text-sm text-gray-700">
                            <p className="font-bold">ส่วนงานกลาง :<br/>สำนักงานบริหารและพัฒนาองค์ความรู้ (สบร.)</p>
                            <p className="flex gap-2 items-start"><MapPin className="w-4 h-4 shrink-0 mt-1"/> <span className="underline">4 ถนนสนามไชย แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200</span></p>
                            <p className="flex gap-2 items-center"><Phone className="w-4 h-4 shrink-0"/> 02 225 2777</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-none border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="h-20 mb-6 flex items-center justify-center">
                             <div className="text-center leading-none flex items-center gap-2">
                                <span className="text-red-500 text-3xl font-bold">TK</span>
                                <span className="text-gray-800 text-3xl font-bold">Park</span>
                             </div>
                        </div>
                        <div className="text-left w-full space-y-4 text-sm text-gray-700">
                            <p className="font-bold">สถาบันอุทยานการเรียนรู้ (สอร.)</p>
                            <p className="flex gap-2 items-start"><MapPin className="w-4 h-4 shrink-0 mt-1"/> <span className="underline">อาคาร ดิ ออฟฟิศเศส แอท เซ็นทรัลเวิลด์ ชั้น 17 999/9 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330</span></p>
                            <p className="flex gap-2 items-center"><Phone className="w-4 h-4 shrink-0"/> 02 264 5963</p>
                        </div>
                    </div>
                </div>

                {/* Email Section */}
                <div className="bg-okmd-secondary text-white px-6 py-4 rounded-t-lg mt-10">
                    <h3 className="font-bold text-lg">ช่องทางไปรษณีย์อิเล็กทรอนิกส์</h3>
                </div>
                <div className="border border-gray-200 p-8 flex items-center gap-6">
                    <div className="w-24 h-24 bg-[#999999] flex items-center justify-center text-white">
                        <Mail className="w-12 h-12" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">E-Mail : express@okmd.or.th</p>
                        <p className="font-bold text-lg mt-2">ช่องทางไปรษณีย์</p>
                        <p className="text-sm text-gray-600 mt-1">สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน) 69/18-19 อาคารวิทยาลัยการจัดการ มหาวิทยาลัยมหิดล ชั้น 18 ถนนวิภาวดีรังสิต แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400</p>
                    </div>
                </div>
            </div>
          )}

          {/* TAB 3: REPORTS */}
          {activeTab === 'reports' && (
            <div className="animate-in fade-in duration-300 space-y-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-okmd-dark border-b-4 border-okmd-cyan pb-2 inline-block">รับเรื่อง ร้องเรียน</h3>
                    <div className="flex gap-2">
                        <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-500" />
                        <button className="px-4 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">ค้นหา</button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-t-xl border border-okmd-secondary/30">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-okmd-secondary text-white font-medium">
                            <tr>
                                <th className="py-4 px-2 border-r border-white/20 w-[80px]">ลำดับ</th>
                                <th className="py-4 px-2 border-r border-white/20">เดือน</th>
                                <th className="py-4 px-2 border-r border-white/20">ส่วนกลาง</th>
                                <th className="py-4 px-2 border-r border-white/20">สพร.</th>
                                <th className="py-4 px-2 border-r border-white/20">สอร.</th>
                                <th className="py-4 px-2 border-r border-white/20">วันที่รับเรื่อง</th>
                                <th className="py-4 px-2 border-r border-white/20">เรื่องทั่วไป</th>
                                <th className="py-4 px-2 border-r border-white/20">เรื่องจัดซื้อ<br/>จัดจ้าง</th>
                                <th className="py-4 px-2 border-r border-white/20">อยู่ระหว่าง<br/>ดำเนินการ</th>
                                <th className="py-4 px-2 border-r border-white/20">ดำเนินการ<br/>แล้วเสร็จ</th>
                                <th className="py-4 px-2">หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 bg-white">
                            {[
                                { seq: 1, m: 'ม.ค 66', date: '-', done: '-' },
                                { seq: 2, m: 'ก.พ 66', date: '-', done: '-' },
                                { seq: 3, m: 'มี.ค 66', date: '-', done: '-' },
                                { seq: 4, m: 'เม.ย 66', date: '-', done: '-' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-2">{row.seq}</td>
                                    <td className="py-4 px-2 text-left pl-6">{row.m}</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2">-</td>
                                    <td className="py-4 px-2"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Footer */}
                <div className="grid grid-cols-4 text-center text-white font-bold text-lg mt-0">
                    <div className="bg-[#74CEE2] py-4 flex items-center justify-center gap-4 col-span-1 rounded-bl-xl">
                        <span>รวมเรื่องร้องเรียน</span>
                    </div>
                    <div className="bg-[#74CEE2] py-4 col-span-1 border-l border-white/20">0</div>
                    <div className="bg-[#74CEE2] py-4 col-span-1 border-l border-white/20">0</div>
                    <div className="bg-[#74CEE2] py-4 col-span-1 border-l border-white/20 rounded-br-xl">0</div>
                </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
