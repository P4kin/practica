<script setup lang="ts">
import { useCart, type CartItem } from '~/composables/useCart';
import { computed } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();

const isCartEmpty = computed(() => cart.value.items.length === 0);

const handleQuantityChange = async (item: CartItem, event: Event) => {
  const target = event.target as HTMLInputElement;
  let newQuantity = parseInt(target.value);
  if (isNaN(newQuantity) || newQuantity < 0) {
    newQuantity = 0; 
  }
  await updateCartItemQuantity(item.id, newQuantity);
  if (newQuantity === 0) {
  }
};

const handleRemoveItem = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
    await removeFromCart(id);
  }
};

const handleClearCart = async () => {
  if (confirm('Вы уверены, что хотите полностью очистить корзину?')) {
    await clearCart();
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none">&times;</button>

      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Ваша Корзина</h2>

      <div v-if="isCartEmpty" class="text-center text-gray-600 text-lg py-10">
        Корзина пуста.
      </div>

      <div v-else>
        <ul class="space-y-4 mb-6">
          <li v-for="item in cart.items" :key="item.id" class="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
            <img :src="item.thumbnail" :alt="item.title" class="w-20 h-20 object-cover rounded mr-4 flex-shrink-0">
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
              <p class="text-gray-600">Цена: ${{ item.price.toFixed(2) }}</p>
              <div class="flex items-center mt-2">
                <label for="quantity-{{ item.id }}" class="sr-only">Количество</label>
                <input
                  type="number"
                  :id="'quantity-' + item.id"
                  v-model.number="item.quantity"
                  @change="handleQuantityChange(item, $event)"
                  min="0"
                  class="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <button @click="handleRemoveItem(item.id)" class="ml-4 bg-red-500 text-white py-1.5 px-3 rounded-md transition-colors duration-300 hover:bg-red-600">
                  Удалить
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div class="text-right text-2xl font-bold text-gray-900 border-t pt-4 mt-4">
          Всего: ${{ cart.totalAmount.toFixed(2) }}
        </div>

        <div class="flex justify-between mt-6">
          <button @click="handleClearCart" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-300 hover:bg-gray-300" :disabled="isCartEmpty">
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>