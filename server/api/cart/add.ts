import { defineEventHandler, readBody } from "#imports";
import type { H3Event } from 'h3';
import { createError } from 'h3';

interface ProductToAdd {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  
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

  const itemToAdd = await readBody<ProductToAdd>(event);

  if (!itemToAdd || typeof itemToAdd.id !== 'number' || !itemToAdd.title || typeof itemToAdd.price !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'Некорректные данные для добавления в корзину.' });
  }

  const existingItemIndex = cart.findIndex(e => e.id === itemToAdd.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity++;
  } else {
    cart.push({ ...itemToAdd, quantity: 1 });
  }

  await useStorage().setItem<CartItem[]>("cart", cart);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: cart,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
});
