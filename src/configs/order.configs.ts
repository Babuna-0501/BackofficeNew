export const ORDER_COLUMNS = [
  { uid: 'orderNo', label: 'Захиалгын дугаар' },
  { uid: 'products', label: 'Захиалгын зураг' },
  { uid: 'orderedAt', label: 'Захиалсан өдөр' },
  { uid: 'deliveryDate', label: 'Хүргүүлэх өдөр' },
  { uid: 'status', label: 'Төлөв' },
  { uid: 'totalPrice', label: 'Нийт үнийн дүн' },
  { uid: 'paymentMethod', label: 'Төлбөрийн хэлбэр' },
  { uid: 'supplier.name', label: 'Нийлүүлэгч' },
  { uid: 'merchant.name', label: 'Харилцагчийн нэр' },
  { uid: 'merchant.phone', label: 'Харилцагчийн утасны дугаар' },
  { uid: 'merchant.category.name', label: 'Суваг' },
  { uid: 'merchant.city.name', label: 'Хот / Аймаг' },
  { uid: 'merchant.district.name', label: 'Дүүрэг / Сум' },
  { uid: 'merchant.subDistrict.name', label: 'Хороо / Баг' },
  { uid: 'merchant.address', label: 'Дэлгэрэнгүй хаяг' }
];

export const ORDER_PRODUCTS_COLUMNS = [
  { uid: 'images', label: 'Зураг' },
  { uid: 'name', label: 'Бүтээгдэхүүний нэр' },
  { uid: 'quantity', label: 'Тоо ширхэг' },
  { uid: 'basePrice', label: 'Yнэ' },
  { uid: 'totalBasePrice', label: 'Бүгд дүн' },
  { uid: 'discountPercent', label: 'Хөнгөлөлтийн хувь' },
  { uid: 'price', label: 'Хөнгөлөлттэй үнэ' },
  { uid: 'totalPrice', label: 'Хөнгөлөлттэй дүн' }
];

export const ORDER_LOGS_COLUMNS = [
  { uid: 'createdAt', label: 'Огноо' },
  { uid: 'action', label: 'Асtion' }
];

export const statusOrderMap: Record<string, string> = {
  created: 'Үүсгэсэн',
  pending: 'Хүлээгдэж буй',
  cancelled: 'Цуцалсан',
  confirmed: 'Баталгаажуулсан',
  delivered: 'Хүргэсэн',
  reordered: 'Дахин захиалсан',
  returned: 'Буцаагдсан'
};
