import { BrandType, CategoryType, SupplierType } from '@/types';

export type AttributeType = {
  id: string;
  name: string;
  slug: string;
  key: string;
  value: number;
};

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  barCode: string;
  sku: string;
  customerId: string;
  categoryIds: string[];
  prices: string[];
  images: string[];
  inCase: number;
  price: number;
  cost: number;
  isActive: boolean;
  isAlcohol: boolean;
  cityTax: boolean;
  priority: number;
  attributes: AttributeType[];
  createdAt: Date | string;
  updatedAt: Date | string;
  inventoryId: string;
  splitSale: boolean;
  inventory: {
    totalStock: number;
    reservedStock: number;
    availableStock: number;
    id: string;
  };
  brand: BrandType;
  categories: CategoryType[];
  customer: SupplierType;
  description: string;
};
