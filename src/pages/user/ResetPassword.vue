<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Forgot Password?
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(resetPassword)">
          <v-row>
            <v-col cols="4" class="text-right">
              E-Mail <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                :rules="{
                  required: true,
                  max: 255,
                  email: true,
                }"
              >
                <v-text-field
                  v-model="resetData.email"
                  :error-messages="errors"
                >
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row v-if="emailValidateMsg">
            <v-col>
              <v-alert
                v-for="(value, index) in emailValidateMsg"
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
                @click="cancelResetPassword"
                type="reset"
                class="mr-4 secondary"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                Reset Password
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script src="../../services/user/reset-password.js"></script>

<style></style>
