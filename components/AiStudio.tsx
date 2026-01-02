
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { generateStudioImage, multimodalChat, getQuickResponse } from '../services/geminiService';
import { 
  Sparkles, Send, ImageIcon, Video, Camera, Image as LucideImage, 
  Settings, Zap, BrainCircuit, Loader2, Download, Maximize, X, 
  MessageSquare, FileText, ChevronRight, Wand2, Terminal, ShieldCheck,
  Pin, PinOff, UploadCloud, FileUp, GripHorizontal, Palette, Film
} from 'lucide-react';
import Tooltip from './Tooltip';
import ImageViewer from './ImageViewer';

const SIZES = ["1K", "2K", "4K"];
const RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"];
const GEN_STYLES = ["None", "Photorealistic", "Anime", "Synthwave", "Cinematic Lighting", "Hand-drawn", "Cyberpunk", "Watercolor", "Isometric"];

interface AttachedFile {
  id: string;
  data: string;
  mimeType: string;
  preview: string;
  pinned: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  pinned: boolean;
}

const AiStudio: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'generate'>('chat');
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [useThinking, setUseThinking] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Drag & Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFileIndex, setDraggedFileIndex] = useState<number | null>(null);

  // Controls
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedRatio, setSelectedRatio] = useState(RATIOS[0]);
  const [selectedGenStyle, setSelectedGenStyle] = useState(GEN_STYLES[0]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{src: string, alt: string} | null>(null);

  // Load persistence
  useEffect(() => {
    try {
        const savedHistory = localStorage.getItem('link2ink_chat_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
        
        const savedFiles = localStorage.getItem('link2ink_pinned_files');
        if (savedFiles) {
            setFiles(JSON.parse(savedFiles));
        }
    } catch (e) {
        console.warn("Failed to load saved session", e);
    }
  }, []);

  // Save history persistence
  useEffect(() => {
    try {
        localStorage.setItem('link2ink_chat_history', JSON.stringify(history));
    } catch (e) {
        console.warn("Failed to save history to localStorage", e);
    }
  }, [history]);

  // Save pinned files persistence
  useEffect(() => {
    try {
        // Only persist pinned files to manage storage quota better
        const pinnedFiles = files.filter(f => f.pinned);
        localStorage.setItem('link2ink_pinned_files', JSON.stringify(pinnedFiles));
    } catch (e) {
        console.warn("Failed to save files to localStorage", e);
    }
  }, [files]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFiles(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        data: base64.split(',')[1],
        mimeType: file.type,
        preview: base64,
        pinned: false
      }]);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files') && tab === 'chat') {
        setIsDragging(true);
    }
  }, [tab]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (tab !== 'chat') return;

    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    const validFiles = droppedFiles.filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (validFiles.length > 0) {
        validFiles.forEach(processFile);
    }
  }, [tab]);

  // File Reordering Logic
  const handleFileDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    setDraggedFileIndex(index);
    e.stopPropagation(); // Prevent interfering with global drag
  };

  const handleFileDropOnItem = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    const sourceIndex = parseInt(sourceIndexStr, 10);
    
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
        const newFiles = [...files];
        const [moved] = newFiles.splice(sourceIndex, 1);
        newFiles.splice(targetIndex, 0, moved);
        setFiles(newFiles);
    }
    setDraggedFileIndex(null);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const toggleFilePin = (id: string) => {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, pinned: !f.pinned } : f));
  };

  const toggleMessagePin = (id: string) => {
      setHistory(prev => prev.map(m => m.id === id ? { ...m, pinned: !m.pinned } : m));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && files.length === 0) return;

    if (tab === 'generate') {
      setLoading(true);
      setGeneratedImage(null);
      try {
        const img = await generateStudioImage(prompt, selectedRatio, selectedSize, selectedGenStyle);
        setGeneratedImage(img);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      const userText = prompt;
      const newMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          text: userText,
          pinned: false
      };
      
      setHistory(prev => [...prev, newMessage]);
      setPrompt('');
      setLoading(true);

      try {
        const geminiHistory = history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }));
        
        const response = await multimodalChat(userText, geminiHistory, files.map(f => ({ data: f.data, mimeType: f.mimeType })), useThinking);
        
        setHistory(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: response,
            pinned: false
        }]);
        
        // Clear files that are NOT pinned
        setFiles(prev => prev.filter(f => f.pinned));
      } catch (err) {
        setHistory(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Error processing request.",
            pinned: false
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleQuickFast = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await getQuickResponse(prompt);
      setHistory(prev => [
          ...prev, 
          { id: Date.now().toString(), role: 'user', text: `[FAST_QUERY]: ${prompt}`, pinned: false },
          { id: (Date.now()+1).toString(), role: 'model', text: response, pinned: false }
      ]);
      setPrompt('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 mb-20">
      {fullScreenImage && <ImageViewer src={fullScreenImage.src} alt={fullScreenImage.alt} onClose={() => setFullScreenImage(null)} />}

      <div className="text-center space-y-4">
        <h2 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-emerald-300 font-sans">
          Studio <span className="text-indigo-400">Prime</span>.
        </h2>
        <p className="text-slate-400 font-light tracking-wide">Advanced multimodal lab powered by Nano Banana Pro.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Navigation / Control Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel rounded-2xl p-2 space-y-1">
            <button 
              onClick={() => setTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs transition-all ${tab === 'chat' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-slate-500 hover:bg-white/5'}`}
            >
              <MessageSquare className="w-4 h-4" /> MULTIMODAL_CHAT
            </button>
            <button 
              onClick={() => setTab('generate')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs transition-all ${tab === 'generate' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'text-slate-500 hover:bg-white/5'}`}
            >
              <Wand2 className="w-4 h-4" /> IMAGE_GENERATOR
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Settings</span>
              <Settings className="w-3 h-3 text-slate-500" />
            </div>

            {tab === 'generate' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Maximize className="w-3 h-3" /> Render_Size
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {SIZES.map(s => (
                      <button 
                        key={s} onClick={() => setSelectedSize(s)}
                        className={`py-1.5 rounded-lg text-[10px] font-mono border transition-all ${selectedSize === s ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Settings className="w-3 h-3" /> Aspect_Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {RATIOS.map(r => (
                      <button 
                        key={r} onClick={() => setSelectedRatio(r)}
                        className={`py-1.5 rounded-lg text-[10px] font-mono border transition-all ${selectedRatio === r ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Visual_Style
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    {GEN_STYLES.map(s => (
                      <button 
                        key={s} onClick={() => setSelectedGenStyle(s)}
                        className={`py-1.5 px-2 rounded-lg text-[9px] font-mono border text-left truncate transition-all ${selectedGenStyle === s ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Tooltip content="Deep reasoning mode (32k budget)" position="right">
                  <button 
                    onClick={() => setUseThinking(!useThinking)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${useThinking ? 'bg-violet-500/10 border-violet-500/30' : 'bg-slate-950/50 border-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <BrainCircuit className={`w-4 h-4 ${useThinking ? 'text-violet-400' : 'text-slate-600'}`} />
                      <span className={`text-[10px] font-mono ${useThinking ? 'text-violet-300' : 'text-slate-500'}`}>THINKING_MODE</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${useThinking ? 'bg-violet-500' : 'bg-slate-800'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${useThinking ? 'left-4.5' : 'left-0.5'}`} />
                    </div>
                  </button>
                </Tooltip>
                
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5 space-y-2">
                   <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase">
                      <Zap className="w-3 h-3" /> Quick_Specs
                   </div>
                   <ul className="text-[10px] font-mono text-slate-500 space-y-1">
                      <li className="flex justify-between"><span>Model:</span> <span className="text-slate-400">Gemini 3 Pro</span></li>
                      <li className="flex justify-between">
                          <span>Access:</span> 
                          <span className="text-emerald-400 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Paid Tier
                          </span>
                      </li>
                      <li className="flex justify-between"><span>Vision:</span> <span className="text-emerald-500/70">Enabled</span></li>
                   </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Interface Area */}
        <div className="lg:col-span-9 space-y-6">
          <div className="glass-panel rounded-3xl h-[600px] flex flex-col overflow-hidden">
             {/* Header */}
             <div className="px-6 py-4 bg-slate-950/50 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${loading ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{tab}_READY</span>
                </div>
                {tab === 'generate' && generatedImage && (
                  <button 
                    onClick={() => setFullScreenImage({src: `data:image/png;base64,${generatedImage}`, alt: "Generated"}) }
                    className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-all"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                )}
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/20">
                {tab === 'chat' ? (
                  history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                       <BrainCircuit className="w-16 h-16 text-indigo-400" />
                       <div className="space-y-1">
                          <p className="text-sm font-mono uppercase tracking-widest">Neural link established</p>
                          <p className="text-xs font-mono">Upload images or video for deep analysis</p>
                       </div>
                    </div>
                  ) : (
                    history.map((msg, i) => (
                      <div key={msg.id || i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 group`}>
                        <div className={`relative max-w-[85%] p-4 rounded-2xl ${
                            msg.role === 'user' 
                            ? 'bg-indigo-600/10 text-indigo-200 border border-indigo-500/20' 
                            : 'bg-slate-900/80 text-slate-300 border border-white/5'
                        } ${msg.pinned ? 'ring-1 ring-yellow-500/30 shadow-[0_0_15px_-5px_rgba(234,179,8,0.2)]' : ''}`}>
                           
                           {/* Message Pin Button */}
                           <button 
                             onClick={() => toggleMessagePin(msg.id)}
                             className={`absolute top-2 right-2 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 ${msg.pinned ? 'opacity-100 text-yellow-400 bg-yellow-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                             title={msg.pinned ? "Unpin Message" : "Pin Message"}
                           >
                              {msg.pinned ? <Pin className="w-3 h-3 fill-current" /> : <Pin className="w-3 h-3" />}
                           </button>

                           <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans pr-4">{msg.text}</p>
                           {msg.pinned && (
                               <div className="absolute -top-2 -left-2 bg-yellow-500/20 text-yellow-500 rounded-full p-0.5 border border-yellow-500/30">
                                   <Pin className="w-2 h-2 fill-current" />
                               </div>
                           )}
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="h-full flex items-center justify-center">
                    {loading ? (
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 animate-spin text-emerald-500/50" />
                          <p className="text-[10px] font-mono text-emerald-400 animate-pulse tracking-widest uppercase">Rendering Digital Ink...</p>
                       </div>
                    ) : generatedImage ? (
                       <div className="relative group max-w-full max-h-full">
                          <img src={`data:image/png;base64,${generatedImage}`} className="max-w-full max-h-[500px] object-contain rounded-2xl shadow-2xl border border-white/5" />
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <a 
                              href={`data:image/png;base64,${generatedImage}`} 
                              download="studio-gen.png" 
                              className="p-3 bg-slate-900/80 border border-white/10 rounded-xl text-white hover:bg-emerald-500/20 transition-all flex items-center gap-2"
                             >
                               <Download className="w-4 h-4" />
                             </a>
                          </div>
                       </div>
                    ) : (
                      <div className="text-center space-y-4 opacity-20">
                         <LucideImage className="w-16 h-16 mx-auto" />
                         <p className="text-xs font-mono uppercase tracking-widest">Awaiting creative prompt</p>
                      </div>
                    )}
                  </div>
                )}
                {loading && tab === 'chat' && (
                   <div className="flex justify-start">
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                      </div>
                   </div>
                )}
                <div ref={chatEndRef} />
             </div>

             {/* Input Bar */}
             <div 
                className={`p-6 bg-slate-950/80 border-t border-white/5 space-y-4 transition-colors ${isDragging ? 'bg-indigo-500/10 border-indigo-500/50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag Overlay */}
                {isDragging && tab === 'chat' && (
                    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-indigo-500/50 rounded-b-3xl pointer-events-none">
                        <div className="flex flex-col items-center gap-3 animate-bounce">
                            <UploadCloud className="w-10 h-10 text-indigo-400" />
                            <p className="text-lg font-bold text-indigo-300">Drop files to attach</p>
                        </div>
                    </div>
                )}

                {files.length > 0 && (
                   <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {files.map((f, i) => (
                        <div 
                            key={f.id} 
                            draggable
                            onDragStart={(e) => handleFileDragStart(e, i)}
                            onDrop={(e) => handleFileDropOnItem(e, i)}
                            onDragOver={(e) => e.preventDefault()}
                            className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border group transition-all cursor-move ${f.pinned ? 'border-yellow-500/50 shadow-neon-yellow' : 'border-indigo-500/30'} ${draggedFileIndex === i ? 'opacity-50 scale-95' : 'hover:scale-105'}`}
                        >
                           {/* File Preview Logic */}
                           {f.mimeType.startsWith('video/') ? (
                              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex flex-col items-center justify-center pointer-events-none">
                                  <Film className="w-6 h-6 text-indigo-400 mb-1" />
                                  <span className="text-[8px] font-mono text-slate-500 uppercase">Video</span>
                              </div>
                           ) : (
                              <img src={f.preview} className="w-full h-full object-cover pointer-events-none" />
                           )}

                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5 items-end gap-1 z-20">
                               <button 
                                onClick={() => toggleFilePin(f.id)}
                                className={`p-1.5 rounded-full transition-colors ${f.pinned ? 'text-yellow-400 bg-yellow-500/20' : 'text-slate-300 hover:text-white hover:bg-white/20'}`}
                                title={f.pinned ? "Unpin file (remove after send)" : "Pin file (keep after send)"}
                               >
                                  {f.pinned ? <Pin className="w-3 h-3 fill-current" /> : <Pin className="w-3 h-3" />}
                               </button>
                               <button 
                                onClick={() => removeFile(f.id)}
                                className="p-1.5 rounded-full text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Remove file"
                               >
                                  <X className="w-3 h-3" />
                               </button>
                           </div>
                           
                           {/* Persistent Pin Indicator */}
                           {f.pinned && (
                               <div className="absolute top-1 left-1 bg-yellow-500/90 text-slate-900 rounded-full p-0.5 z-10 shadow-sm pointer-events-none">
                                   <Pin className="w-2 h-2 fill-current" />
                               </div>
                           )}
                           
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity">
                              <GripHorizontal className="w-6 h-6 text-white drop-shadow-md" />
                           </div>
                        </div>
                      ))}
                   </div>
                )}
                
                <form onSubmit={handleSend} className="flex gap-3 relative">
                   <div className="flex-1 relative group">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={tab === 'generate' ? "Describe the image you want to create..." : "Ask anything, drag & drop images, video, or design screenshots..."}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-200 placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500/50 resize-none h-[56px] min-h-[56px] custom-scrollbar group-hover:border-white/20 transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(e as any);
                          }
                        }}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                         <Tooltip content="Upload Image/Video" position="top">
                            <button 
                              type="button" 
                              onClick={() => fileInputRef.current?.click()}
                              className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"
                            >
                               <ImageIcon className="w-5 h-5" />
                            </button>
                         </Tooltip>
                         <input ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*" multiple onChange={handleFileUpload} />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <button 
                        type="submit" 
                        disabled={loading || (!prompt.trim() && files.length === 0)}
                        className="h-[56px] px-6 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 rounded-2xl font-bold transition-all disabled:opacity-50 hover:shadow-neon-indigo"
                      >
                         {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                      {tab === 'chat' && (
                        <Tooltip content="Fast Response (Flash Lite)" position="top">
                          <button 
                            type="button"
                            onClick={handleQuickFast}
                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl transition-all"
                          >
                             <Zap className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      )}
                   </div>
                </form>
                {/* Drag hint */}
                {!isDragging && tab === 'chat' && files.length === 0 && (
                    <div className="absolute right-24 bottom-6 pointer-events-none opacity-30 hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <FileUp className="w-3 h-3" /> Drag & Drop supported
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiStudio;
