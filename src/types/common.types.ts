import { BrandType, CategoryType, FeaturedType, MerchantType, OrderLogType, OrderType, ProductType, SupplierType } from '@/types';

export type ParamsType = Promise<{ id: string }>;

export type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

export type SearchParamsFilterType = {
  [key: string]: string | string[] | number | undefined;
};

export type FieldErrorType = { message: string; field?: string };

export type ApiResponseType<T> = {
  data: T;
  total: number;
  totalPage: number;
  currentPage: number;
  status: number;
  errors?: FieldErrorType[];
};

export type FileType = {
  file: string;
  type: number | null;
  id?: string;
  name?: string;
};

export type BankAccountType = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export type SubDistrictType = {
  id: string;
  parentId: string;
  name: string;
  lat: number;
  long: number;
};

export type DistrictType = {
  id: string;
  parentId: string;
  name: string;
  lat: number;
  long: number;
  subDistricts: SubDistrictType[];
};

export type CityType = { id: string; name: string; lat: number; long: number; districts: DistrictType[] };

export type TableItemType =
  | ProductType
  | OrderType
  | MerchantType
  | BrandType
  | CategoryType
  | OrderLogType
  | SupplierType
  | FeaturedType;

export type TableColumnType = {
  uid: string;
  label: string;
};

export type TableSelection = 'all' | Set<React.Key>;

export type FormFieldType = {
  name: string;
  type?: string;
  label?: string;
  fieldType?: string;
  isRequired?: boolean;
  placeholder?: string;
  errorMessage?: string;
  defaultValue?: string;
};
