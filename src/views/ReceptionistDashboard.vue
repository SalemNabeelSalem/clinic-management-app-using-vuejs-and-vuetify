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
          <v-subheader class="white--text text-capitalize text-h6">
            sections
          </v-subheader>

          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
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

      <p>Hello</p>
      <span class="iconify" data-icon="maki:doctor"></span>
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
        icon: "mdi-doctor",
        link: "TEST1",
      },
      {
        text: "TEST2",
        icon: "mdi-account",
        link: "TEST2",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
