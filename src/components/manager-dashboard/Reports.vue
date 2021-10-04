<template>
  <div class="reports">
    <div class="text-center">
      <div class="mb-13 py-8" style="border: 1px solid blue">
        <h2 class="mb-8">Total Users by Type:</h2>
        <pie-chart :download="true" :data="usersChartData"></pie-chart>
      </div>

      <div class="mb-13 py-8" style="border: 1px solid blue">
        <h2 class="mb-8">Total Patients Reservations by Gender:</h2>
        <bar-chart
          :data="patientsReservationsChartData"
          :download="true"
        ></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Reports",

  data: () => ({
    usersChartData: {
      Doctors: 6,
      Receptionist: 5,
      Laboratories: 10,
      Managers: 1,
    },

    patientsReservationsChartData: [
      ["Total", 100],
      ["Male", 40],
      ["Female", 60],
    ],
  }),
};
</script>
