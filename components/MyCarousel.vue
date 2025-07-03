<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
</script>

<template>
  <Carousel class="w-full max-w-lg lg:max-w-6xl"
  :opts="{
      align: 'start',
    }">
    <CarouselContent>
      <CarouselItem class="lg:basis-1/3"> 
          <Card>
            <CardHeader>
                <CardTitle class="text-center">Покупайте</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col aspect-square p-6 text-center">
                <img src="../images/Розыгрыш квадрика_для сайта_Перфыч Вихрь 400 х 400 px копия 2.png">
                <p>Покупайте инструменты и технику Huter, Ресанта, Вихрь на сумму 3000₽ в мазинах и на сайте virage24.ru</p>
            </CardContent>
          </Card>
      </CarouselItem>
      <CarouselItem class="lg:basis-1/3">
          <Card>
            <CardHeader>
                <CardTitle class="text-center">Регистрируйте</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col aspect-square p-6 text-center">
                <img src="../images/Розыгрыш квадрика_для сайта_Чек 270 х 270 px.png">
                <p>Регистрируйте чеки или номера онлайн-заказов на этом сайте</p>
            </CardContent>
          </Card>
      </CarouselItem>
      <CarouselItem class="lg:basis-1/3">
          <Card>
            <CardHeader>
                <CardTitle class="text-center">Выигрывайте</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col aspect-square p-6 text-center">
                <img src="../images/Розыгрыш квадрика_для сайта_Подарок 270 х 270 px.png">
                <p>Квадроцикл или подарочную карту на покупки в Вираже</p>
            </CardContent>
          </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="md:hidden"/>
    <CarouselNext class="md:hidden"/>
  </Carousel>
</template>