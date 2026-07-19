import { useState, useCallback } from 'react';

export const useHistory = (initialPresent) => {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const prev = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture([present, ...future]);
    setPresent(prev);
    setPast(newPast);
  }, [canUndo, past, present, future]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, future, present, past]);

  const set = useCallback((newPresent) => {
    if (JSON.stringify(newPresent) === JSON.stringify(present)) return;
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]); // Clear redo stack on new structural changes
  }, [past, present]);

  return { state: present, set, undo, redo, canUndo, canRedo };
};    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, future, present, past]);

  const set = useCallback((newPresent) => {
    if (JSON.stringify(newPresent) === JSON.stringify(present)) return;
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  }, [past, present]);

  return { state: present, set, undo, redo, canUndo, canRedo };
};
