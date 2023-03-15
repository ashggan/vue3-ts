<script setup lang="ts">
import jobListComponentVue from '@/components/job/jobListComponent.vue';


</script>

<template>
    <div class="container m-12 ">
        <h1 class="text-center text-2xl font-bold capitalize">Jobs board</h1>

        <div class="grid grid-cols-3 gap-12">
            <jobListComponentVue></jobListComponentVue>
        </div>
    </div>
</template>
