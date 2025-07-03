import { defineEventHandler } from "#imports";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  totalAmount: number;
}

export default defineEventHandler(async (): Promise<CartResponse> => {
  let cart: CartItem[] = await useStorage().getItem<CartItem[]>("cart") ?? [];

  if (!Array.isArray(cart)) {
    cart = [];
    await useStorage().setItem<CartItem[]>("cart", []);
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: cart,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
});