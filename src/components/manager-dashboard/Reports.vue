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
import ReportsDataService from "@/libs/ReportsDataService";

export default {
  name: "Reports",

  data: () => ({
    usersChartData: {},

    patientsReservationsChartData: {},
  }),

  mounted() {
    this.usersChartDataReport();
    this.patientsReservationsChartDataReport();
  },

  methods: {
    usersChartDataReport() {
      ReportsDataService.usersChartData()
        .then((response) => {
          this.usersChartData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    patientsReservationsChartDataReport() {
      ReportsDataService.patientsReservationsChartData()
        .then((response) => {
          this.patientsReservationsChartData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
