
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number | string;
  slug?: string;
  name: string;
  nameBn?: string;
  category?: string;
  categoryNameBn?: string;
  price: number;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  unit?: string;
  change?: number;
  changePercent?: number;
  changeDirection?: "up" | "down" | "flat";
  emoji?: string;
  image?: string;
  description?: string;
  markets?: Market[];
}

export interface Category {
  id: string | number;
  name: string;
  nameBn?: string;
  slug?: string;
  icon?: string;
}
