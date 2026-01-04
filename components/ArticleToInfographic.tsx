
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateArticleInfographic } from '../services/geminiService';
import { Citation, ArticleHistoryItem } from '../types';
import { Link, Loader2, Download, Sparkles, AlertCircle, Palette, Globe, ExternalLink, BookOpen, Clock, Maximize, ChevronDown, Check, FileText } from 'lucide-react';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import ImageViewer from './ImageViewer';
import { Section } from './Section';
import { useApp } from '../contexts/AppContext';

interface ArticleToInfographicProps {
    history: ArticleHistoryItem[];
    onAddToHistory: (item: ArticleHistoryItem) => void;
}

const SKETCH_STYLES = [
    "Modern Editorial",
    "Fun & Playful",
    "Clean Minimalist",
    "Dark Mode Tech",
    "Abstract Geometric",
    "Vintage Poster",
    "Cyberpunk Neon",
    "Watercolor Art",
    "Custom"
];

const LANGUAGES = [
  { label: "English (US)", value: "English" },
  { label: "Arabic (Egypt)", value: "Arabic" },
  { label: "German (Germany)", value: "German" },
  { label: "Spanish (Mexico)", value: "Spanish" },
  { label: "French (France)", value: "French" },
  { label: "Hindi (India)", value: "Hindi" },
  { label: "Indonesian (Indonesia)", value: "Indonesian" },
  { label: "Italian (Italy)", value: "Italian" },
  { label: "Japanese (Japan)", value: "Japanese" },
  { label: "Korean (South Korea)", value: "Korean" },
  { label: "Portuguese (Brazil)", value: "Portuguese" },
  { label: "Russian (Russia)", value: "Russian" },
  { label: "Ukrainian (Ukraine)", value: "Ukrainian" },
  { label: "Vietnamese (Vietnam)", value: "Vietnamese" },
  { label: "Chinese (China)", value: "Chinese" },
];

const EXPORT_FORMATS = ["PNG", "JPG", "SVG"];

const ArticleToInfographic: React.FC<ArticleToInfographicProps> = ({ history, onAddToHistory }) => {
  const { showToast } = useApp();
  const [urlInput, setUrlInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(SKETCH_STYLES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].value);
  const [customStyle, setCustomStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState('');
  
  const [downloadFormat, setDownloadFormat] = useState("PNG");
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<{src: string, alt: string} | null>(null);

  const addToHistory = (url: string, image: string, cites: Citation[]) => {
      let title = url;
      try { title = new URL(url).hostname; } catch(e) {}
      
      const newItem: ArticleHistoryItem = {
          id: Date.now().toString(),
          title: title,
          url,
          imageData: image,
          citations: cites,
          date: new Date()
      };
      onAddToHistory(newItem);
  };

  const loadFromHistory = (item: ArticleHistoryItem) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setUrlInput(item.url);
      setImageData(item.imageData);
      setCitations(item.citations);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!urlInput.trim()) {
        showToast("Please provide a valid URL.", "error");
        return;
    }

    try {
        new URL(urlInput);
    } catch (err) {
        showToast("Please provide a valid URL starting with http:// or https://", "error");
        return;
    }
    
    setLoading(true);
    setImageData(null);
    setCitations([]);
    setLoadingStage('INITIALIZING...');

    try {
      const styleToUse = selectedStyle === 'Custom' ? customStyle : selectedStyle;
      const { imageData: resultImage, citations: resultCitations } = await generateArticleInfographic(urlInput, styleToUse, (stage) => {
          setLoadingStage(stage);
      }, selectedLanguage);
      
      if (resultImage) {
          setImageData(resultImage);
          setCitations(resultCitations);
          addToHistory(urlInput, resultImage, resultCitations);
          showToast('Infographic generated successfully!', 'success');
      } else {
          throw new Error("Failed to generate infographic image. The URL might be inaccessible.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      showToast(err.message || "Generation failed", 'error');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  const handleDownload = () => {
      if (!imageData) return;

      const filename = `site-sketch-${Date.now()}`;
      const link = document.createElement('a');

      if (downloadFormat === 'PNG') {
          link.href = `data:image/png;base64,${imageData}`;
          link.download = `${filename}.png`;
          link.click();
      } else if (downloadFormat === 'JPG') {
          const img = new Image();
          img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0);
                  link.href = canvas.toDataURL('image/jpeg', 0.9);
                  link.download = `${filename}.jpg`;
                  link.click();
              }
          };
          img.src = `data:image/png;base64,${imageData}`;
      } else if (downloadFormat === 'SVG') {
           const img = new Image();
           img.onload = () => {
               const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
    <image href="data:image/png;base64,${imageData}" width="${img.width}" height="${img.height}" />
</svg>`;
               const blob = new Blob([svgString], { type: 'image/svg+xml' });
               link.href = URL.createObjectURL(blob);
               link.download = `${filename}.svg`;
               link.click();
           };
           img.src = `data:image/png;base64,${imageData}`;
      }
  };

  return (
    <Section className="space-y-10 mb-20">
      
      {fullScreenImage && (
          <ImageViewer 
            src={fullScreenImage.src} 
            alt={fullScreenImage.alt} 
            onClose={() => setFullScreenImage(null)} 
          />
      )}

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-start-3 md:col-span-8 text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-teal-200 to-slate-500 font-sans">
            Site<span className="text-emerald-400">Sketch</span>.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide">
            Turn any article, documentation page, or blog post into a stunning, easy-to-digest infographic.
            </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-start-3 md:col-span-8 glass-panel rounded-3xl p-6 md:p-10 space-y-8 relative z-10">
            <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-4">
                    <label className="text-xs text-emerald-400 font-mono tracking-wider flex items-center gap-2">
                        <Link className="w-4 h-4" /> SOURCE_URL
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com/interesting-article"
                            className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-5 text-lg text-slate-200 placeholder:text-slate-600 focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 font-mono transition-all shadow-inner"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700">
                            <Sparkles className="w-5 h-5 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Style & Language Controls */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Style Selector */}
                    <div className="space-y-4">
                        <label className="text-xs text-emerald-400 font-mono tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4" /> ARTISTIC_STYLE
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {SKETCH_STYLES.map(style => (
                                <button
                                    key={style}
                                    type="button"
                                    onClick={() => setSelectedStyle(style)}
                                    className={`relative group h-20 rounded-xl overflow-hidden transition-all text-left border ${
                                        selectedStyle === style 
                                        ? 'ring-2 ring-emerald-400 border-transparent shadow-neon-emerald scale-[1.02]' 
                                        : 'border-white/10 hover:border-white/30 hover:scale-[1.02]'
                                    }`}
                                    title={style}
                                >
                                    <div className="absolute inset-0 bg-slate-800" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                                    <span className={`absolute bottom-2 left-2 text-[9px] font-bold font-mono leading-tight z-10 ${selectedStyle === style ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                        {style}
                                    </span>
                                    {selectedStyle === style && (
                                        <div className="absolute top-1.5 right-1.5 z-10 bg-emerald-500 rounded-full p-0.5 shadow-sm">
                                            <Check className="w-2.5 h-2.5 text-slate-900" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        {selectedStyle === 'Custom' && (
                            <input 
                                type="text" 
                                value={customStyle}
                                onChange={(e) => setCustomStyle(e.target.value)}
                                placeholder="Describe custom style..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 font-mono transition-all animate-in fade-in"
                            />
                        )}
                    </div>

                    {/* Language Selector */}
                    <div className="space-y-4">
                        <label className="text-xs text-emerald-400 font-mono tracking-wider flex items-center gap-2">
                            <Globe className="w-4 h-4" /> OUTPUT_LANGUAGE
                        </label>
                        <div className="relative w-full">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 font-mono appearance-none cursor-pointer hover:bg-white/5 transition-colors truncate pr-8"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang.value} value={lang.value} className="bg-slate-900 text-slate-300">
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                        
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl mt-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5"><Sparkles className="w-4 h-4 text-emerald-400/70" /></div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-emerald-300 font-mono uppercase tracking-wide">Pro Tip</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        SiteSketch analyzes text density and semantic structure to create the best layout. 
                                        Try "Dark Mode Tech" for documentation or "Modern Editorial" for news.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !urlInput.trim()}
                    className="w-full py-5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-mono text-base tracking-wider hover:shadow-neon-emerald"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    {loading ? "PROCESSING..." : "GENERATE_INFOGRAPHIC"}
                </button>
            </form>
        </div>
      </div>

      {error && (
         <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-start-4 md:col-span-6 glass-panel border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in font-mono text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <p>{error}</p>
            </div>
        </div>
      )}

      {loading && (
        <LoadingState message={loadingStage || 'READING_CONTENT'} type="article" />
      )}

      {/* Result Section */}
      {imageData && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="md:col-start-3 md:col-span-8 glass-panel rounded-3xl p-1.5">
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 mb-1.5 bg-slate-950/30 rounded-t-2xl">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-400" /> Generated_Result
                    </h3>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setFullScreenImage({src: `data:image/png;base64,${imageData}`, alt: "Article Sketch"})}
                            className="text-xs flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono p-1.5 rounded-lg hover:bg-white/10"
                            title="Full Screen"
                        >
                            <Maximize className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center bg-emerald-500/10 rounded-xl border border-emerald-500/20 p-0.5 relative">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors font-mono hover:bg-emerald-500/20 rounded-lg"
                            >
                                <Download className="w-4 h-4" /> DOWNLOAD
                            </button>
                            <div className="w-px h-4 bg-emerald-500/20 mx-0.5"></div>
                            <div className="relative">
                                <button
                                    onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                                    className="p-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                                        {downloadFormat} <ChevronDown className="w-3 h-3" />
                                    </div>
                                </button>
                                {isFormatMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-24 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                                        {EXPORT_FORMATS.map(fmt => (
                                            <button
                                                key={fmt}
                                                onClick={() => { setDownloadFormat(fmt); setIsFormatMenuOpen(false); }}
                                                className={`w-full text-left px-3 py-2 text-[10px] font-mono hover:bg-white/5 flex items-center justify-between ${downloadFormat === fmt ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'}`}
                                            >
                                                {fmt}
                                                {downloadFormat === fmt && <Check className="w-3 h-3" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden bg-[#eef8fe] relative group">
                    {selectedStyle === "Dark Mode Tech" && <div className="absolute inset-0 bg-slate-950 pointer-events-none mix-blend-multiply" />}
                    <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <img src={`data:image/png;base64,${imageData}`} alt="Generated Infographic" className="w-full h-auto object-contain max-h-[800px] mx-auto relative z-10" />
                </div>

                {citations.length > 0 && (
                    <div className="px-6 py-8 border-t border-white/5 bg-slate-900/30 rounded-b-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <BookOpen className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white tracking-wide font-mono">
                                    Grounding Sources
                                </h4>
                                <p className="text-[10px] text-slate-500 font-mono">Verified citations from analysis</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {citations.map((cite, idx) => {
                                let hostname = cite.uri;
                                try {
                                    hostname = new URL(cite.uri).hostname;
                                } catch (e) {}
                                
                                return (
                                    <a 
                                        key={idx} 
                                        href={cite.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col justify-between p-4 bg-slate-950/50 hover:bg-emerald-500/5 border border-white/5 hover:border-emerald-500/30 rounded-xl transition-all group relative overflow-hidden h-full"
                                        title={cite.title || cite.uri}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors border border-white/5">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-200 group-hover:text-emerald-100 line-clamp-2 leading-snug transition-colors">
                                                    {cite.title || "Web Source"}
                                                </p>
                                                <p className="text-[10px] text-slate-500 truncate font-mono mt-1 group-hover:text-emerald-400/70 transition-colors">
                                                    {hostname}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 group-hover:border-emerald-500/10 transition-colors">
                                            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider group-hover:text-emerald-500/50">Verified Link</span>
                                            <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-all transform group-hover:translate-x-1" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
      
      {/* History Section - STRICT GRID: Mobile 1, Tablet+ 3 */}
      <div className="pt-12 border-t border-white/5 animate-in fade-in">
          <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Clock className="w-4 h-4" />
              <h3 className="text-sm font-mono uppercase tracking-wider">Recent Sketches</h3>
          </div>
          {history.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {history.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="group bg-slate-900/50 border border-white/5 hover:border-emerald-500/50 rounded-xl overflow-hidden text-left transition-all hover:shadow-neon-emerald aspect-video relative"
                      >
                          <div className="absolute inset-0 bg-slate-950">
                              <img src={`data:image/png;base64,${item.imageData}`} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                              <p className="text-xs font-bold text-white truncate font-mono">{item.title}</p>
                              <p className="text-[10px] text-slate-300 mt-0.5 truncate">{new URL(item.url).hostname}</p>
                          </div>
                      </button>
                  ))}
              </div>
          ) : (
             <EmptyState 
                icon={FileText} 
                title="No Sketches Created" 
                description="Paste a URL above to generate your first visual summary." 
              />
          )}
      </div>
    </Section>
  );
};

export default ArticleToInfographic;
