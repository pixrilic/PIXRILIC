// src/components/Elements/ElementRenderer.jsx
import React from 'react';
import { useBuilder } from '../../context/BuilderContext';

export default function ElementRenderer({ section }) {
  const { theme } = useBuilder();
  const { type, props } = section;

  const globalStyles = {
    borderRadius: theme.borderRadius,
    color: theme.textColor
  };

  switch (type) {
    case 'heading':
      return (
        <h2 style={{ color: theme.primaryColor }} className="text-3xl font-extrabold tracking-tight">
          {props.heading || 'New Structural Heading Header'}
        </h2>
      );

    case 'text':
      return (
        <p className="text-sm leading-relaxed text-slate-300 max-w-prose">
          {props.content || 'Structured standard context description typography block element value nodes.'}
        </p>
      );

    case 'hero':
      return (
        <div style={{ borderRadius: globalStyles.borderRadius }} className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-white/10 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Featured Spotlight</span>
            <h1 className="text-4xl font-black text-white mt-2 mb-4 leading-tight">{props.heading || 'Elevate Creative Deliverables'}</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{props.content}</p>
            <button style={{ borderRadius: `calc(${globalStyles.borderRadius} / 1.5)` }} className="px-5 py-2.5 bg-blue-600 text-white font-medium text-xs hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition">
              Get Started
            </button>
          </div>
        </div>
      );

    case 'cards':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {props.items?.map((item) => (
            <div 
              key={item.id}
              style={{ borderRadius: globalStyles.borderRadius }}
              className="p-5 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition duration-200 shadow-md group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mb-3 group-hover:scale-110 transition-transform">
                0{item.id}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-normal">{item.text}</p>
            </div>
          ))}
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-2 max-w-2xl">
          {props.items?.map((item) => (
            <details 
              key={item.id}
              style={{ borderRadius: globalStyles.borderRadius }}
              className="group bg-white/5 border border-white/5 p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-1.5 text-slate-200 font-medium text-xs">
                <span>{item.title}</span>
                <span className="transition duration-300 group-open:-rotate-180 text-slate-400">▼</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-slate-400 border-t border-white/5 pt-3">
                {item.text || 'Context answer detail array documentation node data strings block.'}
              </p>
            </details>
          ))}
        </div>
      );

    default:
      return <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">Unknown component element schema reference match target definition.</div>;
  }
}
