<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style>
html {
  scroll-behavior: smooth;
}

#app {
  min-height: 100vh;
}
</style>
