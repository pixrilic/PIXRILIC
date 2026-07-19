// src/components/Layout/LeftSidebar.jsx
import React from 'react';
import { Heading, Type, Image, Columns, Frame, CreditCard, Layers, HelpCircle } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';

const COMPONENT_PALETTE = [
  { type: 'heading', label: 'Heading Accent', icon: Heading, desc: 'SEO semantic structure' },
  { type: 'text', label: 'Body Paragraph', icon: Type, desc: 'Rich content context text' },
  { type: 'hero', label: 'Hero Banner', icon: Frame, desc: 'High conversion header unit' },
  { type: 'gallery', label: 'Image Grid Showcase', icon: Image, desc: 'Fluid masonry responsive grid' },
  { type: 'cards', label: 'Feature Matrix Cards', icon: CreditCard, desc: 'Value-prop information grid' },
  { type: 'columns', label: 'Multi-Column Grid', icon: Columns, desc: 'Side-by-side node layouts' },
  { type: 'faq', label: 'Accordion FAQ Unit', icon: HelpCircle, desc: 'Interactive disclosure lists' }
];

export default function LeftSidebar() {
  const { updateSections, isEditMode } = useBuilder();

  if (!isEditMode) return null;

  const insertNewSection = (type) => {
    updateSections((prev) => [
      ...prev,
      {
        id: `section_${Date.now()}`,
        type,
        props: {
          heading: 'Unconfigured Section Header',
          content: 'Click this node block element to populate properties configuration within the right side parameters layout control pane.',
          items: [
            { id: 1, title: 'Modular Property Alpha', text: 'Dynamic child asset metadata.' },
            { id: 2, title: 'Modular Property Beta', text: 'Dynamic child asset metadata.' }
          ]
        }
      }
    ]);
  };

  return (
    <aside className="w-72 border-r border-white/10 bg-slate-900/40 backdrop-blur-md p-4 flex flex-col gap-4 overflow-y-auto">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Structural Blocks</h2>
        <p className="text-[11px] text-slate-500">Click to append core sections onto your active view canvas workspace path down below.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {COMPONENT_PALETTE.map((comp) => {
          const IconComp = comp.icon;
          return (
            <button
              key={comp.type}
              onClick={() => insertNewSection(comp.type)}
              className="group text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-start gap-3 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-950/50 transition">
                <IconComp size={16} />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-200 group-hover:text-white">{comp.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{comp.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
