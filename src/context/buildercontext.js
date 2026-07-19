// src/context/BuilderContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase/config';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const BuilderContext = createContext();

export const BuilderProvider = ({ children, siteId }) => {
  const [pages, setPages] = useState([{ id: 'home', title: 'Home', sections: [] }]);
  const [activePageId, setActivePageId] = useState('home');
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [isEditMode, setIsEditMode] = useState(true);
  const [themeMode, setThemeMode] = useState('light'); // light, dark
  
  // Global Styling System
  const [theme, setTheme] = useState({
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderRadius: '12px',
    spacing: '24px'
  });

  // History Trackers
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load Realtime Data from Firestore
  useEffect(() => {
    if (!siteId) return;
    const docRef = doc(db, 'sites', siteId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPages(data.pages || []);
        setTheme(data.theme || {});
      }
    });
    return () => unsubscribe();
  }, [siteId]);

  // Deep Snapshot Saver for Undo/Redo Engine
  const pushToHistory = useCallback((newPages) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    setHistory([...nextHistory, JSON.stringify(newPages)]);
    setHistoryIndex(nextHistory.length);
  }, [history, historyIndex]);

  const updateSections = (updater) => {
    const updatedPages = pages.map((page) => {
      if (page.id === activePageId) {
        const nextSections = typeof updater === 'function' ? updater(page.sections) : updater;
        return { ...page, sections: nextSections };
      }
      return page;
    });
    setPages(updatedPages);
    pushToHistory(updatedPages);
    
    // Auto-Save implementation
    if (auth.currentUser && siteId) {
      setDoc(doc(db, 'sites', siteId), { pages: updatedPages, theme }, { merge: true });
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setPages(JSON.parse(history[prevIndex]));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setPages(JSON.parse(history[nextIndex]));
    }
  };

  return (
    <BuilderContext.Provider value={{
      pages, updateSections, activePageId, setActivePageId,
      selectedElementId, setSelectedElementId, previewMode, setPreviewMode,
      isEditMode, setIsEditMode, theme, setTheme, undo, redo,
      canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1,
      themeMode, setThemeMode
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);
