
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewMode } from '../types';
import { GitBranch, FileText, BrainCircuit, Image, ArrowRight, Code2, Layers, Cpu, Terminal } from 'lucide-react';
import Tooltip from './Tooltip';
import { Section } from './Section';

interface HomeProps {
  onNavigate: (mode: ViewMode) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <Section>
      {/* Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Title Block */}
        <div className="md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-okmd-cyan/10 border border-okmd-cyan/20 text-sm font-mono text-okmd-secondary mb-2">
              <Terminal className="w-4 h-4" />
              <span>v2.0: Dev-First Engine Active</span>
          </div>
          
          <h1 className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-slate-500 leading-tight" style={{ fontSize: 'var(--font-size-h1)' }}>
            Link 2 <span className="text-okmd-cyan">Code</span>
          </h1>
          
          <p className="text-slate-400 text-xl font-light leading-relaxed">
            The autonomous engineering platform. Convert <span className="text-white font-medium">Designs to Code</span>, map repository architecture, and ship faster.
          </p>
        </div>

        {/* Action Stack */}
        <div className="md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex flex-col gap-6 pt-8">
            
            {/* 1. Ink2Code */}
            <Tooltip content="Upload Figma/Screenshots -> Get React/Tailwind Code" position="left">
                <button 
                    onClick={() => onNavigate(ViewMode.CODE_GENERATOR)}
                    className="w-full glass-panel p-6 rounded-2xl bg-indigo-900/10 hover:bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-400/50 text-left group relative overflow-hidden btn-interaction"
                >
                      <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Layers className="w-32 h-32 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="p-4 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/20 card-interaction">
                            <Code2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">Ink2Code Engine</h3>
                            <p className="text-sm text-slate-400 font-mono mt-1 group-hover:text-slate-300 flex items-center gap-2">
                                <span className="text-emerald-400">●</span> Design to Code
                                <span className="text-slate-600">|</span>
                                <span>UI Scaffold</span>
                            </p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6 text-indigo-400" />
                        </div>
                    </div>
                </button>
            </Tooltip>

            {/* 2. Repo Intelligence */}
            <Tooltip content="Visualize & Debug Repository Architecture" position="left">
                <button 
                    onClick={() => onNavigate(ViewMode.REPO_ANALYZER)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 border border-white/5 hover:border-violet-500/50 text-left group relative overflow-hidden btn-interaction"
                >
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GitBranch className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-violet-500/20 rounded-xl text-violet-300 border border-violet-500/20 group-hover:bg-violet-500 group-hover:text-white transition-colors card-interaction">
                            <GitBranch className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors">Repo Intelligence</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">Architecture Mapping & D3 Graph</p>
                        </div>
                    </div>
                </button>
            </Tooltip>

            {/* 3. Studio Prime */}
            <Tooltip content="Deep Reasoning & Multimodal Chat" position="left">
                <button 
                    onClick={() => onNavigate(ViewMode.AI_STUDIO)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 border border-white/5 hover:border-fuchsia-500/50 text-left group relative overflow-hidden btn-interaction"
                >
                      <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-fuchsia-500/20 rounded-xl text-fuchsia-300 border border-fuchsia-500/20 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors card-interaction">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors">Studio Prime</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">Reasoning (Thinking Mode) & Vision</p>
                        </div>
                    </div>
                </button>
            </Tooltip>
            
            {/* 4. SiteSketch */}
            <Tooltip content="Convert Documentation/Articles to Visuals" position="left">
                <button 
                    onClick={() => onNavigate(ViewMode.ARTICLE_INFOGRAPHIC)}
                    className="w-full glass-panel p-4 rounded-2xl hover:bg-white/10 border border-white/5 hover:border-emerald-500/50 text-left group relative overflow-hidden opacity-80 hover:opacity-100 btn-interaction"
                >
                      <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-20 h-20 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-300 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors card-interaction">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-200 transition-colors">DocuSketch</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">Research & Documentation Summarizer</p>
                        </div>
                    </div>
                </button>
            </Tooltip>
        </div>
      </div>

      {/* 3-Step Process (Grid-12) */}
      <div className="relative pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 border-t border-white/5 mt-12">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative pt-10">
             {/* Step 1 */}
             <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 group">
                 <div className="w-12 h-12 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-center shadow-glass-lg group-hover:border-indigo-500/50 transition-colors card-interaction">
                     <Image className="w-5 h-5 text-slate-300 group-hover:text-indigo-300 transition-colors" />
                 </div>
                 <div>
                     <h3 className="text-white font-bold text-sm font-mono uppercase tracking-wider mb-1">
                        1. Input Context
                     </h3>
                     <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">
                        Upload UI designs, Figma screenshots, or paste repo links.
                     </p>
                 </div>
             </div>

             {/* Step 2 */}
             <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 group">
                 <div className="w-12 h-12 rounded-xl bg-slate-900/50 border border-fuchsia-500/30 flex items-center justify-center shadow-neon-violet card-interaction">
                     <BrainCircuit className="w-5 h-5 text-fuchsia-300" />
                 </div>
                 <div>
                     <h3 className="text-white font-bold text-sm font-mono uppercase tracking-wider mb-1">
                        2. AI Engineering
                     </h3>
                     <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">
                        Gemini 3 Pro generates pixel-perfect code or analyzes logic.
                     </p>
                 </div>
             </div>

             {/* Step 3 */}
             <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 group">
                 <div className="w-12 h-12 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-center shadow-glass-lg group-hover:border-emerald-500/50 transition-colors card-interaction">
                     <Code2 className="w-5 h-5 text-slate-300 group-hover:text-emerald-300 transition-colors" />
                 </div>
                 <div>
                     <h3 className="text-white font-bold text-sm font-mono uppercase tracking-wider mb-1">
                        3. Deploy
                     </h3>
                     <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mx-auto">
                        Get production-ready source code or architectural graphs.
                     </p>
                 </div>
             </div>
         </div>
      </div>
    </Section>
  );
};

export default Home;
