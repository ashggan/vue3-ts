<template>
    <div class="container m-12 ">
        <h1 class="text-center text-2xl font-bold capitalize">Jobs board</h1>
        <div class="grid grid-cols-3 gap-12">
            <jobList></jobList>
        </div>
    </div>
</template>

<script setup lang="ts">
import jobList from '@/components/job/jobList.vue';

</script>  
