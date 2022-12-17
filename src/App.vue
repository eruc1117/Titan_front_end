<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Login from './views/Login.vue'
import navbarVue from './components/navbar.vue';
</script>

<template>
   <header>
    <navbarVue/>
  </header>

  <main>
    <Login />
  </main>
</template>