<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md3>
        <div style="text-align: center">
          <img src="../assets/lock.png" alt="lock-image" />
        </div>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field label="Email"></v-text-field>
            <v-text-field type="password" label="Password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" tile>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "login",
};
</script>

<style lang="scss" scoped></style>
