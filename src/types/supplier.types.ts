import { BankAccountType, FileType } from '@/types';

export type SupplierType = {
  name: string;
  parentId: string;
  regNo: string;
  branches: SupplierType[];
  email: string;
  address: string;
  phone: string;
  logo: string;
  type: string;
  orderMin: number;
  stockMin: number;
  deliveryDays: number[];
  createdAt: Date | string;
  updatedAt: Date | string;
  version: number;
  integration: {
    integrated: boolean;
  };
  bankAccounts: BankAccountType[];
  holdingKey: string;
  customerNo: string;
  banners: FileType[];
  infoBanner: string;
  productBanner: string;
  productQuery: {
    limit: number;
    page: number;
    brands: string;
  };
  brands: {
    url: string;
    id: string;
  }[];
  inactive: boolean;
  business: string;
  businessType: string;
  category: null;
  city: {
    name: string;
    lat: number | string;
    long: number | string;
    id: string;
  };
  district: {
    name: string;
    lat: number | string;
    long: number | string;
    parentId: string;
    id: string;
  };
  subDistrict: {
    name: string;
    lat: number | string;
    long: number | string;
    parentId: string;
    id: string;
  };
  id: string;
  termOfService: string;
  aboutCompany: string;
  cooperation: string;
};
