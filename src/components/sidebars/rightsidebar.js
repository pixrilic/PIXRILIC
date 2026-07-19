import React from 'react';
import { useBuilder } from '../../context/BuilderContext';

export default function RightSidebar() {
  const { layout, selectedId, updateSectionProps, theme, setTheme } = useBuilder();
  const selectedSection = layout.find(s => s.id === selectedId);

  return (
    <div className="w-72 border-l border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Visual Customization</h3>
        <label className="text-[11px] text-slate-400 block mb-1.5">Brand Primary Color</label>
        <div className="flex gap-2">
          {['#3b82f6', '#10b981', '#a855f7'].map(color => (
            <button key={color} onClick={() => setTheme({ ...theme, primaryColor: color })} className={`w-6 h-6 rounded-full border-2 ${theme.primaryColor === color ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {selectedSection ? (
        <div className="flex flex-col gap-4 border-t border-slate-800 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inspector Properties</h3>
          
          {selectedSection.type === "Hero Banner" && (
            <>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Header Value</label>
                <input type="text" className="w-full glass-input" value={selectedSection.props.heading || ''} onChange={(e) => updateSectionProps(selectedId, { heading: e.target.value })} />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Subheading Description</label>
                <textarea rows={3} className="w-full glass-input resize-none" value={selectedSection.props.subheading || ''} onChange={(e) => updateSectionProps(selectedId, { subheading: e.target.value })} />
              </div>
            </>
          )}

          {selectedSection.type === "Text" && (
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Markdown Body Text</label>
              <textarea rows={4} className="w-full glass-input resize-none" value={selectedSection.props.text || ''} onChange={(e) => updateSectionProps(selectedId, { text: e.target.value })} />
            </div>
          )}

          {selectedSection.type === "FAQ" && (
            <>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Inquiry Question</label>
                <input type="text" className="w-full glass-input" value={selectedSection.props.question || ''} onChange={(e) => updateSectionProps(selectedId, { question: e.target.value })} />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Inquiry Resolution</label>
                <textarea rows={3} className="w-full glass-input resize-none" value={selectedSection.props.answer || ''} onChange={(e) => updateSectionProps(selectedId, { answer: e.target.value })} />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
          Select a dynamic canvas element blocks module to view variable inspector controls.
        </div>
      )}
    </div>
  );
}
