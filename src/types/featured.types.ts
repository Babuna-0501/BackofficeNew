export type FeaturedType = {
  supplierId: string;
  type: string;
  supplier: string;
  itemId: string;
  startAt: Date | string;
  endAt: Date | string;
  isActive: boolean;
  priority: number;
  isDeleted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  id: string;
  image?: string;
};
