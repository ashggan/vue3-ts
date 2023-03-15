<template>
    <div class="col-4 offset-4">
        <input type="text" placeholder="speak now">
    </div>
</template>

<script setup lang="ts">


// Using the /build/artyom.js file
// with ES6,TypeScript etc
import Artyom from 'artyom.js';
// const Artyom = require('artyom.js');

const Jarvis = new Artyom();

Jarvis.say("Hello World !");

</script>

<style scoped></style>