<template>
    <div class="my-5">
        <h1 class="font-bold"> Today tasks</h1>
        <p class="font-bold my-5" v-if="tasks.length === 0">no tasks</p>
        <div v-else class="flex justify-between shadow-lg my-5 p-5 border-l-4 border-indigo-500" v-for="task in tasks">
            <p :class="{ cross: task.done }">{{ task.title }}</p>
            <div>
                <input class=" mr-3h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    @click="changeStatue(task.id)" type="checkbox" v-model="task.done">
                <i class="fa fa-trash" @click="removeTask(task.id)"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();
const { tasks } = storeToRefs(useTaskStore())
const changeStatue = (id: string) => taskStore.markDone(id)
const removeTask = (id: string) => taskStore.removeTask(id)
</script>

<style scoped>
.cross {
    text-decoration: line-through;
}
</style>
 