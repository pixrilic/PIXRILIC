// src/components/Layout/Canvas.jsx
import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import ElementRenderer from '../Elements/ElementRenderer';
import { Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';

export default function Canvas() {
  const { pages, activePageId, previewMode, selectedElementId, setSelectedElementId, isEditMode, theme } = useBuilder();
  
  const currentPage = pages.find(p => p.id === activePageId) || { sections: [] };
  const { sections } = currentPage;

  // Compute Layout Width from responsive runtime
  const getWidthClass = () => {
    if (previewMode === 'mobile') return 'max-w-[375px] border-x border-white/10 my-4 rounded-3xl';
    if (previewMode === 'tablet') return 'max-w-[768px] border-x border-white/10 my-4 rounded-xl';
    return 'w-full';
  };

  return (
    <main className="flex-1 bg-slate-950 overflow-y-auto flex flex-col items-center p-6 transition-all duration-300">
      <div 
        style={{ fontFamily: theme.fontFamily }} 
        className={`w-full bg-slate-900/20 backdrop-blur-sm shadow-2xl transition-all duration-300 flex-1 ${getWidthClass()}`}
      >
        {sections.length === 0 ? (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-white/5 rounded-2xl m-4">
            <div className="p-4 rounded-full bg-white/5 text-slate-400 mb-3 animate-pulse">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-sm font-medium text-slate-300">Your layout workspace is completely bare.</p>
            <p className="text-xs text-slate-500 max-w-xs mt-1">Select structural layout nodes within the components drawer palette array deck to populate page canvas paths.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {sections.map((section, idx) => {
              const isSelected = selectedElementId === section.id;
              return (
                <div 
                  key={section.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditMode) setSelectedElementId(section.id);
                  }}
                  className={`relative group transition-all ${isEditMode ? 'hover:outline hover:outline-2 hover:outline-blue-500/40' : ''} ${isSelected && isEditMode ? 'outline outline-2 outline-blue-500' : ''}`}
                >
                  {/* Operations Element HUD Control Layer Overlay Bar */}
                  {isSelected && isEditMode && (
                    <div className="absolute top-2 right-2 z-30 flex items-center gap-1 bg-slate-900/90 border border-white/10 rounded-lg p-1 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100">
                      <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
                        <ArrowUp size={12} />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
                        <ArrowDown size={12} />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition">
                        <Copy size={12} />
                      </button>
                      <div className="w-[1px] h-3 bg-white/10 mx-1" />
                      <button className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400 transition">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                  
                  <div className={`p-8 relative ${!isEditMode ? 'pointer-events-none' : ''}`}>
                    <ElementRenderer section={section} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
