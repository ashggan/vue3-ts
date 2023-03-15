<template>
    <nav class="  border-b-2 border-b-gray-100 drop-shadow-lg">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <!-- logo image goes here  -->
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                RouterLink="/">Home</a>

                            <a class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                RouterLink="/todo">todo</a>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- notifications button here  -->
                    <!-- Profile dropdown -->
                </div>
            </div>
        </div>
        <!-- Mobile menu, show/hide based on menu state. -->
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

 