<script setup>
import { ref, onMounted } from "vue";
const basicUrl = "http://localhost:3000/";
const absentAry = ref([]);
const jwtToken = localStorage.getItem("token");
const inputDate = ref("");
const absentSwitch = ref(true);
const blockSwitch = ref(true);
async function getAbsent() {
  try {
    absentSwitch.value = !absentSwitch.value;
    const resJson = await fetch(`${basicUrl}/admin/absent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        workTime: inputDate.value,
      }),
    });
    const response = await resJson.json();
    absentAry.value = [...response.message];
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="inputDate">
    <input
      type="date"
      :value="inputDate"
      v-on:input="(event) => (inputDate = event.target.value)"
    />
  </div>
  <div class="switchButton">
    <button @click="getAbsent">打卡異常</button>
    <button>上鎖</button>
  </div>

  <div v-if="absentSwitch" class="employeeAbsent">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        <div v-for="element in absentAry" class="absentAry">
          <tr>
            <td>{{ element.userId }}</td>
            <td>{{ element.name }}</td>
            <td>{{ element.startTime }}</td>
            <td>202212121900</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </div>
      </tbody>
    </table>
  </div>
  <div v-if="blockSwitch" class="employeeBlock">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Acciunt</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Block</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Id</td>
          <td>Eruc</td>
          <td>eruc101010</td>
          <td>202212121000</td>
          <td>202212121900</td>
          <td>
            Yes
            <button>unlock</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.employeeBlock {
  width: 70%;
  margin: auto;
  margin-top: 5%;
}

.employeeAbsent {
  width: 70%;
  margin: auto;
  margin-top: 5%;
}
table {
  table-layout: fixed;
  border: 3px solid;
  width: 100%;
}

td {
  padding: 10px;
}
.inputDate {
  margin: auto;
  margin-top: 4%;
  width: 300px;
}

.inputDate,
input {
  width: 300px;
}

.switchButton {
  width: 300px;
  margin: auto;
  margin-top: 1%;
}
</style>
