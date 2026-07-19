import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function CanvasArea() {
  const { layout, settings, selectedId, setSelectedId, deleteSection, moveSection, theme } = useBuilder();

  const widthClasses = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex justify-center items-start canvas-scroll">
      <div className={`bg-slate-900 border border-slate-800 min-h-[70vh] rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${widthClasses[settings.viewMode]}`}>
        
        {layout.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <p className="text-sm">Empty Workspace Layout Canvas</p>
            <p className="text-xs text-slate-600">Click library elements on the left side configuration dock to append modules.</p>
          </div>
        ) : (
          layout.map((sec, idx) => {
            const isSelected = sec.id === selectedId;
            return (
              <div key={sec.id} onClick={(e) => { e.stopPropagation(); setSelectedId(sec.id); }} className={`relative group border-b border-slate-800/40 transition-all ${isSelected ? 'ring-2 ring-blue-500/80 bg-slate-900' : 'hover:bg-slate-800/10'}`}>
                
                {/* Element Control Handles Overlay */}
                <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex gap-1 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-md p-1 shadow-md">
                  <button onClick={(e) => { e.stopPropagation(); moveSection(idx, -1); }} className="p-1 text-slate-400 hover:text-white"><ArrowUpIcon className="w-3.5 h-3.5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveSection(idx, 1); }} className="p-1 text-slate-400 hover:text-white"><ArrowDownIcon className="w-3.5 h-3.5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteSection(sec.id); }} className="p-1 text-red-400 hover:text-red-300"><TrashIcon className="w-3.5 h-3.5" /></button>
                </div>

                {/* Dynamic Element Layout Templates Module Switcher */}
                <div className="p-8">
                  {sec.type === "Hero Banner" && (
                    <div className="py-12 text-center">
                      <h1 className="text-4xl font-black tracking-tight mb-3 text-white" style={{ fontFamily: theme.font }}>{sec.props.heading || 'Empty Value'}</h1>
                      <p className="text-sm text-slate-400 max-w-2xl mx-auto">{sec.props.subheading || 'Empty Description context.'}</p>
                      <button className="mt-6 px-6 py-2 text-xs font-semibold rounded-lg text-white shadow transition-transform transform active:scale-95" style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}>Interact CTA Action</button>
                    </div>
                  )}

                  {sec.type === "Text" && (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm leading-relaxed text-slate-300">{sec.props.text || 'Empty Text Block context.'}</p>
                    </div>
                  )}

                  {sec.type === "FAQ" && (
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                        {sec.props.question || 'Placeholder configuration text question value?'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 pl-3 border-l border-slate-800">{sec.props.answer || 'Placeholder explanation text.'}</p>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}
