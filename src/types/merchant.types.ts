import { BankAccountType } from '@/types';

export type MerchantType = {
  customerNo: string;
  name: string;
  regNo: string;
  userId: string;
  address: string;
  phone: string;
  cityId: string;
  districtId: string;
  subDistrictId: string;
  type: string;
  businessName: string;
  inactive: boolean;
  businessStartDate: Date | string;
  tradeShops: {
    tsId: string;
    holdingKey: string;
    _id: string;
  }[];
  bankAccounts: BankAccountType[];
  createdAt: Date | string;
  updatedAt: Date | string;
  version: number;
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
  subDistrict: null;
  id: string;
};
