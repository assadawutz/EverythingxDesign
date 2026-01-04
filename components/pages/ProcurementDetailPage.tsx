
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { FileDown, Printer } from 'lucide-react';

export default function ProcurementDetailPage({ id, onNavigate }: { id: string | number | null, onNavigate: any }) {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-[960px]">
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "จัดซื้อจัดจ้าง", onClick: () => onNavigate('PROCUREMENT') },
          { label: "รายละเอียดประกาศ" }
        ]} />

        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <SectionTitle title="ประกาศประกวดราคาจ้างเหมาบริการดูแลรักษาระบบสารสนเทศ" className="mb-4" />
          <div className="flex gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span>เลขที่ประกาศ: P67001</span>
            <span>|</span>
            <span>วันที่ประกาศ: 15 มี.ค. 2567</span>
          </div>

          <div className="prose max-w-none text-gray-700 mb-10">
            <p>สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน) มีความประสงค์จะประกวดราคาจ้างเหมาบริการดูแลรักษาระบบสารสนเทศ โดยวิธีคัดเลือก...</p>
            <p>ราคากลางของงานจ้างในการประกวดราคาครั้งนี้ เป็นเงินทั้งสิ้น 1,500,000 บาท (หนึ่งล้านห้าแสนบาทถ้วน)</p>
          </div>

          <h4 className="font-bold text-lg mb-4">เอกสารแนบ</h4>
          <div className="space-y-3">
            {['TOR.pdf', 'ตารางแสดงวงเงินงบประมาณ.pdf', 'แบบฟอร์มใบเสนอราคา.doc'].map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-okmd-cyan/50 transition-colors">
                <span className="flex items-center gap-3 font-medium text-gray-700">
                  <FileDown className="w-5 h-5 text-okmd-cyan" /> {file}
                </span>
                <button className="text-sm text-okmd-cyan font-bold hover:underline">ดาวน์โหลด</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
