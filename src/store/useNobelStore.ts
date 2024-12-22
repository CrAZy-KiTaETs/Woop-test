import { create } from "zustand";
import { NobelPrize } from "@/types/prizes";
import { fetchAwards } from "../api/nobelApi";

interface NobelStoreState {
  awards: NobelPrize[];
  offset: String;
  loading: boolean;
  year: string;
  category: string;
  maxItems: number,
  changePage: (page: string) => void;
  loadAwards: ({
    year,
    category,
    offset,
  }: {
    year?: string;
    category?: string;
    offset: string;
  }) => Promise<void>;
}

export const useNobelStore = create<NobelStoreState>((set, get) => ({
  awards: [],
  loading: false,
  offset: "0",
  year: "",
  category: "",
  maxItems: 0,

  changePage: async (page) => {
    const { year, category, loadAwards } = get();
    set({ offset: page });
    await loadAwards({ year, category, offset: page }); // Загружаем данные с новой страницей
  },
  
  loadAwards: async ({ year, category, offset }) => {
    set({ loading: true, year, category });
    try {
      const validYear = year || "";
      const validCategory = category || "";
      const response = await fetchAwards(validYear, validCategory, offset);
      set({ awards: response.nobelPrizes, loading: false, maxItems: response.meta.count });
    } catch (err) {
      set({ loading: false });
    }
  },
}));
