export interface CartItemType {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  size: string;
  color: string | null;
  quantity: number;
  stock: number;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  categoryId: string;
  category: { name: string; slug: string };
  featured: boolean;
  isNew: boolean;
  createdAt: Date;
  reviews: { rating: number }[];
}

export interface OrderType {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes: string | null;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode: string | null;
  status: string;
  estimatedDelivery: string | null;
  createdAt: Date;
  items: OrderItemType[];
  statusLogs: StatusLogType[];
}

export interface OrderItemType {
  id: string;
  productId: string;
  product: { name: string; slug: string; images: string[] };
  quantity: number;
  size: string;
  color: string | null;
  price: number;
}

export interface StatusLogType {
  id: string;
  status: string;
  note: string | null;
  createdAt: Date;
}
