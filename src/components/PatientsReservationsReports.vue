<template>
  <div id="patients-reservations-reports">
    <v-app>
      <h1 class="text-center mb-3">Patients Reservations Reports Page</h1>

      <pie-chart :download="true" :data="chartData"></pie-chart>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Patients-Reservations-Reports",

  data: () => ({
    chartData: { doctors: 6, Receptionist: 5 },
  }),
};
</script>

<style lang="scss" scoped></style>
