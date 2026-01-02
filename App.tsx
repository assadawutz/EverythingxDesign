
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import RepoAnalyzer from './components/RepoAnalyzer';
import ArticleToInfographic from './components/ArticleToInfographic';
import CodeGenerator from './components/CodeGenerator';
import AiStudio from './components/AiStudio';
import DevStudio from './components/DevStudio';
import Home from './components/Home';
import IntroAnimation from './components/IntroAnimation';
import ApiKeyModal from './components/ApiKeyModal';
import Tooltip from './components/Tooltip';
import { ViewMode, RepoHistoryItem, ArticleHistoryItem, DevStudioState } from './types';
import { Github, PenTool, GitBranch, FileText, Home as HomeIcon, CreditCard, Code2, Info, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.HOME);
  const [showIntro, setShowIntro] = useState(true);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [checkingKey, setCheckingKey] = useState<boolean>(true);
  
  // Lifted History State for Persistence
  const [repoHistory, setRepoHistory] = useState<RepoHistoryItem[]>([]);
  const [articleHistory, setArticleHistory] = useState<ArticleHistoryItem[]>([]);

  // Dev Studio State (Lifted to allow data passing)
  const [devStudioData, setDevStudioData] = useState<DevStudioState | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        setHasApiKey(false);
      }
      setCheckingKey(false);
    };
    checkKey();
  }, []);

  // Load History Persistence with Date Hydration
  useEffect(() => {
    try {
      const savedRepo = localStorage.getItem('link2ink_repo_history');
      if (savedRepo) {
        const parsed = JSON.parse(savedRepo);
        const hydrated = parsed.map((item: any) => ({
            ...item,
            date: new Date(item.date)
        }));
        setRepoHistory(hydrated);
      }

      const savedArticle = localStorage.getItem('link2ink_article_history');
      if (savedArticle) {
        const parsed = JSON.parse(savedArticle);
        const hydrated = parsed.map((item: any) => ({
            ...item,
            date: new Date(item.date)
        }));
        setArticleHistory(hydrated);
      }
    } catch (e) {
      console.warn("Failed to load history", e);
    }
  }, []);

  // Save Repo History Persistence
  useEffect(() => {
    try {
      localStorage.setItem('link2ink_repo_history', JSON.stringify(repoHistory));
    } catch (e) {
      console.warn("Failed to save repo history", e);
    }
  }, [repoHistory]);

  // Save Article History Persistence
  useEffect(() => {
    try {
      localStorage.setItem('link2ink_article_history', JSON.stringify(articleHistory));
    } catch (e) {
      console.warn("Failed to save article history", e);
    }
  }, [articleHistory]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleNavigate = (mode: ViewMode, data?: any) => {
    if (mode === ViewMode.DEV_STUDIO && data) {
        setDevStudioData(data);
    }
    setCurrentView(mode);
  };

  const handleAddRepoHistory = (item: RepoHistoryItem) => {
    setRepoHistory(prev => [item, ...prev]);
  };

  const handleAddArticleHistory = (item: ArticleHistoryItem) => {
    setArticleHistory(prev => [item, ...prev]);
  };

  const openKeySelector = async () => {
      if (window.aistudio?.openSelectKey) {
          await window.aistudio.openSelectKey();
          // Re-check after selection
          if (window.aistudio.hasSelectedApiKey) {
             const has = await window.aistudio.hasSelectedApiKey();
             setHasApiKey(has);
          }
      }
  };

  if (checkingKey) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Enforce API Key Modal */}
      {!hasApiKey && <ApiKeyModal onKeySelected={() => setHasApiKey(true)} />}

      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <header className="sticky top-4 z-50 mx-auto w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1400px]">
        <div className="glass-panel rounded-2xl px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <button 
            onClick={() => setCurrentView(ViewMode.HOME)}
            className="flex items-center gap-3 md:gap-4 group transition-opacity hover:opacity-80"
          >
            <div className="relative flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl bg-slate-900/50 border border-white/10 shadow-inner group-hover:border-violet-500/50 transition-colors">
               <PenTool className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight font-sans flex items-center gap-2">
                Link2Ink <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400 border border-white/5 hidden sm:inline-block">Studio</span>
              </h1>
              <p className="text-xs font-mono text-slate-400 tracking-wider uppercase hidden sm:block">Visual Intelligence Platform</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            
            {/* Enhanced API Key Status Indicator */}
            <Tooltip content={hasApiKey ? "Click to manage API Key" : "Select Paid API Key"} position="bottom">
                <button
                    onClick={openKeySelector}
                    className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 group ${
                        hasApiKey
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] hover:bg-emerald-500/20'
                        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20 animate-pulse'
                    }`}
                >
                    {hasApiKey ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest">
                        {hasApiKey ? 'Paid Tier Active' : 'Select API Key'}
                    </span>
                    {hasApiKey && (
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[pulse_2s_infinite] ml-1 shadow-[0_0_5px_currentColor]" />
                    )}
                </button>
            </Tooltip>

            <Tooltip content="Documentation & Code" position="bottom">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 md:p-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50 transition-all hover:shadow-neon-violet"
                >
                  <Github className="w-5 h-5" />
                </a>
            </Tooltip>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Navigation Tabs (Hidden on Home, visible on tools) */}
        {currentView !== ViewMode.HOME && (
            <div className="flex justify-center mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 sticky top-24 z-40">
            <div className="glass-panel p-1 md:p-1.5 rounded-full flex relative shadow-2xl">
                <Tooltip content="Return Home">
                    <button
                    onClick={() => setCurrentView(ViewMode.HOME)}
                    className="relative flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-mono text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    >
                    <HomeIcon className="w-4 h-4" />
                    </button>
                </Tooltip>
                <div className="w-px h-6 bg-white/10 my-auto mx-1"></div>
                
                <Tooltip content="Analyze Repo Structure">
                    <button
                    onClick={() => setCurrentView(ViewMode.REPO_ANALYZER)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-mono ${
                        currentView === ViewMode.REPO_ANALYZER || currentView === ViewMode.DEV_STUDIO
                        ? 'text-white bg-white/10 shadow-glass-inset border border-white/10'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    >
                    <GitBranch className="w-4 h-4" />
                    <span className="hidden sm:inline">GitFlow</span>
                    </button>
                </Tooltip>

                <Tooltip content="URL to Infographic">
                    <button
                    onClick={() => setCurrentView(ViewMode.ARTICLE_INFOGRAPHIC)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-mono ${
                        currentView === ViewMode.ARTICLE_INFOGRAPHIC
                        ? 'text-emerald-100 bg-emerald-500/10 shadow-glass-inset border border-emerald-500/20'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">SiteSketch</span>
                    </button>
                </Tooltip>

                <Tooltip content="AI Code Engineering">
                    <button
                    onClick={() => setCurrentView(ViewMode.CODE_GENERATOR)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-mono ${
                        currentView === ViewMode.CODE_GENERATOR
                        ? 'text-indigo-100 bg-indigo-500/10 shadow-glass-inset border border-indigo-500/20'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    >
                    <Code2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Ink2Code</span>
                    </button>
                </Tooltip>

                <div className="w-px h-6 bg-white/10 my-auto mx-1"></div>

                <Tooltip content="Advanced Multi-modal Studio">
                    <button
                    onClick={() => setCurrentView(ViewMode.AI_STUDIO)}
                    className={`relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-mono ${
                        currentView === ViewMode.AI_STUDIO
                        ? 'text-fuchsia-100 bg-fuchsia-500/10 shadow-glass-inset border border-fuchsia-500/20'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                    >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Studio</span>
                    </button>
                </Tooltip>
            </div>
            </div>
        )}

        <div className="flex-1">
            {currentView === ViewMode.HOME && (
                <Home onNavigate={handleNavigate} />
            )}
            {currentView === ViewMode.REPO_ANALYZER && (
                <div className="animate-in fade-in-30 slide-in-from-bottom-4 duration-500 ease-out">
                    <RepoAnalyzer 
                        onNavigate={handleNavigate} 
                        history={repoHistory} 
                        onAddToHistory={handleAddRepoHistory}
                    />
                </div>
            )}
            {currentView === ViewMode.DEV_STUDIO && (
                <div className="animate-in fade-in-30 slide-in-from-bottom-4 duration-500 ease-out">
                    <DevStudio 
                        initialState={devStudioData}
                        onNavigate={handleNavigate}
                    />
                </div>
            )}
            {currentView === ViewMode.ARTICLE_INFOGRAPHIC && (
                <div className="animate-in fade-in-30 slide-in-from-bottom-4 duration-500 ease-out">
                    <ArticleToInfographic 
                        history={articleHistory} 
                        onAddToHistory={handleAddArticleHistory}
                    />
                </div>
            )}
            {currentView === ViewMode.CODE_GENERATOR && (
                <div className="animate-in fade-in-30 slide-in-from-bottom-4 duration-500 ease-out">
                    <CodeGenerator />
                </div>
            )}
            {currentView === ViewMode.AI_STUDIO && (
                <div className="animate-in fade-in-30 slide-in-from-bottom-4 duration-500 ease-out">
                    <AiStudio />
                </div>
            )}
        </div>
      </main>

      <footer className="py-6 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
          <p className="text-xs font-mono text-slate-600">
            <span className="text-violet-500/70">link</span>:<span className="text-emerald-500/70">ink</span>$ Powered by Nano Banana Pro
          </p>
          <div className="flex items-center gap-4">
             <Tooltip content="Learn how we process your links" position="top">
                <button className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors uppercase">
                    <Info className="w-3 h-3" /> System Specs
                </button>
             </Tooltip>
             <div className="w-px h-3 bg-white/5"></div>
             <p className="text-[10px] font-mono text-slate-700 uppercase">Ver 1.3.0-Beta</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
