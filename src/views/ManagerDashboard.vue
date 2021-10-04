<template>
  <div id="manager-dashboard">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list shaped>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Manager Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon to="/">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>

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
import Footer from "@/components/global/Footer";

export default {
  name: "Manager-Dashboard",

  components: { Footer },

  data: () => ({
    drawer: false,

    selectedItem: 1,

    items: [
      {
        text: "Receptionists",
        icon: "mdi-account",
        link: "/manager-dashboard/receptionists",
      },
      {
        text: "Doctors",
        icon: "mdi-doctor",
        link: "/manager-dashboard/doctors",
      },
      {
        text: "Laboratories",
        icon: "mdi-beaker-question",
        link: "/manager-dashboard/laboratories",
      },
      {
        text: "Managers",
        icon: "mdi-account-hard-hat",
        link: "/manager-dashboard/managers",
      },
      {
        text: "Reports",
        icon: "mdi-layers-search-outline",
        link: "/manager-dashboard/reports",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
