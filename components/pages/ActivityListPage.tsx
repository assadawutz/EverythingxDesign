
import React from 'react';
import SectionTitle from '../SectionTitle';
import Breadcrumb from '../Breadcrumb';
import NewsCard from '../NewsCard';

export default function ActivityListPage({ onNavigate }: { onNavigate: any }) {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <SectionTitle title="ปฏิทินและกิจกรรม" subtitle="OKMD Activity" />
        <Breadcrumb items={[
          { label: "หน้าแรก", onClick: () => onNavigate('HOME') },
          { label: "ปฏิทินและกิจกรรม" }
        ]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <NewsCard 
              key={i}
              data={{
                id: i,
                title: `Workshop: Design Thinking for Innovation รุ่นที่ ${i}`,
                category: 'Workshop',
                date: '25 เม.ย. 2024'
              }}
              onClick={() => onNavigate('ACTIVITY_DETAIL', i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
