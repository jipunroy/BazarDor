export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  change: number;
  emoji: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}