export type OrderStatus =
  | 'Creado'
  | 'En preparación'
  | 'En tránsito'
  | 'Entregado'
  | 'No entregado';

export interface Address {
  street: string;
  zone: string;
  municipality: string;
  department: string;
}

export interface OrderHistoryRecord {
  date: Date;
  state: OrderStatus;
  comment: string;
  responsible: string;
}

export interface Order {
  packageNumber: string;
  trackingId: string;
  senderName: string;
  address: Address;
  email: string;
  description: string;
  status: OrderStatus;
  lastUpdatedAt: Date;
  history: OrderHistoryRecord[];
}
