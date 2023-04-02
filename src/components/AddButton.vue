<script setup lang="ts">


    const emit = defineEmits<{
        (e: 'add'): void
    }>()
</script>

<template>
    <button @click="$emit('add')" class="inline-block border border-transparent bg-indigo-500 px-4 py-1 rounded-md text-center font-medium text-white hover:bg-indigo-600">Add</button>
</template>