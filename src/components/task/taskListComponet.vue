<template>
    <div class="my-5">
        <h1 class="font-bold"> Today tasks</h1>
        <p class="font-bold my-5" v-if="tasks.length === 0">no tasks</p>
        <div v-else class="shadow-lg my-5 p-5 border-l-4 border-indigo-500" v-for="task in tasks">
            <p>{{ task.task }}</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';

const taskStore = useTaskStore();
const tasks = taskStore.tasks 
</script>

<style scoped></style>
 