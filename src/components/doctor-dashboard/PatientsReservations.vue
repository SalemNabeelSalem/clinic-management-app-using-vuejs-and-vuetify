<template>
  <div id="patients-reservations">
    <v-container>
      <v-row dense>
        <v-col
          cols="4"
          v-for="patientsReservation in patientsReservations"
          :key="patientsReservation.id"
        >
          <v-card color="#546E7A" dark outlined shaped>
            <v-card-title class="text-h5">
              {{ patientsReservation.fullName }}
            </v-card-title>

            <v-card-subtitle class="mt-1 text-capitalize" color="white">
              {{ patientsReservation.feeling }}
            </v-card-subtitle>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientsReservation.gender }}
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientsReservation.age }} Years Old
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientsReservation.createdAt }}
            </v-chip>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn text color="orange" class="text-capitalize">
                write check
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DoctorDataService from "@/libs/DoctorDataService.js";

export default {
  name: "PatientsReservations",

  data() {
    return {
      doctorId: "",
      patientsReservations: [],
    };
  },

  mounted() {
    this.getDoctorIdFromUrl();
    this.loadPatientsReservations();
  },

  methods: {
    getDoctorIdFromUrl() {
      this.doctorId = this.$route.params.doctorId;
    },

    loadPatientsReservations() {
      DoctorDataService.findAllPatientsReservationsOfDoctor(this.doctorId)
        .then((response) => {
          this.patientsReservations = response.data;
          console.log(this.patientsReservations);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
