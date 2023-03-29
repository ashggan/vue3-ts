<template>
    <div class="container m-12 ">

        <div class="flex flex-col h-screen justify-between items-center px-4">
            <a href="{{ job.redirect_url }}">
                <h1 class="text-3xl text-gray-800 font-bold leading-tight my-8"> {{ job?.title }}</h1>
            </a>
            <p class="text-md text-gray-600 leading-6 mb-4">{{ job?.description }}</p>
            <ul class="list-disc list-inside px-4 py-2 mb-8">
                <li>Salary : {{ job?.salary_max }}</li>
                <li>contract type : {{ job?.contract_type }} </li>
            </ul>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Apply Now
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/job';


const probs = defineProps({
    id: {
        type: String,
        required: true
    }
})
const jobStore = useJobStore()
const job = jobStore.getJobById(probs.id)
console.log(probs.id)
</script> 