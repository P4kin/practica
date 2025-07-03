<script setup lang="tsx">
import DialogForm from "./components/DialogForm.vue";
import MyCarousel from "./components/MyCarousel.vue";
import { ref, onMounted, onUnmounted, createApp } from "vue";
import { shallowRef } from "vue";
import type { LngLat, YMap } from "@yandex/ymaps3-types";
import {
  YandexMap,
  YandexMapControls,
  YandexMapControl,
  YandexMapControlButton,
  YandexMapGeolocationControl,
  YandexMapOpenMapsButton,
  YandexMapScaleControl,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapZoomControl,
} from "vue-yandex-maps";
import CatalogPage from "./components/CatalogPage.vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const map = shallowRef<null | YMap>(null);

const openMarker = ref<null | number>(null);

const markers: { coordinates: LngLat }[] = [
  {
    coordinates: [92.835854, 56.025819],
  },
];

function scrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
const defaultValue = "item-1";

const accordionItems = [
  {
    value: "item-1",
    title: "В какой период можно принять участие в акции?",
    content: () =>
      "Зарегистрировать чек можно с 1 июня 2024г. по 21 сентября 2024г. Розыгрыш призов пройдет 28 сентября на парковке магазина Вираж по адресу: ул.Северо-Енисейская, 40. Победитель должен присутствовать на розыгрыше и иметь при себе паспорт и чек, который был зарегистрирован.",
  },
  {
    value: "item-2",
    title: "Нужно ли присутствовать на розыгрыше?",
    content: () =>
      "Для победы обязательно личное присутствие на мероприятии. Победитель должен иметь при себе паспорт и чек, который был зарегистрирован.",
  },
  {
    value: "item-3",
    title:
      "Можно ли зарегистрировать несколько чеков и выиграть несколько призов?",
    content: () =>
      "Один участник может зарегистрировать в акции неограниченное количество чеков, при условии, что чеки выданы за покупку брендов Huter, Ресанта, Вихрь на сумму от 3000 рублей. Один чек может быть зарегистрирован только один раз. Количество чеков увеличивает шансы на победу, но один участник может выиграть только один приз.",
  },
  {
    value: "item-4",
    title:
      "Может ли сумма чека состоять из стоимости товаров трех брендов-партнеров розыгрыша?",
    content: () =>
      "Да, для участия можно приобрести товары трех брендов партнеров розыгрыша в один чек на сумму от 3000р",
  },
  {
    value: "item-5",
    title: "Когда и где будет проходить розыгрыш?",
    content: () =>
      "Розыгрыш призов пройдет 28 сентября. Начало программы в 11:00, розыгрыш в 12:00 часов по адресу: ул. Северо-Енисейская, 40.  Дата и время могут быть изменены. Актуальная информация будет отображена на данной странице и в группе Вконтакте",
  },
  {
    value: "item-6",
    title: "Как получить приз?",
    content: () =>
      "Вручение призов 28 сентября в 12:00 часов по адресу: ул. Северо-Енисейская, 40. Победитель должен иметь при себе паспорт и чек, или скриншот заказа, который был зарегистрирован.",
  },
  {
    value: "item-7",
    title: "Все ли магазины участвуют в акции?",
    content: () =>
      'В Акции участвуют техмаркеты "Вираж" в г. Красноярск по адресам: ул. Северо-Енисейская, 40, ул.Краснодарская,40а стр 1, ул. Королева, 15, а так же интернет - магазин virage24.ru',
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
    <div
      class="container mx-auto flex flex-row items-center justify-between text-background"
    >
      <img src="/images/logo.svg" alt="Логотип" class="h-12 mx-12 basis-1/4" />
      <nav
        :class="[
          'md:flex md:gap-25',
          isMobileMenuOpen ? 'block' : 'hidden',
          'md:items-center',
        ]"
      >
        <a
          href="#rules"
          class="block md:inline-block md:ml-4"
          @click.prevent="scrollTo('rules')"
          >Правила</a
        >
        <a
          href="#rewards"
          class="block md:inline-block md:ml-4"
          @click.prevent="scrollTo('rewards')"
          >Призы</a
        >
        <a
          href="#map"
          class="block md:inline-block md:ml-4"
          @click.prevent="scrollTo('map')"
          >Где и когда?</a
        >
        <a
          href="#about"
          class="block md:inline-block md:ml-4"
          @click.prevent="scrollTo('about')"
          >Вопросы и ответы</a
        >
      </nav>
      <button
        class="md:hidden text-2xl focus:outline-none"
        @click="toggleMobileMenu"
      >
        &#9776;
      </button>
    </div>
  </header>

  <div class="relative">
    <img
      src="/images/Розыгрыш квадрика_для сайта_Главный баннер 1920 х 720 px.png"
    />
    <div
      class="absolute top-1/8 left-1/12 text-accent-foreground"
      style="font-size: 5vw; line-height: 5vw; font-weight: bold"
    >
      В ОДНОМ ЧЕКЕ
      <br />
      ОТ МЕЧТЫ
    </div>
    <div
      class="absolute top-5/12 left-1/12 text-accent-foreground"
      style="font-size: 2vw; line-height: 2vw"
    >
      Выигрывайте квадроцикл и другие призы
      <br />
      за покупки Huter, Ресанта, Вихрь от 3000₽
    </div>
    <div
      class="absolute bottom-1/8 left-1/12 text-accent-foreground"
      style="font-size: large; line-height: normal"
    >
      <DialogForm></DialogForm>
    </div>
  </div>

  <div id="rules">
    <h2 class="text-accent text-3xl font-bold text-center py-4">
      Как стать участником?
    </h2>
  </div>
  <div class="flex justify-around">
    <MyCarousel></MyCarousel>
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
  <div class="flex flex-row items-center justify-between align-bottom">
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
      class="animate-bounce scale-50"
      src="/images/Розыгрыш квадрика_для сайта_Подарочные карты 900 х 410 px.png"
    />
  </div>

  <div
    style="
      padding-bottom: 5%;
      box-shadow: inset rgba(0, 72, 154, 0.4) 0px 20px 68px -34px;
    "
  >
    <h2 class="text-accent text-3xl font-bold text-center py-4">
      Товары участвующие в акции
    </h2>
    <h2 class="text-accent text-2xl font-semibold text-center mx-16 py-4">
      В акции участвуют все чеки, включающие в себя любые товары брендов,
      представленных ниже, на сумму от 3000₽
    </h2>
    <div class="lg:grid grid-cols-3 gap-12 mx-16" style="text-align: center">
      <div style="position: relative">
        <img
          src="/images/Розыгрыш квадрика_для сайта_Газонокосилка Huter 400 х 400 px.png"
          class="scale-75"
        />
        <h5
          class="text-accent"
          style="font-size: xx-large; font-weight: bolder"
        >
          Huter
        </h5>
      </div>
      <div style="position: relative">
        <img
          src="/images/Розыгрыш квадрика_для сайта_Инструменты Ресанта 400 х 400 px копия.png"
          class="scale-75"
        />
        <h5
          class="text-accent"
          style="font-size: xx-large; font-weight: bolder"
        >
          Ресанта
        </h5>
      </div>
      <div style="position: relative">
        <img
          src="/images/Розыгрыш квадрика_для сайта_Перфыч Вихрь 400 х 400 px копия 2.png"
          class="scale-75"
        />
        <h5
          class="text-accent"
          style="font-size: xx-large; font-weight: bolder"
        >
          Вихрь
        </h5>
      </div>
    </div>
  </div>

  <div id="map">
    <h2 class="text-accent text-6xl font-bold text-center py-4">
      Где и когда?
    </h2>
    <div
      class="xl:grid grid-cols-2 gap-10 justify-items-center bg-accent py-10 px-20 text-background"
    >
      <div style="position: relative; overflow: hidden">
        <yandex-map
          v-model="map"
          :settings="{
            location: {
              center: [92.835854, 56.025819],
              zoom: 16,
            },
            showScaleInCopyrights: true,
          }"
          width="600px"
          height="500px"
        >
          <yandex-map-default-scheme-layer />
          <yandex-map-default-features-layer />
          <yandex-map-controls :settings="{ position: 'right' }">
            <yandex-map-zoom-control />
          </yandex-map-controls>
          <yandex-map-controls :settings="{ position: 'left' }">
            <yandex-map-geolocation-control />
          </yandex-map-controls>
          <yandex-map-controls
            :settings="{ position: 'bottom left', orientation: 'vertical' }"
          >
            <yandex-map-open-maps-button />
          </yandex-map-controls>
          <yandex-map-marker
            class="bg-background"
            v-for="(marker, index) in markers"
            marker-type="custom"
            :key="index"
            position="top-center left-center"
            :settings="{
              coordinates: marker.coordinates,
              onClick: () => (openMarker = index),
              zIndex: openMarker === index ? 1 : 0,
            }"
          >
            <img src="./images/logo-icon.svg" alt="" class="pin" />
            <div class="marker">
              <div v-if="openMarker === index" class="popup">
                <a
                  href="https://yandex.ru/maps/org/virazh/1082344735/?from=mapframe&ll=92.835486%2C56.026196&z=17"
                  target="_blank"
                  class="font-bold text-accent"
                  >Вираж</a
                >
                <button
                  class="absolute top-2 right-2"
                  @click.stop="openMarker = null"
                >
                  <img width="12" height="12" src="/images/close.svg" alt="" />
                </button>
                <p class="text-xs" style="color: gray">
                  Строительный гипермаркет, электро- и бензоинструмент,
                  сварочное оборудование и материалы
                </p>
                <div class="flex justify-between my-4">
                  <a
                    href="https://yandex.ru/maps/org/virazh/1082344735/reviews/?add-review=true&from=mapframe&ll=92.835486%2C56.026196&z=17"
                    target="_blank"
                  >
                    <div class="flex flex-wrap">
                      <img width="15" height="15" src="/images/star.png" />
                      <img width="15" height="15" src="/images/star.png" />
                      <img width="15" height="15" src="/images/star.png" />
                      <img width="15" height="15" src="/images/star.png" />
                      <img width="15" height="15" src="/images/star.png" />
                    </div>
                    <p>5.0</p>
                  </a>
                  <p>Открыто с 8:00 до 20:00</p>
                </div>
                <div class="flex flex-wrap">
                  <img width="14" height="14" src="/images/geo.svg" />
                  <p class="mx-2">Красноярск, Северо-Енисейская улица, 40</p>
                </div>
                <div class="flex flex-wrap">
                  <img width="14" height="14" src="/images/phone.svg" />
                  <p class="mx-2">+7 (391) 290-20-01</p>
                </div>
                <div class="flex flex-wrap">
                  <img width="14" height="14" src="/images/web.svg" />
                  <a
                    class="mx-2 font-semibold text-accent"
                    href="www.virage24.ru"
                    >virage24.ru</a
                  >
                </div>
                <div class="flex flex-row justify-center gap-4 py-4">
                  <a
                    href="https://yandex.ru/maps/?ll=92.835278%2C56.026129&amp;rtd=0&amp;rtext=~56.026129%2C92.835278&amp;rtt=auto&amp;ruri=~&amp;start_navigation=true&amp;z=14&amp;from=mapframe"
                    target="_blank"
                    class="bg-secondary hover:bg-secondary-foreground text-accent font-bold py-2 px-4 rounded"
                  >
                    Как добраться
                  </a>
                  <a
                    href="https://yandex.ru/maps/org/virazh/1082344735/?from=mapframe&ll=92.835486%2C56.026196&z=17"
                    target="_blank"
                    class="bg-secondary hover:bg-secondary-foreground text-accent font-bold py-2 px-4 rounded"
                  >
                    Об организации
                  </a>
                </div>
              </div>
            </div>
          </yandex-map-marker>
        </yandex-map>
      </div>
      <div class="flex-col justify-center py-15 px-10">
        <span class="text-2xl"
          >Розыгрыш пройдет в формате мероприятия, на котором вас ждут конкурсы,
          подарки, а также тест-драйв инструментов и техники</span
        >
        <h2 class="text-4xl font-bold my-7">Где?</h2>
        <span class="text-2xl py-5"
          >На Ул. Северо-Енисейская, 40 на парковке возле фитнес-центра
          Гараж</span
        >
        <h2 class="text-4xl font-bold my-7">Когда?</h2>
        <span class="text-2xl py-5"
          >Мероприятие пройдет 28 сентября. Начало программы в 11:00, розыгрыш в
          12:00</span
        >
      </div>
    </div>
  </div>

  <h2 id="about" class="text-accent text-3xl font-bold text-center py-4">
    Вопросы и ответы
  </h2>
  <Accordion
    id="about"
    class="text-accent mx-15"
    type="single"
    collapsible
    :default-value="defaultValue"
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger class="font-bold text-2xl">{{
        item.title
      }}</AccordionTrigger>
      <AccordionContent class="font-semibold text-xl">
        <component :is="item.content" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <Toaster
    class="pointer-events-auto"
    :toastOptions="{
      classes: {
        default: 'text-foreground',
        success: '!bg-lime-600 !text-white',
        description: '!text-[inherit]',
      },
    }"
  />
</template>

<style scoped>
.pin {
  background: rgb(236, 143, 0);
  filter: invert(100%);
  max-width: unset;
  scale: 60%;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.popup {
  width: 370px;
  height: 275px;
  position: absolute;
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
}
</style>
