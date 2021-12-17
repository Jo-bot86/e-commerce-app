export interface Product {
  _id?: string;
  name: string;
  price: number;
  main_category: string;
  sub_category: string;
  info: string;
  thumbnails: Thumbnails;
  inStock: string;
  rating?: number;
  userId: string
}

interface Thumbnails {
  url: string[];
  description: string;
}
