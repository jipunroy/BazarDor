
export interface Product {
  id: number | string;
  name: string;
  category?: string;
  price: number;
  unit?: string;
  change?: number | string;
  changePercent?: number | string;
  emoji?: string;
  description?: string;
}

export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  icon?: string;
}