<template>
  <v-app>
    <div id="patient-check">
      <div class="row" v-if="!isPatientCheckExisting">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                <i class="fas fa-user-md"></i>
                Patient Check
              </h4>
            </div>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check">Patient Check</label>
                      <textarea
                        class="form-control"
                        id="patient-check"
                        rows="3"
                        placeholder="Patient Check"
                        v-model="newPatientCheck.check"
                        required
                        style="resize: none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check-prescription"
                        >Patient Prescription</label
                      >
                      <textarea
                        class="form-control"
                        id="patient-check-prescription"
                        rows="3"
                        placeholder="Patient Prescription"
                        v-model="newPatientCheck.prescription"
                        required
                        style="resize: none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check-remarks">Patient Remarks</label>
                      <textarea
                        class="form-control"
                        id="patient-check-remarks"
                        rows="3"
                        placeholder="Patient Remarks"
                        v-model="newPatientCheck.remarks"
                        required
                        style="resize: none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check-date">Patient Date</label>
                      <b-form-datepicker
                        id="patient-check-dater"
                        v-model="newPatientCheck.date"
                        class="mb-2 form-control"
                      ></b-form-datepicker>
                      <p>Value: '{{ newPatientCheck.date }}'</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check-submit">Check Submit</label>
                      <input
                        type="button"
                        class="form-control"
                        id="patient-check-submit"
                        value="Check Submit"
                        @click="submitNewPatientCheck"
                        style="background-color: #2e7d32; color: white"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <b-jumbotron>
          <template #header>
            <span class="text-capitalize">
              {{ existingPatientCheck.checking }}
            </span>
          </template>

          <template #lead>
            <span class="text-capitalize text-success">
              {{ existingPatientCheck.prescription }}
            </span>
          </template>

          <template>
            <span class="text-capitalize text-primary">
              {{ existingPatientCheck.date }}
            </span>
          </template>

          <hr class="my-4" />

          <p>
            {{ existingPatientCheck.remarks }}
          </p>
        </b-jumbotron>
      </div>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import PatientCheckDataService from "@/libs/PatientCheckDataService";

export default {
  name: "patient-check",

  data() {
    return {
      isPatientCheckExisting: false,

      doctorId: "",

      reservationId: "",

      newPatientCheck: {
        doctorId: "",
        reservationId: "",
        check: "",
        prescription: "",
        remarks: "",
        date: "",
      },

      existingPatientCheck: {
        doctorId: "",
        reservationId: "",
        checking: "",
        prescription: "",
        remarks: "",
        date: "",
      },
    };
  },

  mounted() {
    this.getDoctorId();
    this.getReservationId();
    this.findPatientCheckByReservationId();
  },

  methods: {
    getDoctorId() {
      this.doctorId = this.$route.params.doctorId;
      console.log(`doctorId: ${this.doctorId}`);
    },

    getReservationId() {
      this.reservationId = this.$route.params.reservationId;
      console.log(`reservationId: ${this.reservationId}`);
    },

    submitNewPatientCheck() {
      this.newPatientCheck.doctorId = this.doctorId;
      this.newPatientCheck.reservationId = this.reservationId;

      if (this.newPatientCheck.check == "") {
        alert("Please fill in the Patient Check");
      } else if (this.newPatientCheck.prescription == "") {
        alert("Please fill in the Patient Prescription");
      } else if (this.newPatientCheck.remarks == "") {
        alert("Please fill in the Patient Remarks");
      } else if (this.newPatientCheck.date == "") {
        alert("Please fill in the Patient Date");
      } else {
        this.createNewPatientCheck();
        this.$router.go();
      }
    },

    findPatientCheckByReservationId() {
      PatientCheckDataService.findPatientCheckByReservationId(
        this.reservationId
      )
        .then((response) => {
          // console.log(response.data);

          if (response.data.id != null) {
            this.isPatientCheckExisting = true;

            this.existingPatientCheck = response.data;

            // console.log(this.existingPatientCheck);
          } else {
            this.isPatientCheckExisting = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createNewPatientCheck() {
      PatientCheckDataService.createNewPatientCheck(this.newPatientCheck)
        .then((response) => {
          console.log(response.status);
          this.newPatientCheck = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
