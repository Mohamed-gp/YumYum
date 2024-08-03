interface Product {
  _id: string;
  name: string;
  price: number;
  promoPercentage: number;
  category: Category;
  description: string;
  image: string;
  comments: object[];
}

interface Category {
  name: string;
  _id: string;
}

export type { Product };
