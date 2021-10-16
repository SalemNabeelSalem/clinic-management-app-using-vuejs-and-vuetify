<template>
  <div id="patients-reservations">
    <v-container>
      <v-row dense>
        <v-col
          cols="4"
          v-for="patientReservation in patientsReservations"
          :key="patientReservation.id"
        >
          <v-card color="#546E7A" dark outlined shaped>
            <v-card-title class="text-h5">
              {{ patientReservation.fullName }}
            </v-card-title>

            <v-card-subtitle class="mt-1 text-capitalize" color="white">
              {{ patientReservation.feeling }}
            </v-card-subtitle>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientReservation.gender }}
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientReservation.age }} Years Old
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              {{ patientReservation.createdAt }}
            </v-chip>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn
                text
                color="orange"
                class="text-capitalize"
                @click="routeToPatientCheck(patientReservation.id)"
              >
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

    routeToPatientCheck(patientReservationId) {
      var urlPath = `/doctor-dashboard/${this.doctorId}/patients-reservations/${patientReservationId}/check`;

      this.$router.push({
        path: urlPath,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
