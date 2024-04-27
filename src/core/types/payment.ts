import { DateArray } from './common.ts';

export type Payment = {
  detail: string;
  membershipType: string;
  price: number;
};

export type OrderItem = {
  discountedPrice: number;
  discountingPrice: number;
  itemCode: string;
  name: string;
  orderItemId: number;
  totalPrice: number;
};

export type OrderHistory = {
  createdAt: DateArray;
  orderId: string;
  orderItems: OrderItem[];
  orderName: string;
};
