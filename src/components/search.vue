<template>
    <div>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input type="text" name="price" id="price"
                class="block w-full focus:ring-0 focus:outline-0 border-0 py-1.5 pl-7 pr-20 text-gray-900 border-b-2 border-indigo-500  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                placeholder="New Task">
            <div class="absolute inset-y-0 right-0 flex items-center">
                <button class="bg-indigo-500 h-10 w-10 mb-2 shadow-lg text-white rounded-full"><i
                        class="fa fa-plus"></i></button>
                <label for="country" class="sr-only">Country</label>
                <!-- <select id="country" name="country"
                    class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                </select> -->
            </div>
        </div>
    </div>
</template>
 
<script setup lang="ts">

</script>
 
 