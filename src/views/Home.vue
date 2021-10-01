<template>
  <div id="home">
    <v-app>
      <v-container fluid class="pa-0">
        <v-row align="center">
          <v-col cols="12" sm="12" class="my-6">
            <div class="text-center">
              <div>
                <b-card
                  bg-variant="success"
                  text-variant="light"
                  title="Manager Dashboard"
                >
                  <b-card-text>
                    With supporting manager dashboard as a natural lead-in to
                    additional content.
                  </b-card-text>
                  <b-button href="/manager-dashboard" variant="light">
                    Go
                  </b-button>
                </b-card>
              </div>

              <div class="my-12">
                <b-card
                  bg-variant="success"
                  text-variant="light"
                  title="Doctor Dashboard"
                >
                  <b-card-text>
                    With supporting doctor dashboard as a natural lead-in to
                    additional content.
                  </b-card-text>
                  <b-button href="#" variant="light">Go</b-button>
                </b-card>
              </div>

              <div class="my-12">
                <b-card
                  bg-variant="success"
                  text-variant="light"
                  title="Laboratory Dashboard"
                >
                  <b-card-text>
                    With supporting laboratory dashboard as a natural lead-in to
                    additional content.
                  </b-card-text>
                  <b-button href="#" variant="light">Go</b-button>
                </b-card>
              </div>

              <div class="my-12">
                <b-card
                  bg-variant="success"
                  text-variant="light"
                  title="Receptionist Dashboard"
                >
                  <b-card-text>
                    With supporting receptionist dashboard as a natural lead-in
                    to additional content.
                  </b-card-text>
                  <b-button href="#" variant="light">Go</b-button>
                </b-card>
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
