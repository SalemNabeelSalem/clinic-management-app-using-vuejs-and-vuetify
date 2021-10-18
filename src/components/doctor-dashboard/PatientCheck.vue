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
                      <input
                        type="date"
                        class="form-control"
                        id="patient-check-date"
                        placeholder="Patient Date"
                        v-model="newPatientCheck.date"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="patient-check-time">Patient Time</label>
                      <input
                        type="time"
                        class="form-control"
                        id="patient-check-time"
                        placeholder="Patient Time"
                        v-model="newPatientCheck.time"
                      />
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
            {{ existingPatientCheck.checking }}
          </template>

          <template #lead>
            {{ existingPatientCheck.prescription }}
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
        time: "",
      },

      existingPatientCheck: {
        doctorId: "",
        reservationId: "",
        checking: "",
        prescription: "",
        remarks: "",
        date: "",
        time: "",
      },
    };
  },

  mounted() {
    this.getDoctorId();
    this.getReservationId();
    this.getPatientCheck();
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
      } else if (this.newPatientCheck.time == "") {
        alert("Please fill in the Patient Time");
      } else {
        console.log(this.newPatientCheck);
      }
    },

    getPatientCheck() {
      PatientCheckDataService.findPatientCheckByReservationId(
        this.reservationId
      )
        .then((response) => {
          // console.log(response.data);

          if (response.data.id != null) {
            this.isPatientCheckExisting = true;

            this.existingPatientCheck = response.data;

            console.log(this.existingPatientCheck);
          } else {
            this.isPatientCheckExisting = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
