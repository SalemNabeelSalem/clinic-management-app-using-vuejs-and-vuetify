<template>
  <div class="reports">
    <pie-chart :download="true" :data="chartData"></pie-chart>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Reports",

  data: () => ({
    chartData: { doctors: 6, Receptionist: 5 },
  }),
};
</script>
