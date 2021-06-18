<template>
  <div id="employees">
    <hr />

    <h1 class="text-center">Employees Pages</h1>

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
                New Employee
              </v-btn>
            </template>

            <v-card v-if="formTitle === 'New Employee'">
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
                      <v-text-field
                        v-model="newItem.gender"
                        label="Gender"
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
                        v-model="newItem.role"
                        label="User-Rule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.username"
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

            <v-card v-if="formTitle === 'Edit Employee'">
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
                      <v-text-field
                        v-model="editedItem.gender"
                        label="Gender"
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
                        v-model="editedItem.role"
                        label="User-Rule"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="Username"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
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

                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
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
          There Are No Employees.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import EmployeeDataService from "@/lib/EmployeeDataService.js";

export default {
  name: "Employees",

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
      { text: "User-Rule", value: "role", sortable: false },
      { text: "Created Time", value: "createdAt" },
      { text: "Last Update Time", value: "updatedAt" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    desserts: [],

    editedIndex: -1,

    newItem: {
      fullName: "",
      gender: "",
      username: "",
      password: "",
      phone: "",
      role: "",
    },

    editedItem: {
      fullName: "",
      gender: "",
      username: "",
      password: "",
      phone: "",
      role: "",
    },

    defaultItem: {
      fullName: "",
      gender: "",
      username: "",
      password: "",
      phone: "",
      role: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Employee" : "Edit Employee";
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
      EmployeeDataService.findAllEmployees()
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
      console.log(item);

      this.newItem = Object.assign({}, this.defaultItem);
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

      EmployeeDataService.deleteEmployee(deletedItem.id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(
        "DELETE EMPLOYEE NO: [" +
          deletedItem.id +
          "] WITH FULL-NAME: [" +
          deletedItem.fullName +
          "]."
      );

      this.desserts.splice(this.editedIndex, 1);

      this.loadRecords();

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

        console.log("THE NEW EMPLOYEE DATA: " + this.newItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
