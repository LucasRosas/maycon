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
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
      measurementId: process.env.MEASUREMENTID,
    },
  },
});
