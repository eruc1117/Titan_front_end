<template>
  <div class="employeeTable">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Acciunt</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Absent</th>
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
            No
            <button>Delete</button>
          </td>
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
.employeeTable {
  width: 70%;
  margin: auto;
  margin-top: 5%;
}
table {
  table-layout: fixed;
  border: 3px solid;
  width: 100%;
}

thead th:nth-child(1) {
  width: 15%;
}
thead th:nth-child(2) {
  width: 10%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 15%;
}

thead th:nth-child(5) {
  width: 15%;
}

thead th:nth-child(6) {
  width: 15%;
}

thead th:nth-child(7) {
  width: 15%;
}

th,
td {
  padding: 10px;
}
</style>
