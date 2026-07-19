import React from 'react';
import { BuilderProvider } from './context/BuilderContext';
import TopToolbar from './components/Toolbar/TopToolbar';
import LeftSidebar from './components/Sidebars/LeftSidebar';
import RightSidebar from './components/Sidebars/RightSidebar';
import CanvasArea from './components/Canvas/CanvasArea';

function App() {
  return (
    <BuilderProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-900 text-slate-100">
        <TopToolbar />
        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar />
          <CanvasArea />
          <RightSidebar />
        </div>
      </div>
    </BuilderProvider>
  );
}

export default App;
