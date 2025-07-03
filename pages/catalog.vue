<script setup lang="ts">
import { useFetch } from '#app'
import { computed, ref, onMounted } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCart } from '~/composables/useCart';
import Cart from '~/components/Cart.vue';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface DummyApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const apiUrl = 'https://dummyjson.com/products?limit=30';
const { data: rawData, pending, error } = await useFetch<DummyApiResponse>(apiUrl);

const products = computed<Product[] | null>(() => {
  if (rawData.value && rawData.value.products) {
    return rawData.value.products;
  }
  return null;
});

if (error.value) {
  console.error('Ошибка при загрузке продуктов:', error.value);
}

const { cart, fetchCart, addToCart } = useCart();

const isCartModalOpen = ref(false);

const openCartModal = () => {
  isCartModalOpen.value = true;
};

const closeCartModal = () => {
  isCartModalOpen.value = false;
};

const handleAddToCart = async (product: Product) => {
  const success = await addToCart(product);
  if (success) {
  } else {
    alert('Не удалось добавить товар в корзину.');
  }
};

const getProductInCart = (productId: number) => {
  return cart.value.items.find(item => item.id === productId);
};

onMounted(() => {
  fetchCart();
});

if (error.value) {
  console.error('Ошибка при загрузке продуктов:', error.value);
}
</script>

<template>
    <header class="bg-accent py-4">   
    <div
      class="container mx-auto flex flex-row justify-start text-background"
    >
    <NuxtLink to="/" class="flex items-center text-background text-lg font-bold hover:text-gray-300 mr-4">
            <span class="text-3xl leading-none">&larr; Назад</span>
        </NuxtLink> 
      <img src="/images/logo.svg" alt="Логотип" class="h-12 mx-12 basis-1/4" />
       <div class="ml-auto text-lg font-bold text-gray-700 flex items-center">
          <button @click="openCartModal" class="bg-accent text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-muted-foreground">
            Корзина ({{ cart.items.length }})
          </button>
        </div>
    </div>
  </header>
 <main class="flex-grow px-5px text-center max-w-screen-xl mx-auto w-full">
      <div v-if="pending" class="p-5 text-xl">Загружаем товары...</div>
      <div v-else-if="error" class="p-5 text-xl font-bold">
        Ошибка при загрузке товаров: {{ error.message }}
      </div>
      <div v-else-if="products && products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        <div v-for="product in products" :key="product.id">
            <Card class="border-2 border-accent rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle class="text-center">{{ product.title }}</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col aspect-square items-center justify-center">
              <img :src="product.thumbnail" :alt="product.title" class="max-w-full h-[150px] object-cover rounded mb-4">
              <p class="text-xs text-gray-500 mb-1.5">Категория: {{ product.category }}</p>
              <p class="text-l mb-1.5">Цена: ${{ product.price }}</p>
               <button
            @click="handleAddToCart(product)"
            :class="{
              'mt-4 py-2 px-4 rounded-md font-bold transition-colors duration-300': true,
              'bg-accent text-white hover:bg-muted-foreground': !getProductInCart(product.id),
              'bg-muted-foreground text-white': getProductInCart(product.id) 
            }"
          >
            <span v-if="getProductInCart(product.id)">
             ({{ getProductInCart(product.id)?.quantity }} шт.) Добавить ещё 
            </span>
            <span v-else>
              Добавить в корзину
            </span>
          </button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div v-else class="no-products-message">
        Извините, товары пока отсутствуют.
      </div>
    </main>
    <ClientOnly>
      <Cart :is-open="isCartModalOpen" @close="closeCartModal" />
    </ClientOnly>
</template>