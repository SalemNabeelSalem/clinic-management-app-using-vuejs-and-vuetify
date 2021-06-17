<template>
  <v-footer dark padless color="primary lighten-1">
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">
          B5IT Final Project Dr.Adel Salam [Clinic Application]
        </strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
  }),
};
</script>
