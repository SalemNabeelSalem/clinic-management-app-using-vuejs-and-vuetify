<template>
  <div id="manager">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-system-bar></v-system-bar>

        <v-list shaped>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Anwar Nasser
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-subheader>Control Panel</v-subheader>

          <v-divider></v-divider>

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
      </v-app-bar>

      <v-container fluid fill-height>
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "manager",

  components: {},

  data: () => ({
    // v-app settings:
    drawer: false,

    // v-list settings:
    selectedItem: 1,
    items: [
      {
        text: "Employees",
        icon: "mdi-account",
        link: "/manager/employees",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
