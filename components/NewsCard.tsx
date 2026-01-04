
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  data: {
    id: number | string;
    title: string;
    date?: string;
    image?: string;
    category?: string;
  };
  onClick: () => void;
  variant?: 'vertical' | 'horizontal';
}

const NewsCard: React.FC<NewsCardProps> = ({ data, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
      return (
        <div 
            className="group cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-row h-32 md:h-40"
            onClick={onClick}
        >
            <div className="w-32 md:w-48 h-full bg-gray-200 overflow-hidden shrink-0">
                <img 
                    src={data.image || "https://placehold.co/400x300/1B1D20/white?text=News"} 
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4 flex flex-col justify-center flex-1">
                <h3 className="text-sm md:text-base font-bold text-okmd-dark mb-2 line-clamp-2 group-hover:text-okmd-cyan transition-colors leading-tight">
                    {data.title}
                </h3>
                {data.date && <p className="text-xs text-gray-400 mb-2">{data.date}</p>}
                <span className="text-xs font-bold text-okmd-secondary flex items-center gap-1 mt-auto">อ่านต่อ <ArrowRight className="w-3 h-3"/></span>
            </div>
        </div>
      );
  }

  return (
    <div 
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <img 
          src={data.image || "https://placehold.co/600x400/f5f5f5/cccccc?text=OKMD+News"} 
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {data.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-okmd-cyan shadow-sm">
            {data.category}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {data.date && (
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {data.date}
          </div>
        )}
        <h3 className="text-lg font-bold text-okmd-dark mb-3 line-clamp-2 group-hover:text-okmd-cyan transition-colors leading-snug">
          {data.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
          รายละเอียดเนื้อหาข่าวประชาสัมพันธ์ หรือบทความที่น่าสนใจ...
        </p>
        <div className="flex items-center text-okmd-cyan text-sm font-bold gap-2 group-hover:gap-3 transition-all mt-auto">
          อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
