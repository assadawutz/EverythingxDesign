
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { generateCodeSnippet } from '../services/geminiService';
import { Code2, Wand2, Loader2, Copy, Check, Terminal, FileCode, ImageIcon, X, Sparkles, BookOpen, ChevronRight, Layers, LayoutTemplate, Database, Monitor, Eye, Download, Clock, Smartphone, Tablet, Monitor as MonitorIcon, Play, Image as LucideImage } from 'lucide-react';
import { Section } from './Section';
import { CodeHistoryItem } from '../types';
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

// Enhanced context with Asset Protocol
const TAILWIND_V4_CONTEXT = `
RULES FOR TAILWIND CSS v4 GENERATION:
1. CSS-FIRST CONFIG: Use native CSS variables for theme values. Do NOT generate tailwind.config.js unless asked. Use @theme { --color-brand: #...; } inside the CSS file.
2. NATIVE OPACITY: Use 'bg-blue-500/50' syntax which now uses CSS color-mix or relative colors.
3. 3D TRANSFORMS: Use native 3D utilities: 'perspective-dramatic', 'rotate-x-12', 'transform-3d'.
4. ASSET PROTOCOL (STRICT):
   - IMAGES: NEVER use imaginary URLs like '/images/hero.jpg'. ALWAYS use 'https://placehold.co/{width}x{height}/EEE/31343C?text={Label}' (e.g., 'https://placehold.co/600x400/EEE/31343C?text=Hero+Image').
   - ICONS: Use SVG icons directly inline or FontAwesome CDN if needed.
   - AVATARS: Use 'https://i.pravatar.cc/150?img={1-70}' for user avatars.
`;

const UI_DESIGN_RULES = `
[MODE: UI/DESIGN IMPLEMENTATION]
You are an expert Front-end Engineer specialized in pixel-perfect implementation.

ASSET HANDLING RULES (CRITICAL):
1. IMAGES: Do NOT leave src="" empty. Do NOT use local paths.
   - Use: https://placehold.co/600x400/png?text=Description for rectangular images.
   - Use: https://placehold.co/100x100/png?text=Avatar for squares/circles.
   - Try to estimate the real aspect ratio from the image description.
2. LOGOS: If a logo is detected, use a stylized text span (e.g. <span class="font-bold text-2xl">Logo</span>) or a placeholder image.
3. ICONS: Use simple SVG paths inline or assume FontAwesome is available.

STRICT LAYOUT RULES:
- Analyze layout, spacing, colors, and typography meticulously.
- Use modern, responsive best practices (Grid/Flex).
- Output pure, ready-to-run code.
- If generating HTML, include <script src="https://cdn.tailwindcss.com"></script>.
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

interface CodeGeneratorProps {
    history?: CodeHistoryItem[];
    onAddToHistory?: (item: CodeHistoryItem) => void;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ history = [], onAddToHistory }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedMode, setSelectedMode] = useState('ui');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [contextImage, setContextImage] = useState<{ data: string, mimeType: string, preview: string } | null>(null);
  const [viewTab, setViewTab] = useState<'code' | 'preview'>('code');
  const [previewWidth, setPreviewWidth] = useState<'100%' | '768px' | '375px'>('100%');
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
        setSelectedMode('ui');
      };
      reader.readAsDataURL(file);
    }
  };

  const addToHistory = (code: string) => {
      if (onAddToHistory) {
          onAddToHistory({
              id: Date.now().toString(),
              prompt: prompt.substring(0, 100) + (prompt.length > 100 ? "..." : ""),
              code,
              language: selectedLanguage,
              mode: selectedMode,
              date: new Date()
          });
      }
  };

  const cleanCode = (code: string) => {
      // Remove markdown code blocks if present
      return code.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedCode('');
    setViewTab('code'); 
    
    let systemContext = selectedLanguage.includes("v4") ? TAILWIND_V4_CONTEXT : undefined;

    let finalPrompt = prompt;
    if (selectedMode === 'ui') {
        finalPrompt = `${UI_DESIGN_RULES}\n\nTASK: ${prompt}`;
    } else {
        finalPrompt = `[MODE: BACKEND/LOGIC]\nYou are a Senior Software Architect.\n\nTASK: ${prompt}\n\nSTRICT RULES:\n- Focus on performance, security, and error handling.\n- Write clean, commented, and efficient code.\n- Follow standard design patterns for the selected language.`;
    }
    if (contextImage) finalPrompt = `[VISUAL REFERENCE ATTACHED]\n${finalPrompt}`;

    try {
      const rawCode = await generateCodeSnippet(
          finalPrompt, 
          selectedLanguage, 
          contextImage ? { data: contextImage.data, mimeType: contextImage.mimeType } : undefined,
          systemContext
      );
      
      const cleanedCode = cleanCode(rawCode);
      setGeneratedCode(cleanedCode);
      addToHistory(cleanedCode);
      
      // Auto-switch to preview if it looks like HTML
      if (cleanedCode.includes('<html') || cleanedCode.includes('<!DOCTYPE') || selectedLanguage.includes('HTML')) {
          setViewTab('preview');
      }

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

  const handleDownload = () => {
      if (!generatedCode) return;
      const blob = new Blob([generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ink2code-export-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const openInStackBlitz = () => {
    if (!generatedCode) return;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://stackblitz.com/run?file=index.html';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'project[files][index.html]';
    
    // Ensure the code has the Tailwind CDN
    let codeToExport = generatedCode;
    if (!codeToExport.includes('cdn.tailwindcss.com') && (codeToExport.includes('<html') || selectedLanguage.includes('HTML'))) {
        if (!codeToExport.includes('<html')) {
             codeToExport = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ink2Code Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
</head>
<body class="bg-gray-50 p-4">
${codeToExport}
</body>
</html>`;
        } else {
             if (!codeToExport.includes('cdn.tailwindcss.com')) {
                 codeToExport = codeToExport.replace('<head>', '<head><script src="https://cdn.tailwindcss.com"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>');
             }
        }
    }
    
    input.value = codeToExport;
    const titleInput = document.createElement('input');
    titleInput.type = 'hidden';
    titleInput.name = 'project[title]';
    titleInput.value = 'Ink2Code Project';
    const templateInput = document.createElement('input');
    templateInput.type = 'hidden';
    templateInput.name = 'project[template]';
    templateInput.value = 'html';
    form.appendChild(input);
    form.appendChild(titleInput);
    form.appendChild(templateInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const loadFromHistory = (item: CodeHistoryItem) => {
      setGeneratedCode(item.code);
      setPrompt(item.prompt);
      setSelectedLanguage(item.language);
      if (item.mode) setSelectedMode(item.mode);
      setViewTab('code');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to construct a renderable HTML document for preview with AUTO-FIX Scripts
  const getPreviewSrc = () => {
      if (!generatedCode) return '';
      
      let codeToRender = generatedCode;
      
      // Auto-Fix Script: Replaces broken images with a pretty placeholder SVG
      const assetFallbackScript = `
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    img.onerror = function() {
                        this.onerror = null;
                        // Replace with a generated SVG placeholder
                        const width = this.width || 300;
                        const height = this.height || 200;
                        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '"%3E%3Crect fill="%23e2e8f0" width="100%25" height="100%25"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" font-family="sans-serif" font-size="14" text-anchor="middle" dy=".3em"%3EImage Asset%3C/text%3E%3C/svg%3E';
                        this.classList.add('opacity-80');
                    };
                    // Force check if src is empty or local
                    if (!img.src || img.src === window.location.href) {
                         img.onerror();
                    }
                });
            });
        </script>
      `;

      if (!codeToRender.includes('<body') && !codeToRender.includes('<html')) {
             codeToRender = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>body { background-color: transparent; padding: 20px; }</style>
                </head>
                <body>
                    ${codeToRender}
                    ${assetFallbackScript}
                </body>
                </html>
              `;
      } else {
          if (!codeToRender.includes('cdn.tailwindcss.com')) {
              codeToRender = codeToRender.replace('<head>', '<head><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
          }
          if (codeToRender.includes('</body>')) {
              codeToRender = codeToRender.replace('</body>', `${assetFallbackScript}</body>`);
          } else {
              codeToRender += assetFallbackScript;
          }
      }
      return codeToRender;
  };

  const isPreviewable = selectedLanguage.includes('HTML') || selectedLanguage.includes('Tailwind') || selectedLanguage.includes('JavaScript') || selectedLanguage.includes('TypeScript');

  return (
    <Section className="space-y-10 mb-20 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-blue-200 via-indigo-200 to-slate-500 font-sans">
          Ink<span className="text-indigo-400">2Code</span>.
        </h2>
        <p className="text-slate-400 text-lg font-light tracking-wide">
          Production-grade code generation with intelligent asset handling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Pane: Input & Examples */}
        <div className="lg:col-span-5 space-y-6">
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
            
            {/* Asset Status Indicator */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-500/70 font-mono uppercase tracking-wider">
               <LucideImage className="w-3 h-3" /> Smart Asset Pipeline Active
            </div>
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
        <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden flex flex-col bg-slate-950/30 border border-white/5 shadow-2xl h-[calc(100vh-12rem)] min-h-[600px]">
          <div className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center justify-between bg-slate-950/50 gap-4">
            <div className="flex items-center gap-4">
                {/* View Tabs */}
                <div className="flex p-1 bg-slate-900 rounded-lg border border-white/10">
                    <button 
                        onClick={() => setViewTab('code')}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-2 ${viewTab === 'code' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <FileCode className="w-3.5 h-3.5" /> Source
                    </button>
                    <button 
                        onClick={() => setViewTab('preview')}
                        disabled={!generatedCode || !isPreviewable}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-2 ${viewTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-slate-300 disabled:opacity-50'}`}
                    >
                        <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                </div>
            </div>

            {/* Preview Controls (Visible only in Preview Mode) */}
            {viewTab === 'preview' && (
                <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/10">
                    <Tooltip content="Mobile (375px)">
                        <button onClick={() => setPreviewWidth('375px')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '375px' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </Tooltip>
                    <Tooltip content="Tablet (768px)">
                        <button onClick={() => setPreviewWidth('768px')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '768px' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                            <Tablet className="w-4 h-4" />
                        </button>
                    </Tooltip>
                     <Tooltip content="Desktop (100%)">
                        <button onClick={() => setPreviewWidth('100%')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '100%' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                            <MonitorIcon className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            )}

            <div className="flex items-center gap-2">
                {generatedCode && (
                <>
                    <button
                        onClick={openInStackBlitz}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 text-xs font-mono transition-all border border-indigo-500/20 hover:border-indigo-500/40"
                    >
                        <Play className="w-3.5 h-3.5" />
                        RUN_STACKBLITZ
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono transition-all text-slate-300 border border-white/5 hover:border-white/20"
                    >
                        <Download className="w-3.5 h-3.5" />
                        SAVE
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1"></div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono transition-all text-slate-300"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "COPIED" : "COPY"}
                    </button>
                </>
                )}
            </div>
          </div>
          
          <div className="flex-1 relative bg-slate-900/50 flex flex-col overflow-hidden">
             {loading ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-500/30 space-y-4 z-20 bg-slate-950/80 backdrop-blur-sm">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <Sparkles className="w-4 h-4 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <p className="animate-pulse tracking-widest text-[10px] uppercase">Compiling Logic...</p>
                  {contextImage && (
                      <p className="text-[9px] text-emerald-400/70 font-mono">Scanning UI Topology...</p>
                  )}
               </div>
             ) : generatedCode ? (
                viewTab === 'preview' ? (
                     <div className="w-full h-full bg-slate-900 flex justify-center items-start overflow-auto p-4 relative">
                         <div className="absolute top-2 right-2 z-10 bg-black/50 text-white/50 px-2 py-1 rounded text-[10px] font-mono pointer-events-none backdrop-blur-md">Live Preview</div>
                         <div 
                            className="bg-white shadow-2xl transition-all duration-300 ease-in-out border border-slate-700" 
                            style={{ width: previewWidth, height: '100%', minHeight: '500px' }}
                         >
                            <iframe 
                                srcDoc={getPreviewSrc()}
                                className="w-full h-full border-none"
                                title="Code Preview"
                                sandbox="allow-scripts"
                            />
                         </div>
                     </div>
                ) : (
                    <div className="w-full h-full relative group">
                        <textarea
                            value={generatedCode}
                            onChange={(e) => setGeneratedCode(e.target.value)}
                            spellCheck={false}
                            className="w-full h-full bg-[#0d1117] text-slate-300 font-mono text-xs leading-relaxed p-6 resize-none outline-none border-none custom-scrollbar selection:bg-indigo-500/30 focus:ring-0"
                            style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        />
                         <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur text-slate-500 text-[10px] px-3 py-1 rounded-full border border-white/5 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity">
                            Editable Source
                        </div>
                    </div>
                )
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40 space-y-4">
                 <Code2 className="w-16 h-16" />
                 <p className="text-[10px] tracking-widest uppercase">Awaiting requirements</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
          <div className="pt-12 border-t border-white/5 animate-in fade-in">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <h3 className="text-sm font-mono uppercase tracking-wider">Recent Generators</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="group bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 rounded-xl overflow-hidden text-left transition-all hover:shadow-neon-indigo p-4 flex flex-col gap-2"
                      >
                          <div className="flex items-center justify-between w-full">
                              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{item.language}</span>
                              <span className="text-[10px] text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium line-clamp-2">{item.prompt}</p>
                          <div className="mt-auto pt-2 border-t border-white/5 flex items-center gap-1 text-[10px] text-slate-500 group-hover:text-indigo-300 transition-colors">
                              <Terminal className="w-3 h-3" /> Restore Session
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      )}
    </Section>
  );
};

export default CodeGenerator;
