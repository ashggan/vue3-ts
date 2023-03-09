<template>
    <div class=" grid ">
        <div class=" mt-2 rounded-md shadow-sm ">
            <input type="text" name="price" id="price" v-model="task.task"
                class="block w-full focus:ring-0 focus:outline-0 border-0 py-1.5 pl-7 pr-20 text-gray-900 border-b-2 border-indigo-500  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                placeholder="New Task">
            <textarea
                class="block w-full focus:ring-0 focus:outline-0 border-0 py-1.5 pl-7 pr-20 text-gray-900 border-b-2 border-indigo-500  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                cols="30" rows="5" placeholder="here"></textarea>

        </div>
        <div class="my-5 inset-y-0 right-0 flex items-center">
            <button class="bg-indigo-500 h-10 w-10 mb-4 shadow-lg text-white rounded-full" @click="addTask()">
                <i class="fa fa-plus"></i></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import type Task from '@/types/task';
import { ref } from 'vue';

const task = ref<Task>({
    task: '',
    id: '',
    done: false
});

const store = useTaskStore()

const addTask = () => {
    store.addNewTask(task.value)
    task.value = {
        task: '',
        id: '',
        done: false
    }
}

</script>