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
  await useStorage().setItem<CartItem[]>("cart", []);
  return {
    items: [],
    totalAmount: 0,
  };
});