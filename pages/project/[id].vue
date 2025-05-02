<template>
  <div class="">Legal! - {{ data }}</div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/posts?id=2");
</script>

<style></style>
