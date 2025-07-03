import { defineEventHandler, readBody } from "#imports";
import type { H3Event } from 'h3';
import { createError } from 'h3';

interface UpdateItemPayload {
  id: number;
  quantity: number;
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

  const payload = await readBody<UpdateItemPayload>(event);

  if (!payload || typeof payload.id !== 'number' || typeof payload.quantity !== 'number' || payload.quantity < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Некорректные данные для обновления количества.' });
  }

  const itemIndex = cart.findIndex(e => e.id === payload.id);

  if (itemIndex > -1) {
    if (payload.quantity === 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = payload.quantity;
    }
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Товар не найден в корзине.' });
  }

  await useStorage().setItem<CartItem[]>("cart", cart);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: cart,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
});