<template>
  <div id="laboratory-dashboard">
    <v-app>
      <nav>
        <v-toolbar>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Laboratory Dashboard</v-toolbar-title>

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
                {{ currentLaboratory.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle class="yellow--text font-weight-medium">
                {{ currentLaboratory.email }}
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
import LaboratoryDataService from "@/libs/LaboratoryDataService.js";
import Footer from "../components/global/Footer.vue";

export default {
  name: "LaboratoryDashboard",

  components: {
    Footer,
  },

  data: () => ({
    drawer: false,

    selectedItem: 1,

    labId: null,

    items: [
      {
        text: "Patients-Dignostic",
        icon: "mdi-heart-pulse",
        link: "",
      },
    ],

    currentLaboratory: {
      fullName: "",
      email: "",
    },
  }),

  mounted() {
    this.getLaboratoryIdFromUrlParameters();
    this.getCurrentLaboratory();
  },

  methods: {
    getLaboratoryIdFromUrlParameters() {
      this.labId = this.$route.params.labId;

      this.items[0]["link"] =
        "/laboratory-dashboard/" + this.labId + "/patients-dignostics";
    },

    getCurrentLaboratory() {
      LaboratoryDataService.findLaboratoryById(this.labId)
        .then((response) => {
          this.currentLaboratory = response.data;
          console.log(this.currentLaboratory);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
