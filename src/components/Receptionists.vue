<template>
  <div id="receptionists">
    <hr />

    <h1 class="text-center">Receptionists Page</h1>

    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>CRUD Operations</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Receptionist
              </v-btn>
            </template>

            <v-card v-if="formTitle === 'New Receptionist'">
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

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.userName"
                        label="Username"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.password"
                        label="Password"
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

            <v-card v-if="formTitle === 'Edit Receptionist'">
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

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">
                Are you sure want to delete employee no:
                <span class="red--text"> {{ editedItem.id }}</span> ?
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

      <template slot="item.switch" slot-scope="{ item }">
        <v-switch
          :input-value="item.isActive"
          color="success"
          @click.stop="setReceptionistActivity(item.id, !item.isActive)"
        ></v-switch>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          class="mt-4"
        >
          There Are No Receptionist.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ReceptionistDataService from "@/libs/ReceptionistDataService.js";

export default {
  name: "Receptionists",

  components: {},

  data: () => ({
    dialog: false,

    dialogDelete: false,

    // data-table headers;
    headers: [
      { text: "Employee.No", value: "id" },
      {
        text: "Full-Name",
        align: "start",
        sortable: false,
        value: "fullName",
      },
      { text: "Gender", value: "gender", sortable: false },
      { text: "Phone-Number", value: "phone", sortable: false },
      { text: "Email-Address", value: "email", sortable: false },
      { text: "Created Time", value: "createdAt" },
      { text: "Last Update Time", value: "updatedAt" },
      { text: "Account Activity", value: "isActive" },
      { text: "Deactivate/Activate", value: "switch", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],

    genders: ["MALE", "FEMALE"],

    desserts: [],

    editedIndex: -1,

    newItem: {
      fullName: "",
      gender: "",
      phone: "",
      email: "",
      userName: "",
      password: "",
    },

    customerEdit: {
      fullName: "",
      gender: "",
      phone: "",
      email: "",
    },

    editedItem: {
      fullName: "",
      gender: "",
      phone: "",
      email: "",
    },

    defaultItem: {
      fullName: "",
      gender: "",
      phone: "",
      email: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Receptionist" : "Edit Receptionist";
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
    this.loadRecords();
  },

  methods: {
    // load records from database;
    loadRecords() {
      ReceptionistDataService.findAllReceptionists()
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
      console.info("NEW RECEPTIONIST REQUEST: ");

      console.log(item);

      ReceptionistDataService.createNewReceptionist(item)
        .then((response) => {
          this.loadRecords();

          console.log("NEW RECEPTIONIST RESPONSE: ");

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      this.newItem = Object.assign({}, this.defaultItem);

      this.close();
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
        this.customerEdit.fullName = this.editedItem.fullName;
        this.customerEdit.gender = this.editedItem.gender;
        this.customerEdit.phone = this.editedItem.phone;
        this.customerEdit.email = this.editedItem.email;

        console.log("UPDATED RECEPTIONIST REQUEST: ");

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
      } else {
        this.desserts.push(this.editedItem);

        console.log("THE NEW RECEPTIONIST DATA: " + this.newItem);
      }
      this.close();
    },

    setReceptionistActivity(receptionistId, activityValue) {
      if (activityValue === false) {
        ReceptionistDataService.deactivateReceptionist(receptionistId)
          .then((response) => {
            this.loadRecords();

            console.log("DEACTIVATE RECEPTIONIST WITH ID: " + receptionistId);

            console.log(response.status);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (activityValue === true) {
        ReceptionistDataService.activateReceptionist(receptionistId)
          .then((response) => {
            this.loadRecords();

            console.log("ACTIVATE RECEPTIONIST WITH ID: " + receptionistId);

            console.log(response.status);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
