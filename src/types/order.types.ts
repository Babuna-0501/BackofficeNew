import { MerchantType, ProductType, SupplierType } from '@/types';

export type OrderLogType = {
  author: { id: string; name: string };
  orderId: string;
  type: string;
  action: string;
  fields: [];
  createdAt: string;
  updatedAt: string;
  version: number;
  id: string;
};

export type OrderType = {
  orderNo: string;
  status: string;
  supplierId: string;
  merchantId: string;
  userId: string;
  logs: OrderLogType[];
  products: ProductType[];
  giftProducts: [];
  orderedAt: Date | string;
  deliveryDate: Date | string;
  paymentMethod: string;
  merchant: MerchantType;
  supplier: SupplierType;
  user: { phoneNumber: string; id: string };
  id: string;
  totalPrice: number;
  totalBasePrice: number;
  totalDiscountAmount: number;
  discountPercent: number;
};
