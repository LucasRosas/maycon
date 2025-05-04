<template>
  <div class="LoginPage">
    <div class="LoginPage__container">
      <div class="LoginPage__container__form">
        <h1>Login</h1>
        <form @submit.prevent="loginWithGoogle">
          <input id="email" type="email" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <Button>Click me</Button>
        <button @click="loginWithGoogle">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const router = useRouter();

const auth = getAuth();
const loginWithGoogle = () => {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      router.push("/admin");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging in:", errorCode, errorMessage);
    });
};
</script>

<style>
.LoginPage__container {
  padding: 110px 96px;
}
</style>
