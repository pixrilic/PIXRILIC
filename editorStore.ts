import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EditorState, ComponentProps, PageData } from "../types";
interface EditorStore extends EditorState {
  // Project & Page actions
  setProjectId: (id: string) => void;
  setPageId: (id: string) => void;
  setCurrentPage: (page: PageData | null) => void;
  // Component actions
  addComponent: (component: ComponentProps) => void;
  updateComponent: (id: string, data: Partial<ComponentProps>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  reorderComponents: (components: ComponentProps[]) => void;
  duplicateComponent: (id: string) => void;
  // Editor state
  setDirty: (dirty: boolean) => void;
  setSaving: (saving: boolean) => void;
  setPublishing: (publishing: boolean) => void;
  setError: (error: string | null) => void;
  // Undo/Redo
  undo: () => void;
  redo: () => void;
}
interface HistoryState {
  past: ComponentProps[][];
  present: ComponentProps[];
  future: ComponentProps[][];
}
const createEditorStore = () => {
  let history: HistoryState = {
    past: [],
    present: [],
    future: [],
  };
  return create<EditorStore>()(
    devtools(
      (set, get) => ({
        projectId: "",
        pageId: "",
        currentPage: null,
        selectedComponentId: null,
        components: [],
        isDirty: false,
        isSaving: false,
        isPublishing: false,
        errorMessage: null,
        setProjectId: (id: string) => set({ projectId: id }),
        setPageId: (id: string) => set({ pageId: id }),
        setCurrentPage: (page: PageData | null) => {
          set({ currentPage: page });
          if (page) {
            history.present = page.components;
            history.past = [];
            history.future = [];
            set({ components: page.components });
          }
        },
        addComponent: (component: ComponentProps) => {
          set((state) => {
            const newComponents = [...state.components, component];
            history.past.push([...state.components]);
            history.present = newComponents;
            history.future = [];
            return {
              components: newComponents,
              isDirty: true,
            };
          });
        },
        updateComponent: (id: string, data: Partial<ComponentProps>) => {
          set((state) => {
            const newComponents = state.components.map((comp) =>
              comp.id === id ? { ...comp, ...data } : comp
            );
            history.past.push([...state.components]);
            history.present = newComponents;
            history.future = [];
            return {
              components: newComponents,
              isDirty: true,
            };
          });
        },
        deleteComponent: (id: string) => {
          set((state) => {
            const newComponents = state.components.filter((c) => c.id !== id);
            history.past.push([...state.components]);
            history.present = newComponents;
            history.future = [];
            return {
              components: newComponents,
              isDirty: true,
              selectedComponentId:
                state.selectedComponentId === id ? null : state.selectedComponentId,
            };
          });
        },
        selectComponent: (id: string | null) => set({ selectedComponentId: id }),
        reorderComponents: (components: ComponentProps[]) => {
          set((state) => {
            history.past.push([...state.components]);
            history.present = components;
            history.future = [];
            return {
              components,
              isDirty: true,
            };
          });
        },
        duplicateComponent: (id: string) => {
          set((state) => {
            const component = state.components.find((c) => c.id === id);
            if (!component) return state;
            const duplicated = {
              ...component,
              id: `${component.id}-copy-${Date.now()}`,
              name: `${component.name} (copy)`,
            };
            const newComponents = [...state.components, duplicated];
            history.past.push([...state.components]);
            history.present = newComponents;
            history.future = [];
            return {
              components: newComponents,
              isDirty: true,
            };
          });
        },
        undo: () => {
          if (history.past.length === 0) return;
          const previous = history.past.pop();
          if (!previous) return;
          history.future.unshift(history.present);
          history.present = previous;
          set({
            components: previous,
            isDirty: true,
          });
        },
        redo: () => {
          if (history.future.length === 0) return;
          const next = history.future.shift();
          if (!next) return;
          history.past.push(history.present);
          history.present = next;
          set({
            components: next,
            isDirty: true,
          });
        },
        setDirty: (dirty: boolean) => set({ isDirty: dirty }),
        setSaving: (saving: boolean) => set({ isSaving: saving }),
        setPublishing: (publishing: boolean) => set({ isPublishing: publishing }),
        setError: (error: string | null) => set({ errorMessage: error }),
      }),
      { name: "EditorStore" }
    )
  );
};
export const useEditorStore = createEditorStore();
