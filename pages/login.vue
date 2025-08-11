<template>
  <div class="LoginPage">
    <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div class="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "~/components/templates/LoginForm.vue";


onMounted(() => {
  const colorMode = useColorMode()
  colorMode.preference = 'dark'
})
</script>

<style>
.LoginPage__container {
  margin: 136px 96px;
}
</style>
