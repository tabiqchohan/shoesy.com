export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SHO-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateDeliveryFee(subtotal: number): number {
  const { FREE_SHIPPING_MIN, DELIVERY_FEE } = { FREE_SHIPPING_MIN: 2000, DELIVERY_FEE: 150 };
  return subtotal >= FREE_SHIPPING_MIN ? 0 : DELIVERY_FEE;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
