
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useMemo } from 'react';
import { generateCodeSnippet } from '../services/geminiService';
import { 
  Code2, Wand2, Loader2, Terminal, FileCode, ImageIcon, X, 
  Sparkles, LayoutTemplate, Database, Monitor, 
  Eye, Smartphone, Laptop, Monitor as MonitorIcon, Split, AlertTriangle, CheckCircle2, Check, RefreshCw
} from 'lucide-react';
import { Section } from './Section';
import { CodeHistoryItem } from '../types';
import Tooltip from './Tooltip';

const LANGUAGES = [
  "HTML/CSS Tailwind v4 (Stand-alone)",
  "React + Tailwind v4 (Next.js 16)",
];

const MODES = {
  UI: 'UI_COMPONENT',
  LOGIC: 'PAGE_LOGIC'
};

const GOLDEN_LAWS = `
[SYSTEM: EVERYTHING x DESIGN v4.0 KERNEL]
FRAMEWORK: Next.js 16 (App Router) + Tailwind CSS v4.

1. ZERO-PX POLICY (STRICT):
   - FORBIDDEN: px values for layout (width, height, padding, margin).
   - ALLOWED: rem, em, %, viewport units (vw/vh).
   - TAILWIND: Use standard classes (p-4, m-6, gap-4).
   - TYPOGRAPHY: Must use clamp() or fluid variables. Ex: text-[clamp(1rem,2vw,1.5rem)].

2. COMPONENT RESPONSIBILITY:
   - IF MODE == UI_COMPONENT: Generate a PURE visual block. No margins on the outer container. width: 100%. Internal spacing only.
   - IF MODE == PAGE_LOGIC: Assemble components using ContainerPage pattern. Handle Grid (grid-cols-12) and Section spacing here.

3. TAILWIND v4 & THEME:
   - Use project theme colors: 'bg-okmd-cyan', 'text-okmd-dark', 'bg-okmd-secondary'.
   - Use 'size-10' instead of 'w-10 h-10'.
   - Use 'perspective-dramatic' for 3D effects.

4. ICONOGRAPHY (CRITICAL FOR PREVIEW):
   - You MUST use FontAwesome classes (e.g., <i className="fa-solid fa-home"></i>) for icons inside the component.
   - DO NOT import or use Lucide-React icons in the generated code, as they will not render in the preview iframe.

5. ASSET INTELLIGENCE:
   - Do not leave empty src="".
   - Use: https://placehold.co/600x400/1B1D20/EEE?text=Description
`;

interface CodeGeneratorProps {
    history?: CodeHistoryItem[];
    onAddToHistory?: (item: CodeHistoryItem) => void;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ history = [], onAddToHistory }) => {
  const [activeMode, setActiveMode] = useState<string>(MODES.UI);
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1]); 
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [contextImage, setContextImage] = useState<{ data: string, mimeType: string, preview: string } | null>(null);
  
  const [viewTab, setViewTab] = useState<'code' | 'preview'>('code');
  const [previewWidth, setPreviewWidth] = useState<'100%' | '1440px' | '768px' | '375px'>('100%');
  const [compareMode, setCompareMode] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  
  const [checklist, setChecklist] = useState({
      zeroPx: true,
      mobileFirst: true,
      tailwindV4: true
  });

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
        setActiveMode(MODES.UI);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCode = (code: string) => {
      const warnings: string[] = [];
      if (/-\[\d+px\]/.test(code)) warnings.push("Detected hardcoded pixel values (e.g. w-[300px]). Violates Zero-PX Policy.");
      if (code.includes("style={{")) warnings.push("Detected inline styles. Should use Tailwind classes.");
      if (!code.includes("clamp(")) warnings.push("No fluid typography (clamp) detected.");
      // We auto-fix lucide imports now, so no need to warn as aggressively, but still good to note.
      if (code.includes("lucide-react")) warnings.push("Detected Lucide icons. Auto-mocking active for preview.");
      setValidationWarnings(warnings);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedCode('');
    setValidationWarnings([]);
    setViewTab('code'); 
    
    let taskContext = "";
    if (activeMode === MODES.UI) {
        taskContext = `
        TASK: Create a UI COMPONENT based on the user request.
        CONTEXT: This is a standalone building block.
        REQUIREMENTS:
        - Must correspond to the uploaded image (if any).
        - Use <section> or <div> as root.
        - NO global layout constraints (container/margin) on root.
        - Ensure text contrast is accessible (assume white background for preview).
        `;
    } else {
        taskContext = `
        TASK: Create a PAGE LAYOUT / LOGIC layer.
        CONTEXT: Assemble the structure.
        REQUIREMENTS:
        - Implement Grid System (grid-cols-1 md:grid-cols-12).
        - Handle Data Fetching mockups.
        - Use 'ContainerPage' wrapper pattern (simulated div class="max-w-[1440px] mx-auto fluid-px").
        `;
    }

    const fullPrompt = `
    ${GOLDEN_LAWS}
    
    ${taskContext}

    USER REQUEST: ${prompt}
    
    ${checklist.zeroPx ? "ENFORCEMENT: STRICT ZERO-PX POLICY." : ""}
    ${checklist.mobileFirst ? "ENFORCEMENT: MOBILE-FIRST RESPONSIVE DESIGN." : ""}
    `;

    try {
      const rawCode = await generateCodeSnippet(
          fullPrompt, 
          selectedLanguage, 
          contextImage ? { data: contextImage.data, mimeType: contextImage.mimeType } : undefined
      );
      
      const cleanedCode = rawCode.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
      setGeneratedCode(cleanedCode);
      validateCode(cleanedCode);
      
      if (onAddToHistory) {
          onAddToHistory({
              id: Date.now().toString(),
              prompt: prompt.substring(0, 100),
              code: cleanedCode,
              language: selectedLanguage,
              mode: activeMode,
              date: new Date()
          });
      }
      
      if (cleanedCode.includes('<') || activeMode === MODES.UI) {
          setViewTab('preview');
      }

    } catch (err: any) {
      setGeneratedCode(`// Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Memoized Preview Source to prevent regeneration on resize
  const previewSrc = useMemo(() => {
      if (!generatedCode) return '';
      let code = generatedCode;
      const isReact = code.includes('import React') || code.includes('export default');

      const tailwindConfig = `
        <script>
          window.onerror = function(message, source, lineno, colno, error) {
             document.body.innerHTML = '<div style="color:#ef4444; padding:20px; font-family:monospace; background:#fee2e2; border-bottom:1px solid #fecaca;"><strong>Runtime Error:</strong> ' + message + '</div>';
          };
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                   'okmd-cyan': '#16A7CB',
                   'okmd-secondary': '#74CEE2',
                   'okmd-dark': '#1B1D20',
                },
                fontFamily: {
                   sans: ['Kanit', 'sans-serif'],
                   mono: ['JetBrains Mono', 'monospace'],
                }
              }
            }
          }
        </script>
      `;

      const header = `
        <script src="https://cdn.tailwindcss.com"></script>
        ${tailwindConfig}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
          body { font-family: "Kanit", sans-serif; background: #ffffff; color: #1B1D20; overflow-x: hidden; overflow-y: auto; }
          #root { min-height: 100vh; display: flex; flex-direction: column; }
        </style>
      `;

      if (isReact) {
          let cleanCode = code;

          // Auto-Mock Lucide Icons to prevent ReferenceErrors in browser preview
          cleanCode = cleanCode.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lucide-react['"];?/g, (match, imports) => {
              const icons = imports.split(',').map((i: string) => i.trim());
              // Create a dummy component for each icon using FontAwesome as fallback or just a placeholder
              return icons.map((icon: string) => `const ${icon} = (props) => React.createElement('i', { className: 'fa-solid fa-shapes text-indigo-400', title: '${icon}', style: { fontStyle: 'normal' }, ...props });`).join('\n');
          });

          // Strip other imports
          cleanCode = cleanCode
              .replace(/import\s+.*?;/g, '')
              .replace(/export default function\s+(\w+)/, 'const App = function $1')
              .replace(/export default\s+(\w+)/, 'const App = $1');

          return `
            <!DOCTYPE html>
            <html>
              <head>
                ${header}
                <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
              </head>
              <body>
                <div id="root"></div>
                <script type="text/babel">
                  const props = {};
                  ${cleanCode}
                  
                  const rootElement = document.getElementById('root');
                  if (!rootElement) throw new Error("Root element missing");
                  
                  const root = ReactDOM.createRoot(rootElement);
                  try {
                    root.render(<App />);
                  } catch (e) {
                    document.body.innerHTML = '<div style="color:red; padding:20px; font-family:monospace;"><h3>Render Error</h3>' + e.message + '</div>';
                  }
                </script>
              </body>
            </html>
          `;
      } else {
          if (!code.includes('<html')) {
              return `<!DOCTYPE html><html><head>${header}</head><body>${code}</body></html>`;
          } else {
              return code.replace('<head>', `<head>${header}`);
          }
      }
  }, [generatedCode]);

  return (
    <Section className="space-y-8 mb-20 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 font-sans">
          Everything <span className="text-indigo-400">x</span> Design
        </h2>
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500">
             <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> UI_COMPOSER</span>
             <span className="w-px h-3 bg-white/10" />
             <span className="flex items-center gap-1"><Database className="w-3 h-3" /> LOGIC_KERNEL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[calc(100vh-14rem)] min-h-[700px]">
        <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="grid grid-cols-2 p-1 bg-slate-900/50 rounded-xl border border-white/5">
                <button onClick={() => setActiveMode(MODES.UI)} className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-mono font-bold transition-all ${activeMode === MODES.UI ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                    <LayoutTemplate className="w-4 h-4" /> UI BLOCK
                </button>
                <button onClick={() => setActiveMode(MODES.LOGIC)} className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-mono font-bold transition-all ${activeMode === MODES.LOGIC ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                    <Database className="w-4 h-4" /> PAGE LOGIC
                </button>
            </div>

            <form onSubmit={handleGenerate} className="flex-1 glass-panel rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="space-y-3 p-4 bg-slate-950/30 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-emerald-400 mb-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Golden Laws
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checklist.zeroPx ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'}`}>
                                {checklist.zeroPx && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" checked={checklist.zeroPx} onChange={e => setChecklist(p => ({...p, zeroPx: e.target.checked}))} className="hidden" />
                            <span className="group-hover:text-white transition-colors">Strict Zero-PX Policy</span>
                        </label>
                        <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer group">
                             <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checklist.mobileFirst ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'}`}>
                                {checklist.mobileFirst && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" checked={checklist.mobileFirst} onChange={e => setChecklist(p => ({...p, mobileFirst: e.target.checked}))} className="hidden" />
                            <span className="group-hover:text-white transition-colors">Mobile-First Response</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex justify-between items-center">
                        <label className="text-xs text-indigo-400 font-mono tracking-wider flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> 
                            {activeMode === MODES.UI ? "VISUAL_SPEC" : "LOGIC_FLOW"}
                        </label>
                        {contextImage && (
                            <button type="button" onClick={() => setContextImage(null)} className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1">
                                <X className="w-3 h-3" /> Clear Image
                            </button>
                        )}
                    </div>

                    <div className="relative flex-1">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={activeMode === MODES.UI 
                                ? "Describe the UI component. Upload an image for best results..." 
                                : "Describe the page structure, grid layout, and data requirements..."}
                            className="w-full h-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500/50 resize-none font-mono custom-scrollbar"
                        />
                        {contextImage && (
                            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-lg border border-indigo-500/50 overflow-hidden shadow-lg group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <img src={contextImage.preview} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ImageIcon className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        )}
                        {!contextImage && (
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-4 right-4 p-2 bg-slate-800 hover:bg-indigo-500 text-slate-400 hover:text-white rounded-lg transition-colors shadow-lg border border-white/10"
                                title="Attach Design Reference"
                            >
                                <ImageIcon className="w-4 h-4" />
                            </button>
                        )}
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 font-mono tracking-widest disabled:opacity-50 shadow-lg ${
                        activeMode === MODES.UI 
                        ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-neon-indigo' 
                        : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-neon-emerald'
                    }`}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                    {loading ? "ASSEMBLING..." : "GENERATE_CODE"}
                </button>
            </form>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-0 glass-panel rounded-3xl overflow-hidden h-full">
            <div className="px-4 py-2 border-b border-white/5 bg-slate-950/30 flex items-center justify-between shrink-0">
                <div className="flex gap-1 bg-slate-900/80 p-1 rounded-lg border border-white/5">
                    <button onClick={() => setViewTab('code')} className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-2 transition-all ${viewTab === 'code' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                        <FileCode className="w-3.5 h-3.5" /> Source
                    </button>
                    <button onClick={() => setViewTab('preview')} className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-2 transition-all ${viewTab === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                </div>

                {viewTab === 'preview' && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-white/5">
                             <Tooltip content="Mobile (375px)">
                                <button onClick={() => setPreviewWidth('375px')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '375px' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                                    <Smartphone className="w-4 h-4" />
                                </button>
                            </Tooltip>
                             <Tooltip content="Desktop (1440px)">
                                <button onClick={() => setPreviewWidth('1440px')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '1440px' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                                    <MonitorIcon className="w-4 h-4" />
                                </button>
                            </Tooltip>
                            <Tooltip content="Full Width">
                                <button onClick={() => setPreviewWidth('100%')} className={`p-1.5 rounded hover:bg-white/10 ${previewWidth === '100%' ? 'text-white bg-white/10' : 'text-slate-500'}`}>
                                    <Laptop className="w-4 h-4" />
                                </button>
                            </Tooltip>
                        </div>
                        
                        <button onClick={() => setGeneratedCode(c => c + ' ')} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors border border-white/5" title="Force Refresh">
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {contextImage && (
                            <button onClick={() => setCompareMode(!compareMode)} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border transition-all ${compareMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-slate-900/80 border-white/5 text-slate-500'}`}>
                                <Split className="w-3.5 h-3.5" /> Compare
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className={`flex-1 relative overflow-hidden flex flex-col ${viewTab === 'preview' ? 'bg-white' : 'bg-[#0d1117]'}`}>
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/90 backdrop-blur-sm">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                            <Sparkles className="w-5 h-5 absolute -top-2 -right-2 text-emerald-400 animate-bounce" />
                        </div>
                        <p className="mt-4 font-mono text-xs text-indigo-300 animate-pulse tracking-widest">
                            {activeMode === MODES.UI ? "COMPOSING PIXELS..." : "ASSEMBLING LOGIC..."}
                        </p>
                    </div>
                ) : generatedCode ? (
                    viewTab === 'preview' ? (
                        <div className="w-full h-full flex flex-col overflow-hidden bg-white">
                             <div className="flex-1 flex overflow-hidden justify-center bg-slate-100">
                                {compareMode && contextImage && (
                                    <div className="flex-1 border-r border-slate-200 bg-white relative overflow-auto p-4 flex items-center justify-center">
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-[10px] font-mono text-white z-10">Original</div>
                                        <img src={contextImage.preview} className="max-w-full max-h-full object-contain shadow-lg" />
                                    </div>
                                )}
                                <div className={`overflow-auto flex flex-col items-center bg-gray-50/50 transition-all duration-300 ${compareMode ? 'flex-1' : 'w-full'}`}>
                                    <div 
                                        className="bg-white shadow-2xl transition-[width] duration-300 ease-in-out h-full min-h-full border-x border-slate-200"
                                        style={{ width: previewWidth }}
                                    >
                                        <iframe 
                                            srcDoc={previewSrc}
                                            className="w-full h-full border-none block"
                                            title="Preview"
                                            sandbox="allow-scripts"
                                        />
                                    </div>
                                </div>
                             </div>
                        </div>
                    ) : (
                        <div className="w-full h-full relative group">
                            <textarea
                                value={generatedCode}
                                readOnly
                                className="w-full h-full bg-[#0d1117] text-slate-300 font-mono text-xs leading-relaxed p-6 resize-none outline-none border-none custom-scrollbar"
                                style={{ fontFamily: '"JetBrains Mono", monospace' }}
                            />
                            {validationWarnings.length > 0 && (
                                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-red-500/30 rounded-xl p-3 backdrop-blur-md animate-in slide-in-from-bottom-2 z-10">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-red-200 font-mono mb-1">Validation Warnings</p>
                                            <ul className="text-[10px] text-red-200/70 list-disc list-inside space-y-0.5">
                                                {validationWarnings.map((w, i) => <li key={i}>{w}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <div className={`h-full flex flex-col items-center justify-center space-y-4 ${viewTab === 'preview' ? 'hidden' : 'text-slate-700 opacity-40'}`}>
                        <Code2 className="w-20 h-20" />
                        <p className="text-xs tracking-widest uppercase font-mono">Ready to Engineer</p>
                    </div>
                )}
            </div>
            
            <div className="px-4 py-2 bg-slate-950 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    System Online
                 </div>
                 <div>
                    Target: Next.js 16 / Tailwind v4
                 </div>
            </div>

        </div>
      </div>
    </Section>
  );
};

export default CodeGenerator;
