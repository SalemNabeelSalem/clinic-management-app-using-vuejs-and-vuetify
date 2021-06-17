<template>
  <div id="employees"><h1 class="text-center">Employees Page</h1></div>
</template>

<script>
import EmployeeDataService from "@/lib/EmployeeDataService.js";

export default {
  name: "Employees",

  components: {},

  mounted() {
    this.load();
  },

  methods: {
    load() {
      EmployeeDataService.findAllEmployees()
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
