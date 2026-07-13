export const ORDER_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const SHOE_SIZES = ["6", "7", "8", "9", "10", "11", "12", "13"];

export const DELIVERY_FEE = 150;
export const FREE_SHIPPING_MIN = 2000;
export const ESTIMATED_DELIVERY_DAYS = "3-5 business days";

export const SITE_NAME = "Shoesy";
export const SITE_DESCRIPTION = "Your premium shoe destination";
