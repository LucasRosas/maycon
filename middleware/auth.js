import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = getAuth();

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // limpa o listener depois da primeira resposta

      if (!user) {
        return resolve(navigateTo("/login"));
      }
      resolve();
    });
  });
});
