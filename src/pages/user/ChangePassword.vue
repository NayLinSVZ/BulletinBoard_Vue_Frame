<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Change Password
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(changePassword)">
          <v-row>
            <v-col cols="4" class="text-right">
              Current Password <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Current Password"
                :rules="{
                  required: true,
                  max: 255,
                }"
              >
                <v-text-field
                  v-model="passwordData.currentpassword"
                  :append-icon="showCurrent ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showCurrent = !showCurrent"
                  :type="showCurrent ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              New Password <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Password"
                :rules="{
                  required: true,
                  max: 255,
                  min: 6,
                }"
              >
                <v-text-field
                  v-model="passwordData.newpassword"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  :type="show ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Password Confirmation <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Confirm Password"
                :rules="{
                  required: true,
                  is: passwordData.newpassword,
                }"
              >
                <v-text-field
                  v-model="passwordData.confirmpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :type="show1 ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row v-if="changePasswordValidateMsg">
            <v-col>
              <v-alert
                v-for="(value, index) in changePasswordValidateMsg"
                :key="index"
                color="red"
                type="error"
                elevation="3"
                text
              >
                {{ index + " : " + value }}
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn
                @click="cancelChangePassword"
                type="reset"
                class="mr-4 secondary"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                Update Password
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>
<script src="../../services/user/change-password.js"></script>

<style></style>
