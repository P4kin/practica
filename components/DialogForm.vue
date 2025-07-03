<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import 'vue-sonner/style.css'
import { Style } from '#components'

const formSchema = toTypedSchema(z.object({
  name: z.string().includes(' ', {message: 'Должно быть 2 слова '}).min(4, "Минимум 4 символа "),
  email: z.string().email("Должно быть валидной почтой"),
  number: z.string().regex(/^\d+$/, "Поле может содержать только цифры"),
}));

const form = useForm({
  validationSchema: formSchema,
})
function onSubmit(values: any) {
  console.log(values);
      toast.success('Успешно', {
      description: 'Вы зарегистрировались в розыгрыше',
      action: {
      label: 'Закрыть',
      onClick: () => console.log('Undo'),
      },
    },);
  }
</script>


<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog>
      <DialogTrigger as-child>
        <Button class="lg:w-70 lg:h-15 font-bold" variant="outline">
          Зарегистрировать чек
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]" @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
      }">
        <DialogHeader>
          <DialogTitle>Регистрация в акции:</DialogTitle>
          <DialogDescription>
            Зарегистрируйте свой чек или заказ для участия в розыгрыше.
          </DialogDescription>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Введите имя:</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Имя Фамилия" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Введите ваш e-mail':</FormLabel>
        <FormControl>
          <Input type="text" placeholder="example@mail.ru" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="number">
      <FormItem>
        <FormLabel>Введите номер чека или заказа:</FormLabel>
        <FormControl>
          <Input type="text" placeholder="0123456" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="my-4 bg-accent hover:bg-muted-foreground" type="submit" form="dialogForm">
      Зарегистрировать
    </Button>
  </form>
      </DialogContent>
    </Dialog>
  </Form>

</template>