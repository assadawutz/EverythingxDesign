
import React from 'react';
import { PageRoute } from '../../App';
import SectionTitle from '../SectionTitle';
import { ArrowRight, Calendar, ChevronRight, Search, Download, BookOpen, Clock, PlayCircle, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute, id?: string | number) => void;
}

// -- 1. HERO SECTION --
const Hero = () => (
  <section className="w-full relative h-[500px] lg:h-[600px] bg-[#E8F6FA] overflow-hidden flex items-center">
    <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-okmd-dark leading-[1.1]">
          AI-Driven intelligence:
        </h1>
        <p className="text-xl md:text-2xl text-okmd-dark font-light leading-relaxed max-w-xl">
          Search, summarize, and Recommend in an instant.
        </p>
        <button className="px-8 py-3 bg-okmd-cyan text-white font-medium rounded-lg text-lg hover:bg-[#138FA0] transition-colors shadow-lg shadow-cyan-500/20">
          ดูรายละเอียด
        </button>
      </div>
      <div className="relative h-full flex items-center justify-center">
         <img 
            src="https://placehold.co/600x500/transparent/16A7CB?text=Robot+Hand+Touching+Chip" 
            className="w-full max-w-[500px] object-contain drop-shadow-2xl"
            alt="AI Visual"
         />
      </div>
    </div>
    {/* Decorative BG shapes */}
    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
  </section>
);

// -- 2. SEARCH SECTION --
const SearchSection = () => (
  <section className="py-16 bg-white text-center">
    <div className="container mx-auto px-4">
      <h4 className="text-okmd-cyan font-bold tracking-[0.2em] text-sm uppercase mb-4">KNOWLEDGE IS OPPORTUNITY</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-okmd-dark mb-2">
        รวมไอเดียเด็ด แรงบันดาลใจเจ๋ง ๆ และความรู้นอกตำรา <span className="text-okmd-cyan">OKMD</span>
      </h2>
      <p className="text-xl text-okmd-secondary mb-10">โลกของคนชอบคิดต่าง</p>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="bg-okmd-dark rounded-2xl p-8 text-left shadow-2xl relative z-10">
           <p className="text-white/60 text-sm mb-4">
             เรามอบประสบการณ์การค้นหาอย่างแม่นยำด้วย ที่ช่วยให้คุณได้คำตอบตรงใจ รวดเร็ว
           </p>
           <div className="relative">
             <input 
               type="text" 
               placeholder="พิมพ์เป้าหมายของคุณที่นี่" 
               className="w-full bg-white rounded-xl px-6 py-4 text-lg text-okmd-dark focus:outline-none focus:ring-2 focus:ring-okmd-cyan pr-14"
             />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-okmd-secondary rounded-lg flex items-center justify-center text-white hover:bg-okmd-cyan transition-colors">
               <Search className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  </section>
);

// -- 3. HIGHLIGHT SECTION (Layout: 3 / 2 / 1) --
// Modified to use a 4-column grid to accommodate "Eat 2 slots + 1 + 1" on top row
const HighlightSection = () => (
  <section className="py-20 bg-[#F5FAFC]">
    <div className="container mx-auto px-4 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-okmd-dark mb-2">Highlight</h2>
        <p className="text-2xl text-okmd-cyan">ทุกจุดเด่น ถูกยกมาไว้ตรงนี้</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* -- Row 1: 3 Items (2 + 1 + 1 cols) -- */}
        
        {/* Item 1: Large (Span 2) */}
        <div className="md:col-span-1 h-[420px] relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all">
            <img src="https://placehold.co/600x500/222/555?text=Smoking+Campaign" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">เพราะทุกครั้งที่คุณสูบ...<br/>คือการทำร้ายตัวเอง</h3>
                <p className="text-white/70 text-sm mb-4">ทุกคำสูบ คือก้าวถอยจากสุขภาพดี</p>
                <span className="text-okmd-secondary flex items-center gap-2 text-sm font-medium">อ่านต่อ <ArrowRight className="w-4 h-4"/></span>
            </div>
        </div>

        {/* Item 2: Vertical (Span 1) */}
        <div className="md:col-span-1 h-[420px] bg-white p-6 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-bl-full z-0 opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative z-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">The Knowledge</span>
                <h3 className="text-4xl font-bold text-okmd-dark mt-1">vol.36</h3>
            </div>
            <div className="flex justify-center my-4 relative z-10">
                <img src="https://placehold.co/180x240/F1C40F/000?text=COVER" className="w-40 shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="relative z-10">
                <h4 className="font-bold text-xl leading-tight text-okmd-dark">AI Global Trends</h4>
                <span className="text-xs text-gray-400 mt-2 block">Business & Culture</span>
            </div>
        </div>

        {/* Item 3: Text Card (Span 1) */}
        <div className="md:col-span-1 h-[420px] bg-white p-8 rounded-3xl flex flex-col justify-center hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-okmd-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-okmd-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-okmd-cyan">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-okmd-dark mb-4 leading-snug">สำรวจธุรกิจและองค์กรทั่วโลก เสริมพลังด้านวัฒนธรรมด้วย AI</h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3">Mona ใช้ AI ส่งเสริมการเข้าถึงวัฒนธรรม ศิลปะ และพิพิธภัณฑ์ ในรูปแบบที่คุณไม่เคยสัมผัสมาก่อน</p>
                <span className="text-okmd-cyan flex items-center gap-2 text-sm font-bold justify-center uppercase tracking-wider group-hover:gap-3 transition-all">อ่านต่อ <ArrowRight className="w-4 h-4"/></span>
            </div>
        </div>

 
        <div className="md:col-span-2 h-[320px] bg-[#8B0000] relative rounded-3xl overflow-hidden group cursor-pointer flex items-center p-8 text-white shadow-sm hover:shadow-xl transition-all">
            <div className="flex-1 z-10 pr-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block backdrop-blur-sm">เรียนรู้รูปแบบใหม่ๆ</span>
                <h3 className="text-3xl font-bold mb-6 leading-tight">เรียนรู้แบบเถื่อนๆ<br/>ไปกับ สิงห์ วรรณสิงห์</h3>
                <span className="flex items-center gap-2 text-sm font-medium hover:underline opacity-90 hover:opacity-100">อ่านบทสัมภาษณ์ <ArrowRight className="w-4 h-4"/></span>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-2xl opacity-20"></div>
                <img src="https://placehold.co/200x200/500/fff?text=Person" className="w-48 h-48 object-cover rounded-full border-4 border-white/20 shadow-2xl relative z-10 group-hover:scale-105 transition-transform" />
            </div>
        </div>
        {/* Item 3: Text Card (Span 1) */}
        <div className="md:col-span-1 h-[420px] bg-white p-8 rounded-3xl flex flex-col justify-center hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-okmd-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-okmd-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-okmd-cyan">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-okmd-dark mb-4 leading-snug">สำรวจธุรกิจและองค์กรทั่วโลก เสริมพลังด้านวัฒนธรรมด้วย AI</h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3">Mona ใช้ AI ส่งเสริมการเข้าถึงวัฒนธรรม ศิลปะ และพิพิธภัณฑ์ ในรูปแบบที่คุณไม่เคยสัมผัสมาก่อน</p>
                <span className="text-okmd-cyan flex items-center gap-2 text-sm font-bold justify-center uppercase tracking-wider group-hover:gap-3 transition-all">อ่านต่อ <ArrowRight className="w-4 h-4"/></span>
            </div>
        </div>

      </div>
    </div>
  </section>
);

// -- 4. SMART PICKS SECTION --
const SmartPicksSection = () => (
  <section className="py-20 bg-okmd-dark text-white relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-12 relative z-10">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-bold text-white mb-3">Smart Picks</h2>
        <p className="text-2xl text-okmd-secondary">เราไม่ได้แค่แนะนำ แต่เรากำหนดนิยามใหม่ให้กับทางเลือก</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-[#F5F5F5] rounded-3xl p-10 flex flex-col items-start justify-between min-h-[360px] group cursor-pointer hover:bg-white transition-colors text-okmd-dark relative overflow-hidden">
           <div className="relative z-10">
             <div className="w-16 h-16 mb-6 bg-okmd-cyan rounded-xl flex items-center justify-center text-white text-2xl font-bold">O</div>
             <h3 className="text-5xl font-bold mb-2 tracking-tight">Unleash<br/><span className="text-okmd-cyan">Your Potential</span></h3>
           </div>
           <ArrowRight className="w-10 h-10 text-okmd-cyan self-end group-hover:translate-x-2 transition-transform relative z-10" />
           <img src="https://placehold.co/400x400/eee/ccc?text=Hand" className="absolute bottom-0 right-0 w-64 opacity-50 mix-blend-multiply" />
        </div>

        {/* Card 2 */}
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] group cursor-pointer bg-gray-800">
           <img src="https://placehold.co/800x600/222/444?text=Library+Background" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
           <div className="absolute inset-0 p-10 flex flex-col justify-between">
              <div>
                 <div className="text-white font-bold tracking-widest mb-4 text-xs uppercase">OKMD KNOWLEDGE PORTAL</div>
                 <h3 className="text-5xl font-bold text-white leading-tight">Unlock knowledge<br/>anywhere you are</h3>
              </div>
              <ArrowRight className="w-10 h-10 text-white self-end group-hover:translate-x-2 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  </section>
);

// -- 5. KNOWLEDGE BOX SECTION --
const KnowledgeBoxSection = () => (
  <section className="py-20 bg-[#E8F6FA]">
    <div className="container mx-auto px-4 md:px-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Menu & Search */}
        <div className="lg:w-1/3 space-y-8">
           <div>
              <h2 className="text-5xl font-bold text-okmd-dark mb-2">Knowledge Box</h2>
              <p className="text-xl text-okmd-cyan">ตู้ความรู้ | สร้างสรรค์ภูมิปัญญา</p>
           </div>
           
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-okmd-dark mb-4">หมวดหมู่แนะนำ</h4>
              <ul className="space-y-4">
                 <li className="font-bold text-okmd-dark cursor-pointer flex justify-between items-center group">
                    OKMD กระตุกต่อมคิด <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-okmd-cyan"/>
                 </li>
                 <li className="text-gray-500 hover:text-okmd-cyan cursor-pointer flex justify-between items-center group">
                    OKMD แนะนำหนังสือดี <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                 </li>
                 <li className="text-gray-500 hover:text-okmd-cyan cursor-pointer flex justify-between items-center group">
                    OKMD Infographic <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                 </li>
                 <li className="text-gray-500 hover:text-okmd-cyan cursor-pointer flex justify-between items-center group">
                    OKMD บทความวิจัย <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                 </li>
                 <li className="text-gray-500 hover:text-okmd-cyan cursor-pointer flex justify-between items-center group">
                    OKMD Recommended <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"/>
                 </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                 <a href="#" className="text-sm font-bold text-okmd-dark flex items-center gap-2 hover:text-okmd-cyan transition-colors">ดูทั้งหมด <ArrowRight className="w-4 h-4"/></a>
              </div>
           </div>


        </div>

        {/* Right: Featured Item */}
        <div className="lg:w-2/3">
           <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-10 items-center h-full">
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative group">
                 <img src="https://placehold.co/400x550/111/fff?text=The+Knowledge+Vol.40" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-bold">AI and Disabilities</p>
                 </div>
              </div>
              <div className="flex-1 space-y-6">
                 <span className="text-okmd-cyan font-bold tracking-widest uppercase text-sm">Magazine</span>
                 <h3 className="text-4xl font-bold text-okmd-dark leading-tight">The Knowledge vol.40</h3>
                 <div className="h-1 w-20 bg-okmd-cyan rounded-full"></div>
                 <p className="text-gray-500 leading-relaxed text-lg">
                    นิตยสาร OKMD | เพิ่มพูนความรู้ | สร้างสรรค์ภูมิปัญญา<br/>
                    ฉบับที่ 40 | กันยายน - ตุลาคม 2568<br/>
                    สำนักงานบริหารและพัฒนาองค์ความรู้ (องค์การมหาชน)
                 </p>
                 <div className="pt-4 flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-3 text-okmd-cyan font-bold border-2 border-okmd-cyan px-6 py-3 rounded-xl hover:bg-okmd-cyan hover:text-white transition-all w-full md:w-fit">
                       <Download className="w-5 h-5" /> ดาวน์โหลดเอกสาร pdf (27 MB)
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

// -- 6. ACTIVITY SECTION (Layout: 3 / 1 / 1 / Calendar) --
const ActivitySection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-okmd-dark mb-2">Activity Calendar</h2>
        <p className="text-2xl text-okmd-cyan">ทุกกิจกรรมคือแรงบันดาลใจ สู่ความคิดที่แตกต่าง</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Row 1: 3 Items (Small Banners) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#EAF4F2] rounded-2xl p-6 h-48 relative overflow-hidden flex flex-col justify-between border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                <span className="bg-white/50 text-xs font-bold px-2 py-1 rounded w-fit text-emerald-800">okmd</span>
                <div>
                <h3 className="text-2xl font-bold text-emerald-900 leading-none mb-1">BAB 2022</h3>
                <h4 className="text-xl text-emerald-700">CHAOS : CALM</h4>
                </div>
                <p className="text-xs text-gray-500">22 OCT 2022 — 23 FEB 2023</p>
            </div>
            <div className="bg-[#4A90E2] rounded-2xl h-48 relative overflow-hidden flex items-center justify-center text-white p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div>
                <h3 className="text-4xl font-bold leading-none">Music Talk</h3>
                <p className="text-sm opacity-80 mt-2">Music and the Cities</p>
                </div>
            </div>
            <div className="rounded-2xl h-48 relative overflow-hidden group cursor-pointer">
                <img src="https://placehold.co/400x200/333/fff?text=GRANDMA" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                <h3 className="text-white font-serif text-xl">HOW TO MAKE MILLIONS<br/>BEFORE GRANDMA DIES</h3>
                </div>
            </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
                <span className="bg-okmd-cyan px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase">Exhibition</span>
                <h3 className="text-4xl font-bold mb-2">The Future of Learning</h3>
                <p className="text-lg opacity-80 mb-4">สำรวจอนาคตแห่งการเรียนรู้ ผ่านนิทรรศการมัลติมีเดีย</p>
                <div className="flex items-center gap-2 text-sm font-medium"><Calendar className="w-4 h-4"/> 15-20 Nov 2025 <span className="mx-2">|</span> <MapPin className="w-4 h-4"/> TK Park</div>
            </div>
              <div className="lg:w-1/3">
                <div className="text-okmd-secondary font-bold text-xl uppercase tracking-widest mb-1">Monday</div>
                <div className="text-white/60 text-lg mb-8">September</div>
                <div className="text-[10rem] leading-none font-bold -ml-2">20</div>
            </div>
            <div className="lg:w-2/3">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 text-center gap-y-6">
                    {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-white/40 text-sm font-bold">{d}</div>)}
                    {/* Mock Days */}
                    {Array.from({length: 31}, (_, i) => i+1).map(d => (
                        <div key={d} className={`text-lg font-medium py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors ${d === 20 ? 'bg-okmd-cyan text-white' : d > 19 && d < 23 ? 'bg-white/10' : 'text-white/80'}`}>
                            {d}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>

    </div>
  </section>
);

// -- 7. NEWS SECTION --
const NewsSection = () => (
  <section className="py-20 bg-[#F9FAFB]">
    <div className="container mx-auto px-4 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-bold text-okmd-dark mb-2">News</h2>
          <p className="text-2xl text-okmd-cyan">อัปเดตข่าว</p>
        </div>
        <button className="text-okmd-dark text-lg font-medium underline mt-4 md:mt-0">ดูทั้งหมด</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main News (Large) */}
        <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer border border-gray-100">
            <div className="h-[400px] overflow-hidden">
                <img src="https://placehold.co/800x500/222/fff?text=Royal+Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8">
                <h3 className="text-2xl font-bold text-okmd-dark mb-4 leading-snug group-hover:text-okmd-cyan transition-colors">
                    กรมสมเด็จพระเทพรัตนราชสุดาฯ เสด็จเปิดศูนย์เยาวชนเทศบาลนครยะลา แหล่งเรียนรู้ TK Park Yala
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-2">
                    ความรู้จะมีพลังเมื่อถูกแบ่งปัน 'คิด' แล้ว 'เล่า' อย่าลืมร่วม 'แชร์' เพื่อสร้างแรงบันดาลใจให้ใครอีกหลายคน...
                </p>
                <span className="flex items-center gap-2 text-okmd-cyan font-bold">อ่านต่อ <ArrowRight className="w-4 h-4"/></span>
            </div>
        </div>

        {/* Side List */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <img src={`https://placehold.co/150x150/16A7CB/fff?text=News+${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-okmd-dark text-sm line-clamp-2 mb-2 group-hover:text-okmd-cyan transition-colors">
                            TK Park x มูลนิธิกระจกเงาชวนคนไทยร่วมแบ่งปันคุณค่า ผ่านหนังสือ
                        </h4>
                        <span className="text-xs text-okmd-secondary flex items-center gap-1 font-medium mt-auto">อ่านต่อ <ArrowRight className="w-3 h-3"/></span>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  </section>
);

// -- 8. PARTNER SECTION --
const PartnerSection = () => (
  <section className="py-16 bg-white border-t border-gray-100">
    <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
       <h2 className="text-3xl font-bold text-okmd-dark leading-tight text-nowrap mr-8">
         กิจกรรม<br/>ภาคีเครือข่าย
       </h2>
       <div className="flex-1 flex gap-8 overflow-x-auto pb-4 no-scrollbar items-center">
          <img src="https://placehold.co/120x60/eee/999?text=Gov" className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/eee/999?text=okmd" className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/eee/999?text=TKPark" className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/eee/999?text=Museum" className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
       </div>
    </div>
  </section>
);

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main className="w-full font-kanit">
      <Hero />
      <SearchSection />
      <HighlightSection />
      <SmartPicksSection />
      <KnowledgeBoxSection />
      <ActivitySection />
      <NewsSection />
      <PartnerSection />
    </main>
  );
}
