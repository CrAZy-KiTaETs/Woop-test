export interface Place {
  city?: { en: string; no?: string; se?: string };
  country?: { en: string; no?: string; se?: string };
}

export interface BirthOrDeath {
  date: string;
  place: Place;
}

export interface Name {
  en: string;
  se?: string;
  no?: string;
}

export interface Link {
  url: string;
  description?: string;
}

export interface NobelPrize {
  awardYear: string;
  category: Name;
  categoryFullName?: Name;
  dateAwarded?: string;
  prizeAmount: number;
  prizeAmountAdjusted?: number;
  laureates?: { id: string; motivation: Name; knownName?: Name }[];
  links?: Link[];
}

export interface Wikidata {
  id: string;
  url: string;
}

export interface Wikipedia {
  slug: string;
  english: string;
}

export interface NobelLaureate {
  id: string;
  fullName: Name;
  knownName: Name;
  givenName: Name;
  familyName: Name;
  gender: string;
  fileName: string;
  birth?: BirthOrDeath;
  death?: BirthOrDeath;
  links?: Link[];
  nobelPrizes: NobelPrize[];
  sameAs: string[];
  wikidata: Wikidata;
  wikipedia: Wikipedia;
}
