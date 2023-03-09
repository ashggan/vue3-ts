<script setup lang="ts">
import newTaskComponentVue from '@/components/task/newTaskComponent.vue';
import TaskListComponet from '@/components/task/taskListComponet.vue';

</script>

<template>
    <div class="container m-12 ">
        <div class="grid grid-cols-2 gap-12">
            <div class=" col m-5">
                <newTaskComponentVue></newTaskComponentVue>
            </div>
            <div class="col  ">
                <TaskListComponet></TaskListComponet>
            </div>
        </div>
    </div>
</template>
