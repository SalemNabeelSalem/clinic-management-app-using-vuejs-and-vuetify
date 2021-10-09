<template>
  <div id="patients-checks">
    <v-container>
      <v-row dense>
        <v-col cols="4">
          <v-card color="#546E7A" dark outlined shaped>
            <v-card-title class="text-h5"> Jamila Mustafa Ahmed </v-card-title>

            <v-card-subtitle class="mt-1" color="white">
              She is very sick.
            </v-card-subtitle>

            <v-chip class="ma-2" color="green" text-color="white">
              Female
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              32 Years Old
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              2021-10-09 08:47:23
            </v-chip>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn text color="orange" class="text-capitalize">
                write check
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PatientsChecks",
};
</script>

<style lang="scss" scoped></style>
