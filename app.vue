<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);


const defaultValue = 'item-1'

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
]
</script>

<template>
   <header class="bg-accent py-4 px-4">
    <div class="container flex  flex-row items-center justify-between">
    <img src="/images/logo.svg" alt="Логотип" class="h-12 mx-12 basis-1/4"/>
    <nav class="basis-3/4">
    <ul class="flex flex-row mx-auto justify-between  space-x-8 text-background">
    <li><a href="#rules">Правила</a></li>
    <li><a href="#rewards">Призы</a></li>
    <li><a href="#map">Где и когда?</a></li>
    <li><a href="#about">Вопросы и ответы</a></li>
    </ul>
    </nav>
    </div>
  </header>

  <div class="relative">
    <img src="/images/Розыгрыш квадрика_для сайта_Главный баннер 1920 х 720 px.png"/>
    <div class="absolute top-1/4 left-1/12 text-accent-foreground" style="font-size: 5vw; line-height: 5vw; font-weight: bold;">
      В ОДНОМ ЧЕКЕ
      <br>
      ОТ МЕЧТЫ
    </div>
    <div class="absolute top-7/12 left-1/12 text-accent-foreground" style="font-size: large; line-height: normal;">
      Выигрывайте квадроцикл и другие призы за покупки
      <br>
      Huter, Ресанта, Вихрь на сумму от 3000₽
    </div>
    <div class="absolute bottom-1/8 left-1/12 text-accent-foreground" style="font-size: large; line-height: normal;">
      <button style="border-radius: 10px; border-color: #1e3c72 !important;" class="bg-muted-foreground hover:bg-accent w-64 h-16">Зарегистрировать чек</button>
      </div>
  </div>
  <div id="rules">
    <h2 class="text-accent text-3xl font-bold text-center py-4" >Как стать участником?</h2>
  </div>

  <div class="grid grid-cols-3 gap-12 mx-16" style="text-align: center;">
    <div style="position: relative;">
      <img src="/images/Розыгрыш квадрика_для сайта_Шурик 270 х 270 px.png" class="scale-75"/>
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder;">Покупайте</h5>
      <p class="text-muted-foreground">инструменты и технику Huter, Ресанта, Вихрь на сумму 3000₽ в мазинах и на сайте virage24.ru </p>
    </div>
    <div style="position: relative;">
      <img src="/images/Розыгрыш квадрика_для сайта_Чек 270 х 270 px.png" class="scale-75"/>
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder;">Регистрируйте</h5>
      <p class="text-muted-foreground">номера чеков или заказов</p>
      <button style="border-radius: 10px; border-color: #1e3c72 !important;" class="text-accent-foreground bg-muted-foreground hover:bg-accent w-45 h-16 my-4">Зарегистрировать чек</button>
    </div>
    <div style="position: relative;">
      <img src="/images/Розыгрыш квадрика_для сайта_Подарок 270 х 270 px.png" class="scale-75"/>
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder;">Выигрывайте</h5>
      <p class="text-muted-foreground">квадроцикл или подарочную карту на покупки в Вираже</p>
    </div>
  </div>
  <Accordion id="about" class="text-accent" type="single" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
