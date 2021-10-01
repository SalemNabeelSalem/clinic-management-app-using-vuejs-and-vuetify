<template>
  <div class="reports">
    <div class="text-center">
      <h1>Numbers of Users:</h1>
      <pie-chart :download="true" :data="chartData"></pie-chart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Reports",

  data: () => ({
    chartData: { Doctors: 6, Receptionist: 5, Laboratories: 10, Managers: 1 },
  }),
};
</script>
