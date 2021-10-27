<template>
  <div id="patients-checks">
    <hr />

    <h1 class="text-center">Patients Checks Page</h1>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-toolbar flat>
          <v-toolbar-title>CRUD Operations</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card v-if="formTitle === 'Edit Patient Check'">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.checking"
                        label="Checking"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.prescription"
                        label="Prescription"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.remarks"
                        label="Remarks"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>

                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h6">
                Are you sure want to delete:&nbsp;
                <span class="red--text"> {{ editedItem.fullName }} </span>
                &nbsp;?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>

                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="editItem(item)" class="mx-1 green--text">
          mdi-pencil
        </v-icon>

        <v-icon small @click="deleteItem(item)" class="red--text">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          class="mt-4"
        >
          There Are No Patients Checks.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import PatientsChecks from "@/libs/PatientCheckDataService.js";
import ReceptionistDataService from "@/libs/ReceptionistDataService.js";

export default {
  name: "PatientsChecks",

  data: () => ({
    dialog: false,

    dialogDelete: false,

    dialogEmailMessage: false,

    search: "",

    doctorId: "",

    headers: [
      { text: "Check.No", value: "id" },
      { text: "Checking", value: "checking", sortable: false },
      { text: "Prescription", value: "prescription", sortable: false },
      { text: "Remarks", value: "remarks", sortable: false },
      { text: "Date", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    desserts: [],

    editedIndex: -1,

    customerEdit: {
      checking: "",
      prescription: "",
      remarks: "",
    },

    editedItem: {
      checking: "",
      prescription: "",
      remarks: "",
    },

    defaultItem: {
      checking: "",
      prescription: "",
      remarks: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New Patient Check"
        : "Edit Patient Check";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getDoctorId();
    this.loadRecords();
  },

  mounted() {},

  methods: {
    // load records from database;
    loadRecords() {
      PatientsChecks.findPatientsChecksByDoctorId(this.doctorId)
        .then((response) => {
          this.desserts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDoctorId() {
      this.doctorId = this.$route.params.doctorId;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let deletedItem = this.desserts[this.editedIndex];

      ReceptionistDataService.deleteReceptionist(deletedItem.id)
        .then((response) => {
          this.loadRecords();

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(
        "DELETE RECEPTIONIST NO: [" +
          deletedItem.id +
          "] WITH FULL-NAME: [" +
          deletedItem.fullName +
          "]."
      );

      // done: replace it with real fetch record from database;
      // this.desserts.splice(this.editedIndex, 1);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let updatedItem = this.desserts[this.editedIndex];

        // customer data modeling;
        this.customerEdit.checking = this.editedItem.checking;
        this.customerEdit.prescription = this.editedItem.prescription;
        this.customerEdit.remarks = this.editedItem.remarks;

        console.log("UPDATED PATIENT CHECK REQUEST: ");

        console.log(this.customerEdit);

        ReceptionistDataService.updateReceptionist(
          updatedItem.id,
          this.customerEdit
        )
          .then((response) => {
            this.loadRecords();

            console.log("UPDATED RECEPTIONIST RESPONSE: ");

            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });

        Object.assign(this.desserts[this.editedIndex], this.editedItem);

        console.log(
          "EDITED EMPLOYEE NO: [" +
            updatedItem.id +
            "] WITH FULL-NAME: [" +
            updatedItem.fullName +
            "]."
        );
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
