import { ref } from 'vue';
import { useFetch } from '#app'; 

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
}

const cart = ref<CartResponse>({ items: [], totalAmount: 0 }); 

export const useCart = () => {
  const fetchCart = async () => {
    try {
      const response = await $fetch<CartResponse>('/api/cart');
      cart.value = response;
    } catch (err: any) {
      console.error('Ошибка при получении корзины:', err);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      const updatedCart = await $fetch<CartResponse>('/api/cart/add', {
        method: 'POST',
        body: {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },
      });
      cart.value = updatedCart;
      return true;
    } catch (err: any) {
      console.error('Ошибка при добавлении в корзину:', err);
      return false;
    }
  };

  const updateCartItemQuantity = async (id: number, quantity: number) => {
    try {
      const updatedCart = await $fetch<CartResponse>('/api/cart/update', {
        method: 'POST',
        body: { id, quantity },
      });
      cart.value = updatedCart;
      return true;
    } catch (err: any) {
      console.error('Ошибка при обновлении количества:', err);
      return false;
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const updatedCart = await $fetch<CartResponse>('/api/cart/remove', {
        method: 'POST', 
        body: { id },
      });
      cart.value = updatedCart;
      return true;
    } catch (err: any) {
      console.error('Ошибка при удалении товара:', err);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const clearedCart = await $fetch<CartResponse>('/api/cart/clear', {
        method: 'POST',
      });
      cart.value = clearedCart;
      return true;
    } catch (err: any) {
      console.error('Ошибка при очистке корзины:', err);
      return false;
    }
  };

  return {
    cart, 
    fetchCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  };
};