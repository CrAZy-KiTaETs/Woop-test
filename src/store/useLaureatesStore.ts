import { create } from "zustand";
import { NobelLaureate } from "../types/loureates";
import { fetchLaureates } from "../api/nobelApi";

interface LaureateType {
  laureate: NobelLaureate[];
  offset: string;
  loading: boolean;
  category: string;
  birthDate: string;
  maxLaureateItems: number;
  name: string;
  changeLaureatePage: (page: string) => void;

  loadLaureates: (params: {
    name?: string;
    birthDate?: string;
    category?: string;
    offset?: string;
  }) => Promise<void>;
}

export const useLaureatesStore = create<LaureateType>((set, get) => ({
  laureate: [],
  loading: false,
  offset: "0",
  birthDate: "",
  category: "",
  name: "",
  maxLaureateItems: 0,

  changeLaureatePage: async (page) => {
    const { name, category, loadLaureates, birthDate } = get();
    set({ offset: page });
    await loadLaureates({ birthDate, name, category, offset: page }); // Загружаем данные с новой страницей
  },

  loadLaureates: async ({ name = "", birthDate = "", category = "", offset = "" }) => {
    set({ loading: true, birthDate, category, name });
    try {
      const response = await fetchLaureates(name, birthDate, category, offset);
      set({
        laureate: response.laureates,
        loading: false,
        maxLaureateItems: response.meta.count,
      });
    } catch (err) {
      set({ loading: false });
      console.error("Error loading laureates:", err);
    }
  },
}));
