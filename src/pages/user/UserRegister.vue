<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Register
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitUser)">
          <v-row>
            <v-col cols="4" class="text-right">
              Name <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                :rules="{
                  required: true,
                  max: 255,
                }"
              >
                <v-text-field
                  v-model="userData.name"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              E-Mail Address <span class="rq">*</span>
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
                <v-text-field v-model="userData.email" :error-messages="errors">
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Password <span class="rq">*</span>
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
                  v-model="userData.password"
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
                  is: userData.password,
                }"
              >
                <v-text-field
                  v-model="userData.confirmPassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :type="show1 ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Type
            </v-col>
            <v-col cols="6">
              <v-select v-model="userData.role" :items="items"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Phone
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="phone number"
                :rules="{
                  digits: 11,
                  regex: '^(09)\\d{9}$',
                }"
              >
                <v-text-field
                  v-model="userData.phone"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Date Of Birth
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="userData.dob"
                    readonly
                    v-bind="attrs"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="userData.dob"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1990-01-01"
                  @change="$refs.menu.save(userData.dob)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Address
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Address"
                :rules="{
                  max: 255,
                }"
              >
                <v-text-field
                  v-model="userData.address"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Profile <span class="rq">*</span>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Profile Photo"
                :rules="{
                  required: true,
                  image: true,
                  size: 2048,
                }"
              >
                <v-file-input
                  v-model="userData.profile"
                  :error-messages="errors"
                  prepend-icon="mdi-camera"
                  accept="image/*"
                ></v-file-input>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row v-if="userValidateMsg">
            <v-col>
              <v-alert
                v-for="(value, index) in userValidateMsg"
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
              <v-btn @click="resetUserForm" type="reset" class="mr-4 error">
                Reset
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                submit
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script src="../../services/user/user-register.js"></script>

<style>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.v-text-field input {
  padding: 4px;
}
.rq {
  color: red;
}
</style>
