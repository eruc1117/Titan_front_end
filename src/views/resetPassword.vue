<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const basicUrl = "http://localhost:3000";
const userId = ref("");
const password = ref("");
const repeatPassword = ref("");
const captcha = ref("");
const router = useRouter();
async function resetPassword() {
  if (password.value === repeatPassword.value) {
    try {
      let respones = await fetch(`${basicUrl}/account/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.value,
          newPassword: password.value,
          repeatPassword: repeatPassword.value,
          captcha: captcha.value,
        }),
      });
      console.log(respones);
      respones = await respones.json();
      console.log(respones);
      if (respones.message === "sucess") {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function getCaptcha() {
  try {
    let capResponse = await fetch(`${basicUrl}/account/preReset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId.value,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="login">
    <div class="inputDiv">
      <label>Employee Id</label>
      <input
        type="text"
        :value="userId"
        v-on:input="(event) => (userId = event.target.value)"
      />
      <button class="loginButton" @click="getCaptcha">Get Captcha</button>
    </div>
    <div class="inputDiv">
      <label>New Password</label>
      <input
        type="text"
        :value="password"
        v-on:input="(event) => (password = event.target.value)"
      />
    </div>
    <div class="inputDiv">
      <label>Repeat Password</label>
      <input
        type="text"
        :value="repeatPassword"
        v-on:input="(event) => (repeatPassword = event.target.value)"
      />
    </div>
    <div class="inputDiv">
      <label>Captcha</label>
      <input
        type="text"
        :value="captcha"
        v-on:input="(event) => (captcha = event.target.value)"
      />
    </div>
    <button class="loginButton" @click="resetPassword">Reset Password</button>
    <a href="/" class="resetLink">Login</a>
  </div>
</template>

<style scoped>
.login {
  width: 30%;
  margin: auto;
  margin-top: 5%;
  background-color: rgb(175, 212, 241);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login > * {
  width: 70%;
}

.inputDiv {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
}

.inputDiv > label {
  font-size: 25px;
}

.inputDiv > input {
  margin-top: 3%;
  height: 30px;
  font-size: 20px;
  padding: 10px;
}

.inputDiv > input[type="text"]:focus {
  background-color: rgb(253, 161, 92);
}

.inputDiv > input[type="password"]:focus {
  background-color: rgb(248, 139, 123);
}

.loginButton {
  margin-top: 5%;
}

.loginButton {
  width: 30%;
  height: 30px;
  background-color: blanchedalmond;
  color: brown;
}

.loginButton:hover {
  background-color: black;
}

.resetLink {
  margin-top: 5%;
  margin-bottom: 3%;
  text-align: center;
}

.resetLink:hover {
  color: rgb(255, 0, 0);
}
</style>
