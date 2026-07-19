import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { DocumentTextIcon, QuestionMarkCircleIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

const MODULES = [
  { type: 'Hero Banner', icon: RectangleStackIcon, label: 'Hero Section' },
  { type: 'Text', icon: DocumentTextIcon, label: 'Text Layout' },
  { type: 'FAQ', icon: QuestionMarkCircleIcon, label: 'FAQ Accordion' }
];

export default function LeftSidebar() {
  const { addSection } = useBuilder();

  return (
    <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-4 select-none">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Modules</h3>
        <div className="grid grid-cols-1 gap-2">
          {MODULES.map(mod => {
            const Icon = mod.icon;
            return (
              <button key={mod.type} onClick={() => addSection(mod.type)} className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/20 hover:bg-slate-950/50 transition-all text-left group">
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-medium text-slate-300">{mod.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
