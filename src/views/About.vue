<template>
  <div class="about">
    <pie-chart :download="true" :data="chartData"></pie-chart>
  </div>
</template>

<script>
export default {
  name: "About",

  components: {},

  data: () => ({
    chartData: { doctors: 6, Receptionist: 5 },
  }),
};
</script>
