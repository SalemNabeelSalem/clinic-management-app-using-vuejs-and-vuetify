<template>
  <div class="receptionist-dashboard">
    <v-app>
      <nav>
        <v-toolbar>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Receptionist Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
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
                Anwar Nasser
              </v-list-item-title>
              <v-list-item-subtitle class="yellow--text font-weight-medium">
                john@vuetifyjs.com
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
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Receptionist-Dashboard",

  data: () => ({
    drawer: false,

    selectedItem: 1,

    items: [
      {
        text: "Patients-Reservations",
        icon: "mdi-hospital",
        link: "/recep-dashboard/" + 1 + "/patients-reservations",
      },
      {
        text: "Reports",
        icon: "mdi-chart-line",
        link: "/recep-dashboard/" + 1 + "/patients-reservations-reports",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
