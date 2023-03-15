<template>
    <div class="shadow-lg my-10 p-5 border-b-4 border-indigo-500 hover:shadow-md cursor-pointer" v-for="job in jobs">
        <h1 class="text-xl font-bold">{{ job.title }}</h1>
        <p>{{ job.category.label }}</p>
    </div>
</template>
 
<script setup lang="ts">
import { useJobStore } from '@/stores/job';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const jobStore = useJobStore()
const { jobs } = storeToRefs(useJobStore())

onMounted(() => {
    jobStore.getJob()
})

</script>
