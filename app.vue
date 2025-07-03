<script setup lang="tsx">
import { Image } from "lucide-vue-next";
import { ref } from "vue";

function scrollTo(id:string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  

const defaultValue = "item-1";

const accordionItems = [
  {
    value: "item-1",
    title: "В какой период можно принять участие в акции?",
    content:
      () => "Зарегистрировать чек можно с 1 июня 2024г. по 21 сентября 2024г. Розыгрыш призов пройдет 28 сентября на парковке магазина Вираж по адресу: ул.Северо-Енисейская, 40. Победитель должен присутствовать на розыгрыше и иметь при себе паспорт и чек, который был зарегистрирован.",
  },
  {
    value: "item-2",
    title: "Нужно ли присутствовать на розыгрыше?",
    content:
      () => "Для победы обязательно личное присутствие на мероприятии. Победитель должен иметь при себе паспорт и чек, который был зарегистрирован.",
  },
  {
    value: "item-3",
    title:
      "Можно ли зарегистрировать несколько чеков и выиграть несколько призов?",
    content:
      () => "Один участник может зарегистрировать в акции неограниченное количество чеков, при условии, что чеки выданы за покупку брендов Huter, Ресанта, Вихрь на сумму от 3000 рублей. Один чек может быть зарегистрирован только один раз. Количество чеков увеличивает шансы на победу, но один участник может выиграть только один приз.",
  },
  {
    value: "item-4",
    title:
      "Может ли сумма чека состоять из стоимости товаров трех брендов-партнеров розыгрыша?",
    content:
      () => "Да, для участия можно приобрести товары трех брендов партнеров розыгрыша в один чек на сумму от 3000р",
  },
  {
    value: "item-5",
    title: "Когда и где будет проходить розыгрыш?",
    content:
      () => "Розыгрыш призов пройдет 28 сентября. Начало программы в 11:00, розыгрыш в 12:00 часов по адресу: ул. Северо-Енисейская, 40.  Дата и время могут быть изменены. Актуальная информация будет отображена на данной странице и в группе Вконтакте",
  },
  {
    value: "item-6",
    title: "Как получить приз?",
    content:
      () => "Вручение призов 28 сентября в 12:00 часов по адресу: ул. Северо-Енисейская, 40. Победитель должен иметь при себе паспорт и чек, или скриншот заказа, который был зарегистрирован.",
  },
  {
    value: "item-7",
    title: "Все ли магазины участвуют в акции?",
    content:
      () => 'В Акции участвуют техмаркеты "Вираж" в г. Красноярск по адресам: ул. Северо-Енисейская, 40, ул.Краснодарская,40а стр 1, ул. Королева, 15, а так же интернет - магазин virage24.ru',
  },
  {
    value: "item-8",
    title: "Полные правила акции",
    content: (
      <a
        style="text-decoration: underline;"
        href="http://10.1.1.150/draw-quad-bike/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B0%D0%BA%D1%86%D0%B8%D0%B8%20,%20%D1%80%D0%B5%D1%81%D0%B0%D0%BD%D1%82%D0%B0%20(1).pdf"
      >
        С полными правилами акции можно ознакомиться здесь
      </a>
    ),
  },
];


</script>

<template>
  <header class="bg-accent py-4 px-4">
    <div class="container flex flex-row items-center justify-between">
      <img src="/images/logo.svg" alt="Логотип" class="h-12 mx-12 basis-1/4" />
      <nav class="basis-3/4">
        <ul
          class="flex flex-row mx-auto justify-between space-x-8 text-background"
        >
          <li><a href="#rules" @click.prevent="scrollTo('rules')" >Правила</a></li>
          <li><a href="#rewards" @click.prevent="scrollTo('rewards')">Призы</a></li>
          <li><a href="#map" @click.prevent="scrollTo('map')">Где и когда?</a></li>
          <li><a href="#about" @click.prevent="scrollTo('about')">Вопросы и ответы</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="relative">
    <img
      src="/images/Розыгрыш квадрика_для сайта_Главный баннер 1920 х 720 px.png"
    />
    <div
      class="absolute top-1/4 left-1/12 text-accent-foreground"
      style="font-size: 5vw; line-height: 5vw; font-weight: bold"
    >
      В ОДНОМ ЧЕКЕ
      <br />
      ОТ МЕЧТЫ
    </div>
    <div
      class="absolute top-7/12 left-1/12 text-accent-foreground"
      style="font-size: large; line-height: normal"
    >
      Выигрывайте квадроцикл и другие призы за покупки
      <br />
      Huter, Ресанта, Вихрь на сумму от 3000₽
    </div>
    <div
      class="absolute bottom-1/8 left-1/12 text-accent-foreground"
      style="font-size: large; line-height: normal"
    >
      <button
        style="border-radius: 10px; border-color: #1e3c72 !important"
        class="bg-muted-foreground hover:bg-accent w-64 h-16"
      >
        Зарегистрировать чек
      </button>
    </div>
  </div>
  <div id="rules">
    <h2 class="text-accent text-3xl font-bold text-center py-4">
      Как стать участником?
    </h2>
  </div>

  <div class="grid grid-cols-3 gap-12 mx-16" style="text-align: center">
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Шурик 270 х 270 px.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder">
        Покупайте
      </h5>
      <p class="text-muted-foreground">
        инструменты и технику Huter, Ресанта, Вихрь на сумму 3000₽ в мазинах и
        на сайте virage24.ru
      </p>
    </div>
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Чек 270 х 270 px.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder">
        Регистрируйте
      </h5>
      <p class="text-muted-foreground">номера чеков или заказов</p>
      <button
        style="border-radius: 10px; border-color: #1e3c72 !important"
        class="text-accent-foreground bg-muted-foreground hover:bg-accent w-45 h-16 my-4"
      >
        Зарегистрировать чек
      </button>
    </div>
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Подарок 270 х 270 px.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: larger; font-weight: bolder">
        Выигрывайте
      </h5>
      <p class="text-muted-foreground">
        квадроцикл или подарочную карту на покупки в Вираже
      </p>
    </div>
  </div>

  <div id="rewards" class="relative my-6">
    <img
      src="/images/Розыгрыш квадрика_для сайта_Главный приз 1920 х 1380 px.png"
    />
    <div
      class="absolute top-1/16 left-5/16 text-accent-foreground"
      style="font-size: 5vw; line-height: 5vw; font-weight: bold"
    >
      <p>Главный приз</p>
    </div>
    <div
      class="absolute top-3/16 left-5/24 text-accent-foreground"
      style="font-size: 3vw; line-height: 3vw; font-weight: bold"
    >
      <p>Квадроцикл CF MOTO CFORCE 500. EFI</p>
    </div>
  </div>
  <div
    class="flex flex-row items-center justify-between align-bottom gap-x-20 mx-30"
  >
    <div class="group bg-cover bg-center">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Лого в цвете Huter 300 x 120 px .png"
        class="grayscale contrast-10 hover:grayscale-0 hover:contrast-100"
      />
    </div>
    <div>
      <img
        src="/images/Розыгрыш квадрика_для сайта_Лого в цвете Ресанта 300 x 120 px .png"
        class="grayscale contrast-10 hover:grayscale-0 hover:contrast-100"
      />
    </div>
    <div>
      <img
        src="/images/Розыгрыш квадрика_для сайта_Лого в цвете Вихрь 300 x 120 px .png"
        class="grayscale contrast-10 hover:grayscale-0 hover:contrast-100"
      />
    </div>
  </div>
  <div>
    <h2 class="text-accent text-6xl font-bold text-center py-4">
      Дополнительные призы
    </h2>
    <h2 class="text-accent text-2xl font-semibold text-center py-4">
      Два подарочных сертификата на покупку товаров брендов партнеров в
      техмаркетах Вираж. Номиналы:
    </h2>
    <img
      class=" animate-bounce  scale-65"
      src="/images/Розыгрыш квадрика_для сайта_Подарочные карты 900 х 410 px.png"
    />
  </div>

  <div style="padding-bottom: 5%; box-shadow: inset  rgba(0, 72, 154, 0.4) 0px 20px 68px -34px;">
  <h2 class="text-accent text-3xl font-bold text-center py-4">Товары участвующие в акции</h2>
  <h2 class="text-accent text-2xl font-semibold text-center mx-16 py-4">
      В акции участвуют все чеки, включающие в себя любые товары брендов, представленных ниже, на сумму от 3000₽
    </h2>
    <div class="grid grid-cols-3 gap-12 mx-16" style="text-align: center">
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Газонокосилка Huter 400 х 400 px.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: xx-large; font-weight: bolder">
       Huter
      </h5>
    </div>
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Инструменты Ресанта 400 х 400 px копия.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: xx-large; font-weight: bolder">
        Ресанта
      </h5>
    </div>
    <div style="position: relative">
      <img
        src="/images/Розыгрыш квадрика_для сайта_Перфыч Вихрь 400 х 400 px копия 2.png"
        class="scale-75"
      />
      <h5 class="text-accent" style="font-size: xx-large; font-weight: bolder">
        Вихрь
      </h5>
    </div>
  </div>
  </div>

  <h2 id="about" class="text-accent text-3xl font-bold text-center py-4">
    Вопросы и ответы
  </h2>
  <Accordion
    id="about"
    class="text-accent mx-16"
    type="single"
    collapsible
    :default-value="defaultValue"
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger style="font-weight: 600">{{
        item.title
      }}</AccordionTrigger>
      <AccordionContent>
        <component :is="item.content" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
