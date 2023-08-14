<script setup>
import { RouterLink, RouterView } from "vue-router";
import myHeader from "./components/header.vue";
import lSidebar from "./components/lSidebar.vue";
</script>

<template>
  <my-header></my-header>
  <l-sidebar></l-sidebar>
  <!-- <div
    class="w-[calc(100vw-20rem)] relative left-[20rem] max-lg:left-0 max-lg:w-[100vw] mt-[4rem]"
  >

  </div> -->

  <div
    class="w-[calc(100vw-20rem)] mt-[4rem] relative left-[20rem] max-lg:left-0 max-lg:w-[100vw]"
  >
    <RouterView />
  </div>
</template>

<style scoped></style>
