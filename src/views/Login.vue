<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const basicUrl = "http://localhost:3000";

const account = ref("");
const password = ref("");
const router = useRouter();
async function login() {
  try {
    if (!("" === account.value) && !("" === password.value)) {
      let loginRes = await fetch(`${basicUrl}/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account: account.value,
          password: password.value,
        }),
      });
      loginRes = await loginRes.json();
      localStorage.setItem("token", loginRes.message.token);
      localStorage.setItem("userId", loginRes.message.userId);
      if (loginRes.message.login === "true") {
        if (loginRes.message.admin !== 1) {
          router.push("/home");
        } else if (loginRes.message.admin === 1) {
          router.push("/admin");
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="login">
    <div class="inputDiv">
      <label>Account</label>
      <input
        type="text"
        :value="account"
        v-on:input="(event) => (account = event.target.value)"
      />
    </div>
    <div class="inputDiv">
      <label>Password</label>
      <input
        type="text"
        :value="password"
        v-on:input="(event) => (password = event.target.value)"
      />
    </div>
    <button class="loginButton" @click="login">Login</button>
    <a href="/resetPassword" class="resetLink">Forget password</a>
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
