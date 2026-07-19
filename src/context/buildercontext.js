import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from '../hooks/useHistory';

const BuilderContext = createContext(null);

const defaultProject = {
  projectId: "project_01",
  settings: { name: "Untitled Site", viewMode: "desktop" },
  theme: { primaryColor: "#3b82f6", borderRadius: "8px", font: "font-sans" },
  layout: [
    { id: "sec_hero", type: "Hero Banner", props: { heading: "Welcome to My Site", subheading: "Click to start editing this beautiful workspace." } }
  ]
};

export const BuilderProvider = ({ children }) => {
  const { state: layout, set: setLayout, undo, redo, canUndo, canRedo } = useHistory(defaultProject.layout);
  const [theme, setTheme] = useState(defaultProject.theme);
  const [settings, setSettings] = useState(defaultProject.settings);
  const [selectedId, setSelectedId] = useState(null);

  // Auto-Save Mocking Pipeline
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      console.log("Auto-saving active layout snapshot directly to cloud storage engine...");
    }, 1500);
    return () => clearTimeout(delayDebounce);
  }, [layout, theme, settings]);

  const addSection = (type) => {
    const newSection = {
      id: `sec_${Date.now()}`,
      type,
      props: type === "Text" ? { text: "Editable paragraph structure goes here." } :
             type === "FAQ" ? { question: "Frequently Asked Question?", answer: "The answer shows up down here seamlessly." } :
             { heading: "Custom Header Banner", text: "Editable body layout description text blocks." }
    };
    setLayout([...layout, newSection]);
    setSelectedId(newSection.id);
  };

  const updateSectionProps = (id, newProps) => {
    setLayout(layout.map(sec => sec.id === id ? { ...sec, props: { ...sec.props, ...newProps } } : sec));
  };

  const deleteSection = (id) => {
    setLayout(layout.filter(sec => sec.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const moveSection = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= layout.length) return;
    const updated = [...layout];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setLayout(updated);
  };

  return (
    <BuilderContext.Provider value={{
      layout, setLayout, undo, redo, canUndo, canRedo,
      theme, setTheme, settings, setSettings, selectedId, setSelectedId,
      addSection, updateSectionProps, deleteSection, moveSection
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);
