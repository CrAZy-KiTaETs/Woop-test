export interface NobelPrizeCategory {
  en: string;
  no: string;
  se: string;
}

export interface Laureate {
  id: string;
  fullName: {
    en: string;
  };
  knownName: {
    en: string;
  };
  orgName: {
    en: string;
  };
  links: {
    url: string;
    title: string;
  }[];
  motivation: {
    en: string;
    se?: string; // Шведский текст, опционально
  };
  portion: string;
  sortOrder: string;
}

export interface Link {
  url: string;
  title: string;
}

export interface NobelPrize {
  awardYear: string;
  category: NobelPrizeCategory;
  categoryFullName: NobelPrizeCategory;
  dateAwarded: string;
  laureates: Laureate[];
  links: Link[];
  prizeAmount: number;
  prizeAmountAdjusted: number;
  topMotivation?: {en?: string}
}
