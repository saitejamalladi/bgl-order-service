export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface PackagingOption {
  quantity: number;
  price: number;
}

export const productsConfig = {
  products: [
    { code: 'CE', name: 'Cheese', price: 5.95 },
    { code: 'HM', name: 'Ham', price: 7.95 },
    { code: 'SS', name: 'Soy Sauce', price: 11.95 },
  ] as Product[],

  packaging: {
    CE: [
      { quantity: 5, price: 20.95 },
      { quantity: 3, price: 14.95 },
    ],
    HM: [
      { quantity: 8, price: 40.95 },
      { quantity: 5, price: 29.95 },
      { quantity: 2, price: 13.95 },
    ],
    SS: [], // No packaging options - falls back to unit price
  } as Record<string, PackagingOption[]>,
};