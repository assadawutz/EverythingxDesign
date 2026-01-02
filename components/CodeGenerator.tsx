
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { generateCodeSnippet } from '../services/geminiService';
import { Code2, Wand2, Loader2, Copy, Check, Terminal, FileCode, ImageIcon, X, Sparkles, BookOpen, ChevronRight, Layers, LayoutTemplate, Database, Monitor } from 'lucide-react';
import Tooltip from './Tooltip';

const LANGUAGES = [
  "HTML/CSS Tailwind v3",
  "Tailwind CSS v4 (Full Stack)",
  "TypeScript (React)",
  "JavaScript",
  "Python (FastAPI)",
  "Rust",
  "Go",
  "SQL",
  "Bash Script"
];

const MODES = [
    { id: 'ui', label: 'UI / Design', icon: Monitor, desc: "Pixel-perfect visual implementation" },
    { id: 'logic', label: 'Logic / Backend', icon: Database, desc: "Functions, APIs, and Algorithms" }
];

// Context injection for V4 specifics since models might be trained on V3 data.
const TAILWIND_V4_CONTEXT = `
RULES FOR TAILWIND CSS v4 GENERATION:
1. CSS-FIRST CONFIG: Use native CSS variables for theme values. Do NOT generate tailwind.config.js unless asked. Use @theme { --color-brand: #...; } inside the CSS file.
2. NATIVE OPACITY: Use 'bg-blue-500/50' syntax which now uses CSS color-mix or relative colors, not the old opacity var hack.
3. 3D TRANSFORMS: Use native 3D utilities: 'perspective-dramatic', 'rotate-x-12', 'rotate-y-24', 'transform-3d'.
4. CONTAINER QUERIES: Use '@container' and '@[width]' (e.g., '@min-md:grid-cols-2') directly.
5. GRADIENTS: Use newer gradient syntax if applicable.
6. P3 COLORS: Assume P3 color gamut support.
7. COMPOSABLE VARS: Use --spacing-4 instead of theme('spacing.4').
`;

const EXAMPLE_PROMPTS = [
  {
    title: "Design to Code (UI)",
    prompt: "Convert the attached UI design screenshot into a pixel-perfect, fully responsive website. \n\nRequirements:\n- Use semantic HTML5 and Tailwind CSS.\n- Match the colors, typography, spacing, and shadows exactly as seen in the image.\n- Ensure it is mobile-responsive.\n- Use FontAwesome or Lucide for icons where appropriate.",
    lang: "HTML/CSS Tailwind v3",
    mode: 'ui'
  },
  {
    title: "v4 3D Card",
    prompt: "Create a Tailwind v4 card component with 3D hover effects using 'perspective', 'rotate-x', and 'transform-3d'. Include a 'bg-linear-to-tr' gradient background.",
    lang: "Tailwind CSS v4 (Full Stack)",
    mode: 'ui'
  },
  {
    title: "React + Tailwind",
    prompt: "Create a React component for a responsive navigation bar with a glassmorphism effect, including a mobile drawer and active link states using Tailwind CSS.",
    lang: "TypeScript (React)",
    mode: 'ui'
  },
  {
    title: "API Integration",
    prompt: "Write a Python FastAPI endpoint that handles multi-part file uploads, validates image MIME types, and stores them in an S3 bucket with error handling.",
    lang: "Python (FastAPI)",
    mode: 'logic'
  }
];

const CodeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedMode, setSelectedMode] = useState('ui');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [contextImage, setContextImage] = useState<{ data: string, mimeType: string, preview: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setContextImage({
          data: base64.split(',')[1],
          mimeType: file.type,
          preview: base64
        });
        // Auto-switch to UI mode when image is uploaded
        setSelectedMode('ui');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedCode('');
    
    // Inject v4 knowledge if selected
    let systemContext = selectedLanguage.includes("v4") ? TAILWIND_V4_CONTEXT : undefined;

    // Enhance prompt based on mode
    let finalPrompt = prompt;
    
    if (selectedMode === 'ui') {
        // UI Mode Enhancements
        finalPrompt = `[MODE: UI/DESIGN IMPLEMENTATION]\nYou are an expert Front-end Engineer specialized in pixel-perfect implementation.\n\nTASK: ${prompt}\n\nSTRICT RULES:\n- If an image is provided, analyze layout, spacing, colors, and typography meticulously.\n- Use modern, responsive best practices.\n- Output pure, ready-to-run code.`;
    } else {
        // Logic Mode Enhancements
        finalPrompt = `[MODE: BACKEND/LOGIC]\nYou are a Senior Software Architect.\n\nTASK: ${prompt}\n\nSTRICT RULES:\n- Focus on performance, security, and error handling.\n- Write clean, commented, and efficient code.\n- Follow standard design patterns for the selected language.`;
    }
    
    if (contextImage) {
        finalPrompt = `[VISUAL REFERENCE ATTACHED]\n${finalPrompt}`;
    }

    try {
      const code = await generateCodeSnippet(
          finalPrompt, 
          selectedLanguage, 
          contextImage ? { data: contextImage.data, mimeType: contextImage.mimeType } : undefined,
          systemContext
      );
      setGeneratedCode(code);
    } catch (err: any) {
      const errorMessage = err.message || JSON.stringify(err);
      setGeneratedCode(`// Error generating code: ${errorMessage}\n\n// Troubleshooting:\n// 1. Ensure you have selected a valid PAID API key.\n// 2. Click the 'Select API Key' button in the top right header to re-authenticate.`);
    } finally {
      setLoading(false);
    }
  };

  const applyExample = (ex: typeof EXAMPLE_PROMPTS[0]) => {
    setPrompt(ex.prompt);
    setSelectedLanguage(ex.lang);
    setSelectedMode(ex.mode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 mb-20 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-blue-200 via-indigo-200 to-slate-500 font-sans">
          Ink<span className="text-indigo-400">2Code</span>.
        </h2>
        <p className="text-slate-400 text-lg font-light tracking-wide">
          Production-grade code generation. From Figma design to React/Tailwind in seconds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Pane: Input & Examples */}
        <div className="space-y-6">
          <form onSubmit={handleGenerate} className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 flex flex-col h-full">
            
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5">
                {MODES.map(mode => (
                    <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSelectedMode(mode.id)}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${selectedMode === mode.id ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <mode.icon className="w-3.5 h-3.5" />
                        {mode.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4 flex-1">
              <label className="text-xs text-indigo-400 font-mono tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-2 uppercase"><Terminal className="w-4 h-4" /> Spec_Input</span>
                <span className="text-[10px] text-slate-500 font-normal normal-case opacity-70">
                    {selectedMode === 'ui' ? "Describe layout & style" : "Describe functionality & logic"}
                </span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={selectedMode === 'ui' ? "Ex: Convert this attached screenshot into a React component..." : "Ex: Write a sorting algorithm for..."}
                className="w-full h-48 bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-slate-200 placeholder:text-slate-700 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-mono text-sm leading-relaxed transition-all resize-none custom-scrollbar"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Stack / Language</label>
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono appearance-none cursor-pointer hover:bg-white/5 transition-colors pr-8"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang} className="bg-slate-900">{lang}</option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Visual Reference</label>
                {contextImage ? (
                  <div className="relative group">
                    <div className="w-full h-[41px] bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center px-3 gap-2 overflow-hidden">
                       <img src={contextImage.preview} className="w-6 h-6 object-cover rounded" />
                       <span className="text-[10px] font-mono text-indigo-300 truncate">Design Attached</span>
                       <button 
                        type="button" 
                        onClick={() => setContextImage(null)}
                        className="ml-auto text-indigo-300 hover:text-white"
                       >
                         <X className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-[41px] bg-slate-900/50 border border-white/10 hover:border-indigo-500/50 rounded-xl flex items-center justify-center gap-2 transition-all font-mono text-[10px] ${selectedMode === 'ui' ? 'text-indigo-400 border-indigo-500/30' : 'text-slate-500 hover:text-indigo-400'}`}
                  >
                    <ImageIcon className="w-4 h-4" /> {selectedMode === 'ui' ? "UPLOAD_DESIGN" : "ATTACH_REF"}
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-indigo-500/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 font-mono tracking-widest disabled:opacity-50 hover:shadow-neon-indigo"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {loading ? "INITIALIZING_ENGINE..." : "GENERATE_SOURCE"}
            </button>
          </form>

          {/* Examples Card */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" /> Quick_Patterns
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLE_PROMPTS.map((ex, idx) => (
                   <button 
                    key={idx}
                    onClick={() => applyExample(ex)}
                    className="p-3 text-left rounded-xl bg-white/5 hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                   >
                      {(ex.lang.includes("v4") || ex.title.includes("Design")) && (
                          <div className="absolute top-0 right-0 p-1.5 opacity-10 group-hover:opacity-20">
                              {ex.title.includes("Design") ? <LayoutTemplate className="w-8 h-8 -rotate-12" /> : <Layers className="w-8 h-8 -rotate-12" />}
                          </div>
                      )}
                      <p className="text-[11px] font-bold text-slate-300 group-hover:text-indigo-200 mb-1 flex items-center gap-2">
                          {ex.title}
                          {ex.lang.includes("v4") && <span className="text-[8px] bg-indigo-500/30 px-1 rounded">v4</span>}
                          {ex.title.includes("Design") && <span className="text-[8px] bg-emerald-500/30 px-1 rounded text-emerald-200">IMG</span>}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{ex.prompt}</p>
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Right Pane: Output */}
        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col bg-slate-950/30 border border-white/5 shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-3">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Source_Output</span>
            </div>
            {generatedCode && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono transition-all text-slate-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "COPIED" : "COPY"}
              </button>
            )}
          </div>
          <div className="flex-1 p-6 font-mono text-xs overflow-auto custom-scrollbar relative min-h-[400px]">
             {loading ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-500/30 space-y-4">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <Sparkles className="w-4 h-4 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <p className="animate-pulse tracking-widest text-[10px] uppercase">Compiling Logic...</p>
                  {contextImage && (
                      <p className="text-[9px] text-emerald-400/70 font-mono">Scanning UI Topology...</p>
                  )}
                  {selectedLanguage.includes("v4") && (
                      <p className="text-[9px] text-indigo-400/70 font-mono">Injecting Tailwind v4 Engine...</p>
                  )}
               </div>
             ) : generatedCode ? (
               <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-500">
                 {generatedCode}
               </pre>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40 space-y-4">
                 <Code2 className="w-16 h-16" />
                 <p className="text-[10px] tracking-widest uppercase">Awaiting requirements</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;
