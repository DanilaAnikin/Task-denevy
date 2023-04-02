<script setup lang="ts">
    import {ref} from 'vue'
    import {Todo} from '../types'
    import {TrashIcon, PencilSquareIcon} from '@heroicons/vue/24/solid'

    const prop = defineProps<{
        todos: Todo[]
    }>()
    const emit = defineEmits<{
        (e: 'delete', id: number): void,
        (e: 'edit', todo: Todo): void

    }>()
    const deleteTodo = (id: number) => {
        emit('delete', id)
    }
    const editTodo = (todo: Todo) => {
        emit('edit', todo)
    }
</script>

<template>
    <table class="table-fixed w-full">
        <thead>
            <tr class="bg-indigo-100 text-left">
                <th v-for='header in ["Name", "About", "Category", "Actions"]' class="pl-2 py-2">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" class="py-3">
                <td class="break-all">{{ todo.name }}</td>
                <td class="break-all py-2">{{ todo.description }}</td>
                <td>{{ todo.category }}</td>
                <td>
                    <div class="flex gap-2">
                        <PencilSquareIcon @click="editTodo(todo)" class="w-5 h-5 flex items-center justify-center text-indigo-400 rounded-md hover:text-indigo-600 cursor-pointer"/>
                        <TrashIcon @click="deleteTodo(todo.id)" class="w-5 h-5 flex items-center justify-center text-red-400 rounded-md cursor-pointer hover:text-red-500"/>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
