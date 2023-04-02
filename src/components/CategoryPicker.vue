<script setup lang="ts">
    import { computed } from '@vue/reactivity';
    import {Category} from '../types'
    import { ChevronUpDownIcon, CheckIcon} from '@heroicons/vue/24/solid'

    import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    } from '@headlessui/vue'

    const prop = defineProps<{
        categories: Category[]
        value: Category
    }>();

    const emit = defineEmits<{(e: 'update:value', category: Category): void}>();

    const selectedCategory = computed({
        get(){
            return prop.value
        },
        set(value: Category){
            emit('update:value', value);
        }
    })

</script>

<template>
    <Listbox v-model="selectedCategory">
        <div class="relative mt-1">
        <ListboxButton
            class="w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left ring-1 ring-inset ring-gray-300 min-w-[150px]">
            <span class="block truncate">{{ selectedCategory }}</span>
            <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute mt-1 max-h-60 w-full shadow-md rounded-md bg-white py-1">
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="category in categories"
                :key="category"
                :value="category"
                as="template"
            >
                <li
                :class="[
                    active ? 'bg-indigo-100' : 'text-gray-900',
                    'relative py-2 pl-10 pr-4',
                ]"
                >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                    ]"
                    >{{ category }}</span
                >
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600"
                >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
                </li>
            </ListboxOption>
            </ListboxOptions>
        </transition>
        </div>
    </Listbox>
</template>