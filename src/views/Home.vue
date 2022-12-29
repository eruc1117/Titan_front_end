<script setup>
import { ref } from "vue";
import QRCodeVue3 from "qrcode-vue3";
import { useGeolocation } from "@vueuse/core";
const { coords, locatedAt, error, resume, pause } = useGeolocation();
const basicUrl = "http://localhost:3000";
const jwtToken = localStorage.getItem("token");
const startTime = ref("--:--:--");
const endTime = ref("--:--:--");
let qrCodeUrl = "";
const userId = ref("");
const qrcodeValue = ref(`${basicUrl}/checkIn/qrCode/${qrCodeUrl}/${1}`);
async function preQrcode() {
  fetch(`${basicUrl}/checkIn/preQrCode/${1}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      qrCodeUrl = response.message.urlVerCode;
      qrcodeValue.value = `${basicUrl}/checkIn/qrCode/${qrCodeUrl}/${1}`;
    })
    .catch((error) => console.error("Error:", error));
}

async function checkIn() {
  fetch(`${basicUrl}/checkIn/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      userId: 1,
      location: {
        latitude: coords.value.latitude,
        longitude: coords.value.longitude,
      },
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.startTime !== "Invalid date") {
        startTime.value = response.startTime.split(" ")[1];
      }
      if (response.endTime !== "Invalid date") {
        endTime.value = response.endTime.split(" ")[1];
      }
    })
    .catch((error) => console.error("Error:", error));
}
</script>

<template>
  <div class="checkDiv">
    <button class="checkButton" @click="checkIn">簽到</button>
    <div>
      <QRCodeVue3 :width="100" :height="100" :value="qrcodeValue" />
    </div>
    <button class="qrCodeButton" @click="preQrcode">QR code</button>
    <div class="timePoint">
      <p>上班時間</p>
      <p>{{ startTime }}</p>
    </div>
    <div class="timePoint">
      <p>下班時間</p>
      <p>{{ endTime }}</p>
    </div>
  </div>
</template>

<style scoped>
.checkDiv {
  width: 30%;
  margin: auto;
  margin-top: 5%;
  background-color: rgb(175, 212, 241);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkButton {
  width: 100px;
  margin-top: 4%;
  height: 100px;
  border-radius: 100%;
}

.qrCodeButton {
  width: 50px;
  margin-top: 4%;
  height: 50px;
  border-radius: 100%;
}

.timePoint {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50px;
  width: 50%;
  margin-bottom: 1%;
}

.timePoint > p {
  line-height: 50px;
  margin-top: 0%;
  margin-left: 5%;
}
</style>
