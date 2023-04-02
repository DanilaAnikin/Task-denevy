<script setup lang="ts">
import { ref, computed } from 'vue'
import CreateNew from './/CreateNew.vue'
import Info from './/Info.vue'
import AddButton from './/AddButton.vue'
import CategoryPicker from './/CategoryPicker.vue'
import { type CreateTodo, Todo, categories, Category } from '../types'

const createOpened = ref(false)
const editTodo = ref<Todo | null>(null)

const todos = ref<Todo[]>([])

const categoryFilter = ref<Category>(Category.NONE)

const filteredTodos = computed<Todo[]>(() => {
  if(categoryFilter.value === Category.NONE){
    return todos.value
  }

  return todos.value.filter(todo => todo.category === categoryFilter.value)
})


const add = (todo: CreateTodo) => {
  if(typeof todo.id !== 'undefined'){
    const index = todos.value.findIndex(todo => todo.id === todo.id);
    todos.value.splice(index, 1, {id: todo.id, ...todo})
    createOpened.value = false
  } else{
    const id = Math.max(0, ...todos.value.map(todo => todo.id)) + 1
    todos.value.push({...todo, id})
    createOpened.value = false
  }
}
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}


const cityInput = ref<string | null>('')

const cityName = ref<string | null>('')
const cityTemp = ref<string | null>('')
const cityDesc = ref<string | null>('')

const findWeather = () => {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value + '&appid=50a7aa80fa492fa92e874d23ad061374')
  .then(response => response.json())
  .then(data => {
    cityName.value = data['name'];
    cityTemp.value = data['main']['temp'];
    cityDesc.value = data['weather'][0]['description'];
  })

  .catch(err => alert("Wrong city name!"))
  cityInput.value = ''
}
// button.addEventListener('click', function(name){
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374')
// .then(response => response.json())
// .then(data => {
//   var tempValue = data['main']['temp'];
//   var nameValue = data['name'];
//   var descValue = data['weather'][0]['description'];



// })

// .catch(err => alert("Wrong city name!"));
// })


</script>

<template>
  <div class="max-w-4xl mx-auto mt-40 todo">
    <div class="flex justify-between">
      <div class="flex mb-3 mr-2 col">
          <span class="mr-5 font-semibold text-3xl header">Todos</span>
          <AddButton @add="createOpened=true"/>
      </div>
      <div class="flex items-center mb-3 col">
        <span class="text-sm mr-2">Filter by category</span>
        <CategoryPicker :categories="[Category.NONE, ...categories]" :value="categoryFilter" @update:value="categoryFilter = $event" class="min-w-72"/>
      </div>
    </div>

    <Info :todos="filteredTodos" @delete="deleteTodo($event)" @edit="editTodo = $event; createOpened = true"/>
    
    <CreateNew v-if="createOpened" :todo="editTodo" @close="createOpened = false; editTodo = null" @add="add($event)"/>
  </div>


  <div class="mt-40">
    <span class="text-2xl p-8 font-semibold">Weather</span>
    <div class="flex justify-center gap-4 mt-4">
      <input v-model="cityInput" type="text" class="bg-white py-2 pl-3 text-left ring-1 ring-inset ring-gray-300 rounded-lg text-slate-800" placeholder="Enter the city" v-on:keyup.enter="findWeather()">
      <button class="bg-indigo-500 text-white font-medium px-2 py-1 rounded-md hover:bg-indigo-600" @click="findWeather()">Submit</button>
    </div>
    <div v-if="cityName" class="max-w-2xl p-6 w-full bg-slate-100 mx-auto mt-10 rounded-md">
      <span class="block text-3xl text-center mb-4 font-medium">{{ cityName }}</span>
      <span v-if="cityName" class="block text-lg text-center my-4">Temperature: {{ cityTemp }}</span>
      <span v-if="cityName" class="block text-lg text-center mt-4">Description: {{ cityDesc }}</span>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .todo{
    padding-left: 20px;
    padding-right: 20px;
  }
  .header{
    margin-right: 2px;
  }
  .col{
    flex-direction: column;
    text-align: left;
  }
}
</style>