<script setup lang="ts">

    import { computed, ref } from 'vue'
    import { Todo, Category, CreateTodo, categories } from '../types'
    import CategoryPicker from './CategoryPicker.vue';

    const emit = defineEmits<{
      (e: 'add', todo: CreateTodo): void
      (e: 'close'): void
    }>()

    const prop = defineProps<{
      todo: Todo | null
    }>()

    const name = ref(prop.todo?.name || '')
    const description = ref(prop.todo?.description || '')

    const nameValid = computed(() => name.value && name.value.length < 50);
    const descriptionValid = computed(() => description.value && description.value.length < 255);
    const formValid = computed(() => nameValid.value && descriptionValid.value);

    const selectedCategory = ref<Category>(prop.todo?.category || categories[0])

    const add = () => {
      emit('add', {id: prop.todo?.id, name: name.value, description: description.value, category: selectedCategory.value})
    }

</script>
<template>
    <div class="fixed inset-0 flex justify-center items-center bg-slate-400/40">
    <div class="bg-white rounded-2xl p-6 max-w-sm w-full">
      <h2 class="font-semibold leading-7 text-xl text-gray-900">Create todo</h2>
      <div class="sm:col-span-3 py-1 text-gray-900">
        <label for="first-name" class="block text-medium font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input type="text" v-model="name" name="first-name" id="first-name" autocomplete="off" class="w-full rounded-md p-2 ring-1 ring-inset ring-gray-300" />
          <span v-if="!nameValid && name" class="text-red-500 text-xs font-medium">Name has to be shorter then 50 characters</span>
        </div>
      </div>
      <div class="col-span-full py-1">
        <label for="about" class="block text-medium font-medium leading-6 text-gray-900">About</label>
        <div class="mt-2">
          <textarea id="about" v-model="description" name="about" rows="3" class="w-full p-2 rounded-md ring-1 ring-inset ring-gray-300"/>
          <span v-if="!descriptionValid && description" class="text-red-500 text-xs font-medium">Description has to be shorter then 255 characters</span>
        </div>
      </div>
      <div class="mt-1">
        <label for="about" class="block text-medium font-medium leading-6 text-gray-900">Category</label>
        <CategoryPicker :value="selectedCategory" :categories="categories" @update:value="selectedCategory = $event"/>
        <div class="flex justify-between w-full pt-8">
          <button @click="emit('close')" class="rounded-md border border-red-400 px-4 py-2 text-sm text-red-600 hover:bg-red-100">Cancel</button>
          <button @click="add()" :disabled="!formValid" :class="{'cursor-not-allowed bg-indigo-100': !formValid, 'bg-indigo-600 hover:bg-indigo-700': formValid}" class="rounded-md border px-4 py-2 text-sm text-white ">Confirm</button>
        </div>
      </div>

    </div>
  </div>
</template>

