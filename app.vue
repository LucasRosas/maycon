<template>
  <div>
    <VHeader />
    <div id="bridge" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

onMounted(async () => {
  let local = localStorage.getItem('lang')
  if (!local) {
    const { data } = await axios.get("https://ipinfo.io/json");
    localStorage.setItem('lang', data.country == "BR" ? 'pt' : 'en')
  }
})
</script>
