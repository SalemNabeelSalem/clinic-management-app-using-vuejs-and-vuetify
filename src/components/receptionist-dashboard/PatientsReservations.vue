<template>
  <div id="patients-reservations">
    <h1 class="text-center">Patients Reservations Page</h1>

    <h1 class="text-center">Hello No: {{ receptionistId }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Patients-Reservations",

  data: () => ({
    receptionistId: null,
  }),

  mounted() {
    this.getRecepIdFromUrlParameters();
  },

  methods: {
    getRecepIdFromUrlParameters() {
      this.receptionistId = this.$route.params.recepId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
