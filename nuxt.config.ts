import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "nuxt-vuefire",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
  ],
  vuefire: {
    auth: {
      enabled: true,
      sessionStorage: true,
    },
    config: {
      apiKey: "AIzaSyC83xKesUeu-vcrsfKvGY6xZlSsutxE7vc",
      authDomain: "maycon-portugal.firebaseapp.com",
      projectId: "maycon-portugal",
      storageBucket: "maycon-portugal.firebasestorage.app",
      messagingSenderId: "83123727899",
      appId: "1:83123727899:web:29c0fb78ae62f736cb92be",
      measurementId: "G-P18K4GDKGH",
    },
  },
});
