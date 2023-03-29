<template>
    <div class="shadow-lg my-10 p-5 border-b-4 border-indigo-500 hover:shadow-md cursor-pointer" v-for="job in jobs"
        @click="JobDetail(job.id)">
        <small>{{ job.category.label }}</small>
        <h1 class="text-xl font-bold">{{ job.title }}</h1>
        <!-- <p>{{ job.description }}</p> -->
    </div>
</template>
 
<script setup lang="ts">
import { useJobStore } from '@/stores/job';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const jobStore = useJobStore()
const { jobs } = storeToRefs(useJobStore())
const router = useRouter();

onMounted(() => {
    jobStore.getJob()
})



function JobDetail(id: string) {
    router.push({ name: 'Job-detail', params: { id: id } })
}
</script>
