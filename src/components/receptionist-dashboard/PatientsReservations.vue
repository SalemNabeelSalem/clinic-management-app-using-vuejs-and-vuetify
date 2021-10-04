<template>
  <div id="patients-reservations">
    <hr />

    <h1 class="text-center">Patients Reservations Page</h1>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Reservation
              </v-btn>
            </template>

            <v-card v-if="formTitle === 'New Reservation'">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.fullName"
                        label="Full-Name"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="genders"
                        label="Gender"
                        v-model="newItem.gender"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.age"
                        label="Age"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.phone"
                        label="Phone-Number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.email"
                        label="Email-Address"
                      ></v-text-field>
                    </v-col>

                    <!-- TODO: Using Text-Area -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.feeling"
                        label="Feeling"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>

                <v-btn color="blue darken-1" text @click="newRecord(newItem)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card v-if="formTitle === 'Edit Reservation'">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fullName"
                        label="Full-Name"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="genders"
                        label="Gender"
                        v-model="editedItem.gender"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.age"
                        label="Age"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone-Number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email-Address"
                      ></v-text-field>
                    </v-col>

                    <!-- TODO: Using Text-Area -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.feeling"
                        label="Feeling"
                      ></v-text-field>
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
                <span class="red--text">{{ editedItem.fullName }}</span> &nbsp;?
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

          <v-dialog v-model="dialogEmailMessage" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Send Email Message</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="sendEmailMessageItem.emailAddress"
                        label="Email-Address"
                        required
                        readonly
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="sendEmailMessageItem.senderName"
                        label="Sender-Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="sendEmailMessageItem.messageContent"
                        label="Message-Content"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogEmailMessage = false"
                >
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="sendEmailMessage()">
                  Send
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="emailMessageDialog(item)" class="orange--text">
          mdi-message
        </v-icon>

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
          There Are No Patients Reservations.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import PatientReservationDataService from "@/libs/PatientReservationDataService.js";
import NotificationsDataService from "@/libs/NotificationsDataService";

export default {
  name: "Patients-Reservations",

  data: () => ({
    receptionistId: null,

    dialog: false,

    dialogDelete: false,

    dialogEmailMessage: false,

    search: "",

    headers: [
      // TODO: Using Incrementing Counter Instead of ID.
      { text: "Reservation.No", value: "id" },
      {
        text: "Full-Name",
        align: "start",
        sortable: false,
        value: "fullName",
      },
      { text: "Gender", value: "gender", sortable: false },
      { text: "Age", value: "age", sortable: true },
      { text: "Phone-Number", value: "phone", sortable: false },
      { text: "Email-Address", value: "email", sortable: false },
      { text: "Feeling", value: "feeling", sortable: false },
      { text: "Created Time", value: "createdAt" },
      { text: "Last Update Time", value: "updatedAt" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    genders: ["MALE", "FEMALE"],

    desserts: [],

    editedIndex: -1,

    sendEmailMessageItem: {
      emailAddress: "",
      senderName: "",
      messageContent: "",
    },

    newItem: {
      fullName: "",
      gender: "",
      age: "",
      phone: "",
      email: "",
      feeling: "",
    },

    customerEdit: {
      fullName: "",
      gender: "",
      age: "",
      phone: "",
      email: "",
      feeling: "",
    },

    editedItem: {
      fullName: "",
      gender: "",
      age: "",
      phone: "",
      email: "",
      feeling: "",
    },

    defaultItem: {
      fullName: "",
      gender: "",
      age: "",
      phone: "",
      email: "",
      feeling: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Reservation" : "Edit Reservation";
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
    this.loadRecords();
  },

  mounted() {
    this.getRecepIdFromUrlParameters();
    this.loadRecords();
  },

  methods: {
    getRecepIdFromUrlParameters() {
      this.receptionistId = this.$route.params.recepId;
    },

    // load records from database;
    loadRecords() {
      PatientReservationDataService.findAllPatientsReservationsByReceptionistId(
        this.receptionistId
      )
        .then((response) => {
          this.desserts = response.data;

          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // add new record into database;
    newRecord(item) {
      console.log("NEW PATIENT RESERVATION REQUEST: ");

      console.log(item);

      PatientReservationDataService.createNewPatientReservation(
        this.receptionistId,
        item
      )
        .then((response) => {
          this.loadRecords();

          console.log("NEW PATIENT RESERVATION RESPONSE: ");

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      this.newItem = Object.assign({}, this.defaultItem);

      this.close();
    },

    emailMessageDialog(item) {
      this.sendEmailMessageItem["emailAddress"] = Object.assign({}, item)[
        "email"
      ];

      this.dialogEmailMessage = true;
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

      PatientReservationDataService.deletePatientReservation(
        this.receptionistId,
        deletedItem.id
      )
        .then((response) => {
          this.loadRecords();

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(
        "DELETE PATIENT RESERVATION NO: [" +
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

    sendEmailMessage() {
      NotificationsDataService.sendEmailMessage(this.sendEmailMessageItem)
        .then((response) => {
          this.loadRecords();

          console.log("SEND EMAIL MESSAGE: ");

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      this.sendEmailMessageItem = {};

      this.dialogEmailMessage = false;
    },

    save() {
      if (this.editedIndex > -1) {
        let updatedItem = this.desserts[this.editedIndex];

        // customer data modeling;
        this.customerEdit.fullName = this.editedItem.fullName;
        this.customerEdit.gender = this.editedItem.gender;
        this.customerEdit.age = this.editedItem.age;
        this.customerEdit.phone = this.editedItem.phone;
        this.customerEdit.email = this.editedItem.email;
        this.customerEdit.feeling = this.editedItem.feeling;

        console.log("UPDATED PATIENT RESERVATION REQUEST: ");

        console.log(this.customerEdit);

        PatientReservationDataService.updatePatientReservation(
          this.receptionistId,
          updatedItem.id,
          this.customerEdit
        )
          .then((response) => {
            this.loadRecords();

            console.log("UPDATED PATIENT RESERVATION RESPONSE: ");

            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });

        Object.assign(this.desserts[this.editedIndex], this.editedItem);

        console.log(
          "EDITED PATIENT RESERVATION NO: [" +
            updatedItem.id +
            "] WITH FULL-NAME: [" +
            updatedItem.fullName +
            "]."
        );
      } else {
        this.desserts.push(this.editedItem);

        console.log("THE NEW PATIENT RESERVATION DATA: " + this.newItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
