import { defineEventHandler, readBody } from "#imports";
import type { H3Event } from 'h3';
import { createError } from 'h3';

interface RemoveItemPayload {
  id: number;
}

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

export default defineEventHandler(async (event: H3Event): Promise<CartResponse> => {
  let cart: CartItem[] = await useStorage().getItem<CartItem[]>("cart") ?? [];
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const payload = await readBody<RemoveItemPayload>(event);

  if (!payload || typeof payload.id !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'Некорректные данные для удаления товара.' });
  }

  const initialLength = cart.length;
  const newCart = cart.filter(item => item.id !== payload.id);

  if (newCart.length === initialLength) {
    throw createError({ statusCode: 404, statusMessage: 'Товар с указанным ID не найден в корзине.' });
  }

  await useStorage().setItem<CartItem[]>("cart", newCart);

  const totalAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: newCart,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
});