// src/components/Layout/TopToolbar.jsx
import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Undo2, Redo2, Eye, LayoutGrid, Monitor, Tablet, Smartphone, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function TopToolbar() {
  const { 
    undo, redo, canUndo, canRedo, previewMode, setPreviewMode, 
    isEditMode, setIsEditMode, themeMode, setThemeMode 
  } = useBuilder();

  return (
    <header className="h-14 border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 flex items-center justify-between relative z-20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
          <LayoutGrid size={18} />
        </div>
        <span className="font-semibold text-sm tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Pixrilic Engine
        </span>
      </div>

      {/* View Engine Settings */}
      <div className="flex items-center bg-black/30 border border-white/5 p-0.5 rounded-xl">
        <button 
          onClick={() => setPreviewMode('desktop')}
          className={`p-2 rounded-lg transition ${previewMode === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          <Monitor size={16} />
        </button>
        <button 
          onClick={() => setPreviewMode('tablet')}
          className={`p-2 rounded-lg transition ${previewMode === 'tablet' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          <Tablet size={16} />
        </button>
        <button 
          onClick={() => setPreviewMode('mobile')}
          className={`p-2 rounded-lg transition ${previewMode === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          <Smartphone size={16} />
        </button>
      </div>

      {/* Control Nodes */}
      <div className="flex items-center gap-2">
        <button onClick={undo} disabled={!canUndo} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition">
          <Undo2 size={16} />
        </button>
        <button onClick={redo} disabled={!canRedo} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition">
          <Redo2 size={16} />
        </button>
        <div className="h-4 w-[1px] bg-white/10 mx-1" />
        
        <button 
          onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button 
          onClick={() => setIsEditMode(!isEditMode)} 
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition"
        >
          <Eye size={14} />
          {isEditMode ? 'Preview' : 'Edit Mode'}
        </button>

        <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition">
          <ShieldCheck size={14} />
          Publish
        </button>
      </div>
    </header>
  );
}
