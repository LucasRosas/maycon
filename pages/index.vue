<template>
  <main class="main">
    <TemplatesHomePage />
    <TemplatesWorksPage />
    <TemplatesAboutPage />
    <TemplatesContactPage />
  </main>
</template>

<script setup lang="ts">
</script>

<style>
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.main {
  transition: transform 0.5s ease;
  max-height: 400vh;
  min-height: 400vh;
  height: 400vh;
  overflow-x: clip;
  z-index: 0;
}

.main section {
  width: 100vw;
  padding-top: 150px;
  height: calc(100vh);
  max-width: 100vw;
  animation-timeline: scroll();
}
</style>
