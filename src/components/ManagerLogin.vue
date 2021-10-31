<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md3>
        <div style="text-align: center">
          <img src="../assets/lock.png" alt="lock-image" />
        </div>
        <v-card>
          <v-card-title>Manager Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="login" color="primary" tile>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
// @ is an alias to /src
import LoginDataService from "@/libs/LoginDataService.js";

export default {
  name: "DoctorLogin",

  data() {
    return {
      userId: null,
      email: null,
      password: null,
    };
  },

  methods: {
    login() {
      LoginDataService.managerLogin(this.email, this.password)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            this.userId = response.data.id;
            this.$router.push("/manager-dashboard/");
          }
        })
        .catch((error) => {
          alert("Invalid credentials");
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
