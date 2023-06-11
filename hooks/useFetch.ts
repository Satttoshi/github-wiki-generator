import { create } from "zustand";

interface APIState {
  data: any;
  error: Error | null;
  isLoading: boolean;
}

interface State {
  wikiEntry: APIState;
  updateWiki: APIState;
  fetch: (route: keyof State, params: any) => Promise<void>;
  alterWikiEntry: (data: string | undefined) => void;
}

export const useFetch = create<State>((set) => ({
  wikiEntry: {
    data: null,
    error: null,
    isLoading: false,
  },
  updateWiki: {
    data: null,
    error: null,
    isLoading: false,
  },
  fetch: async (route, params) => {
    set((state) => ({
      [route]: { ...state[route], isLoading: true, error: null },
    }));

    try {
      const response = await fetch(`/api/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (response.ok) {
        set((state) => ({
          [route]: { ...state[route], data, isLoading: false },
        }));
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      set((state) => ({
        [route]: { ...state[route], error, isLoading: false },
      }));
    }
  },
  alterWikiEntry: (newMarkdown) => {
    set((state) => ({
      wikiEntry: { ...state.wikiEntry, data: { result: newMarkdown } },
    }));
  },
}));
