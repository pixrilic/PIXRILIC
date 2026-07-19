// src/App.jsx
import React from 'react';
import { BuilderProvider } from './context/BuilderContext';
import TopToolbar from './components/Layout/TopToolbar';
import LeftSidebar from './components/Layout/LeftSidebar';
import RightSidebar from './components/Layout/RightSidebar';
import Canvas from './components/Layout/Canvas';

export default function App() {
  return (
    <BuilderProvider siteId="sample-site-id">
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 font-sans text-slate-200 antialiased selection:bg-blue-500/30">
        {/* Dynamic Abstract Decorative Lighting Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        <TopToolbar />
        
        <div className="flex-1 flex overflow-hidden relative z-10">
          <LeftSidebar />
          <Canvas />
          <RightSidebar />
        </div>
      </div>
    </BuilderProvider>
  );
}
