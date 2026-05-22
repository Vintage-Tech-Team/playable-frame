import { create } from "zustand";

export type ToolCategory = "CALCULATOR" | "GLOBAL" | "CONVERTER";

export interface ToolMeta {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  tags: string[];
}

interface ToolsState {
  tools: ToolMeta[];
  search: string;
  categoryFilter: ToolCategory | "ALL";
  loading: boolean;
  error: string | null;
  setSearch: (s: string) => void;
  setCategoryFilter: (c: ToolCategory | "ALL") => void;
  fetchTools: () => Promise<void>;
}

export const useToolsStore = create<ToolsState>((set, get) => ({
  tools: [],
  search: "",
  categoryFilter: "ALL",
  loading: false,
  error: null,
  setSearch: (search) => set({ search }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  fetchTools: async () => {
    set({ loading: true, error: null });
    try {
      const { apiFetch } = await import("@/lib/api");
      const tools = await apiFetch<ToolMeta[]>("/utilities/tools");
      set({ tools, loading: false });
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : "Failed to load tools",
      });
    }
  },
  get filteredTools() {
    const { tools, search, categoryFilter } = get();
    return tools.filter((t) => {
      const matchCat =
        categoryFilter === "ALL" || t.category === categoryFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  },
}));
