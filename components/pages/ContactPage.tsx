
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-[960px]">
        <SectionTitle title="ติดต่อเรา" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "ติดต่อเรา" }
        ]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="space-y-8">
            <h3 className="font-bold text-xl text-okmd-dark">สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน)</h3>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-okmd-cyan/10 rounded-full flex items-center justify-center text-okmd-cyan shrink-0">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">ที่อยู่</h4>
                <p className="text-gray-600 leading-relaxed">
                  69/18-19 อาคารชุด มิว บิลดิ้ง ชั้น 18-19 <br/>
                  ถนนวิภาวดีรังสิต แขวงสามเสนใน <br/>
                  เขตพญาไท กรุงเทพฯ 10400
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-okmd-cyan/10 rounded-full flex items-center justify-center text-okmd-cyan shrink-0">
                <Phone />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">โทรศัพท์ / โทรสาร</h4>
                <p className="text-gray-600">
                  โทรศัพท์: 0 2105 6500 <br/>
                  โทรสาร: 0 2105 6501
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-okmd-cyan/10 rounded-full flex items-center justify-center text-okmd-cyan shrink-0">
                <Mail />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">อีเมล</h4>
                <p className="text-gray-600">
                  saraban@okmd.or.th
                </p>
              </div>
            </div>
          </div>

          <div className="h-80 md:h-auto bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.0537424698533!2d100.55172237593863!3d13.77563129677321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e8c37d8b5a1%3A0x8e831215509930c7!2sOKMD!5e0!3m2!1sen!2sth!4v1710920000000!5m2!1sen!2sth" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
