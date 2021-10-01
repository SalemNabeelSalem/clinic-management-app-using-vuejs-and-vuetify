<template>
  <div id="home">
    <v-app>
      <v-container fluid class="pa-0">
        <v-row align="center">
          <v-col cols="12" sm="12" class="my-12">
            <div class="text-center">
              <div class="my-12">
                <v-btn x-large color="primary" dark href="/manager-dashboard">
                  Manager Dashboard
                </v-btn>
              </div>

              <div class="my-12">
                <v-btn x-large color="primary" dark> Doctor Dashboard </v-btn>
              </div>

              <div class="my-12">
                <v-btn x-large color="primary" dark>
                  Laboratory Dashboard
                </v-btn>
              </div>

              <div class="my-12">
                <v-btn x-large color="primary" dark>
                  Receptionist Dashboard
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from "@/components/global/Footer";
export default {
  name: "Home",

  data: () => ({}),

  components: { Footer },
};
</script>

<style lang="scss" scoped></style>
