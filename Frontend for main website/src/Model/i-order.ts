import { IOrderItem } from './i-order-item';

export interface IOrder {
  id: number;
  orderDate: Date;
  totalAmount: number;
  paymentStatus: string;
  trackingInformation: string;
  userId: number;
  orderItems: IOrderItem[];
  shippingId: number;
  paymentId: number;
}
