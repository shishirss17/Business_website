export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: 'Bear' | 'Bunny' | 'Magical' | 'Dinosaur' | 'Animal';
  brand: string;
  materials: string;
  care: string;
  ageRange: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
