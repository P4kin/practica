<script setup lang="ts">
import {
  defineEmits,
  defineComponent,
  reactive,
  ref,
} from "vue";
import Notification from "./Notification.vue";
import { z } from "zod";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = ref(false);
const isNotificationVisible = ref(false);
const notificationMessage = ref("");

const Data = z.object({
  name: z.string().includes(' ', {message: 'Должно быть 2 слова '}).min(4, "Минимум 4 символа "),
  email: z.string().email("Должно быть валидной почтой"),
  number: z.string().regex(/^\d+$/, "Поле может содержать только цифры"),
});

interface FormData {
  name: string;
  email: string;
  number: string;
}

const formData = reactive<FormData>({
  name: "",
  email: "",
  number: "",
});

const errors = reactive<{ [key: string]: string }>({
  name: "",
  email: "",
  number: "",
});

/* const validateName = () => {
  if (formData.name.length < 3) {
    errors.name = "Имя должно содержать не менее 3 символов.";
  } else {
    errors.name = "";
  }
};

const validateEmail = () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Некорректный формат email.";
  } else {
    errors.email = "";
  }
};

const validateNumber = () => {
  if (formData.number.length < 6) {
    errors.number = "Некорректный номер.";
  } else {
    errors.number = "";
  }
};

const validateForm = () => {
  validateName();
  validateEmail();
  validateNumber();
  return !errors.name && !errors.email && !errors.number;
};
 */
const handleSubmit = () => {
  errors.name = ''
  errors.email = ''
  errors.number = ''
  try {
    const data = Data.parse(formData);
    console.log("Форма отправлена:", data);
    notificationMessage.value = "Форма успешно отправлена!";
    isNotificationVisible.value = true;
  } catch (error) {
    console.log("Форма содержит ошибки", error);
    if (error instanceof z.ZodError){
      error.issues.forEach(issue =>{
        errors[issue.path[0]] += (issue.message);
      })
    }
    
  }
  //   if (validateForm()) {
  //     console.log('Форма отправлена:', formData);
  //     notificationMessage.value = 'Форма успешно отправлена!';
  //     isNotificationVisible.value = true;
  //   } else {
  //     console.log('Форма содержит ошибки');
  //   }
};

const close = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <form
          @submit.prevent="handleSubmit"
          class="grid grid-cols-2 gap-10 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          <div class="col-span-1">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Имя:
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                v-model="formData.name"
                placeholder="Имя Фамилия"
              />
              <span v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="mb-6 col-span-1">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                v-model="formData.email"
                placeholder="example@xoxo.ru"
              />
              <span v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Номер чека или заказа:
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="text"
                v-model="formData.number"
                placeholder="01234567"
              />
              <span v-if="errors.number">{{ errors.number }}</span>
            </div>
          </div>
          <div class="col-span-1">
            <div class="mb-4 mt-15">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Согласие с условиями проведения акции:
              </label>
              <input id="agreement" type="checkbox" v-model="isChecked" />
            </div>

            <div class="flex items-center justify-between">
              <button
                type="submit"
                :disabled="!isChecked"
                :class="{
                  'bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-muted-foreground':
                    isChecked,
                  'bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline':
                    !isChecked,
                }"
              >
                Отправить
              </button>
            </div>
          </div>
        </form>
        <Notification
          :message="notificationMessage"
          :is-visible="isNotificationVisible"
          @update:isVisible="isNotificationVisible = $event"
        />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 0px;
  border-radius: 10px;
  position: relative;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}
</style>
