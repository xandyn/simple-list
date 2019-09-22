export interface Product {
  id: number;
  price: string;
  currency: string;
  name: string;
  description: string;
  color: string;
  company: string;
}

export type ProductDraft = Omit<Product, 'id'>;
