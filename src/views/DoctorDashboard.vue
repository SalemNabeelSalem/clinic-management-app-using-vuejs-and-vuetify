<template>
  <div id="doctor-dashboard">
    <v-app>
      <nav>
        <v-toolbar>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Doctor Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon to="/">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-toolbar>
      </nav>

      <v-navigation-drawer app v-model="drawer" class="primary">
        <v-list shaped>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6 white--text">
                {{ currentDoctor.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle class="yellow--text font-weight-medium">
                {{ currentDoctor.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-subheader class="white--text text-capitalize text-h6">
            sections
          </v-subheader>

          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon class="red--text" v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  v-text="item.text"
                  class="white--text font-weight-medium"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-container fluid fill-height>
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-container>

      <Footer />
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
import DoctorDataService from "@/libs/DoctorDataService.js";
import Footer from "../components/global/Footer.vue";

export default {
  components: { Footer },
  name: "Doctor-Dashboard",

  data: () => ({
    drawer: false,

    selectedItem: 1,

    doctorId: null,

    items: [
      {
        text: "Patients-Reservations",
        icon: "mdi-emoticon-sick-outline",
        link: "",
      },
      {
        text: "Patients-Checks",
        icon: "mdi-heart-pulse",
        link: "",
      },
    ],

    currentDoctor: {
      fullName: "",
      email: "",
    },
  }),

  mounted() {
    this.getDoctorIdFromUrlParameters();
    this.getCurrentDoctor();
  },

  methods: {
    getDoctorIdFromUrlParameters() {
      this.doctorId = this.$route.params.doctorId;

      this.items[0]["link"] =
        "/doctor-dashboard/" + this.doctorId + "/patients-reservations";

      this.items[1]["link"] =
        "/doctor-dashboard/" + this.doctorId + "/patients-checks";
    },

    getCurrentDoctor() {
      DoctorDataService.findDoctorById(this.doctorId)
        .then((response) => {
          this.currentDoctor = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
