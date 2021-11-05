<template>
  <v-container>
    <v-alert
      v-if="passwordResetMsg"
      color="green"
      type="success"
      elevation="3"
      text
    >
      Email Send with password reset instructions...Please Check UR Email
    </v-alert>
    <v-card class="mx-auto" max-width="450">
      <v-card-title class="login-title">
        <span class="title font-weight-light">Login</span>
      </v-card-title>
      <v-alert v-if="error" color="error" type="error" elevation="3" text>
        {{ error }}
      </v-alert>
      <v-form ref="form" v-model="valid" @submit.prevent="login" class="mt-7">
        <v-card-text>
          <div class="login-input">
            <v-text-field
              v-model="email"
              type="text"
              label="Email"
              :rules="emailRules"
              hide-details="auto"
              autocomplete="true"
            ></v-text-field>
          </div>
          <div class="login-input">
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              :rules="pwdRules"
              hide-details="auto"
              autocomplete="true"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" :disabled="!valid" color="primary" block
            >Login</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
          <v-spacer></v-spacer>
          <router-link to="login/reset">
            forgotten password?
          </router-link>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script src="../../services/pages/user/login.js"></script>

<style scoped src="../../assets/css/pages/user/login..css"></style>
