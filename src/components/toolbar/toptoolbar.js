import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ArrowUturnLeftIcon, ArrowUturnRightIcon, MonitorIcon, TabletIcon, SmartphoneIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function TopToolbar() {
  const { canUndo, canRedo, undo, redo, settings, setSettings } = useBuilder();

  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">G</div>
        <span className="font-semibold tracking-wide text-sm hidden sm:inline">EngineSites Studio</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-950/40 p-1 border border-slate-800 rounded-lg">
        <button onClick={() => setSettings({ ...settings, viewMode: 'desktop' })} className={`p-2 rounded ${settings.viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`} title="Desktop View"><MonitorIcon className="w-4 h-4" /></button>
        <button onClick={() => setSettings({ ...settings, viewMode: 'tablet' })} className={`p-2 rounded ${settings.viewMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`} title="Tablet View"><TabletIcon className="w-4 h-4" /></button>
        <button onClick={() => setSettings({ ...settings, viewMode: 'mobile' })} className={`p-2 rounded ${settings.viewMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`} title="Mobile View"><SmartphoneIcon className="w-4 h-4" /></button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-3">
          <button onClick={undo} disabled={!canUndo} className="p-2 text-slate-400 hover:text-slate-200 disabled:opacity-30"><ArrowUturnLeftIcon className="w-4 h-4" /></button>
          <button onClick={redo} disabled={!canRedo} className="p-2 text-slate-400 hover:text-slate-200 disabled:opacity-30"><ArrowUturnRightIcon className="w-4 h-4" /></button>
        </div>
        <button className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg text-white shadow-lg transition-all flex items-center gap-1.5">
          <CloudArrowUpIcon className="w-3.5 h-3.5" /> Publish
        </button>
      </div>
    </div>
  );
}
