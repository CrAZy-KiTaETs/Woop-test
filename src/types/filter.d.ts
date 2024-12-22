export interface FilterSelectedInfo {
  year: string;
  category: string;
  name?: string;
  birthYear?: string;
}

export interface FilterCategories {
  name: string;
  value: "che" | "eco" | "lit" | "pea" | "phy" | "med";
}
