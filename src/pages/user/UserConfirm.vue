<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Register Confirm
      </v-card-title>
      <form @submit.prevent="confirmUser">
        <v-row>
          <v-col cols="4" class="text-right">
            Name
          </v-col>
          <v-col cols="6">
            <v-text-field readonly v-model="createUserData.name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            E-Mail Address
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="createUserData.email" readonly>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Password
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="createUserData.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              :type="show ? 'text' : 'password'"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Password Confirmation
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="createUserData.confirmPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Type
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="type" readonly></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Phone
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="createUserData.phone"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Date Of Birth
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="createUserData.dob"
              readonly
              prepend-icon="mdi-calendar"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Address
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="createUserData.address"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-right">
            Profile
          </v-col>
          <v-col cols="6">
            <v-img :src="url" class="profile"></v-img>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-right">
            <v-btn @click="cancelUserForm" class="mr-4 error">
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn type="submit" class="success">
              Confirm
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-container>
</template>
<script src="../../services/user/user-reg-confirm.js"></script>

<style scoped>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.v-text-field input {
  padding: 0;
}
.profile {
  height: auto;
  width: 200px;
}
</style>
