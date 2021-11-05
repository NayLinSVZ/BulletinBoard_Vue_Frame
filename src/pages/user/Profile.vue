<template>
  <v-card max-width="800" class="mx-auto">
    <v-toolbar color="primary" dark>
      User Profile
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="4" class="text-center">
          <img width="150px" :src="profileImg" alt="" />
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="5">
              Name
            </v-col>
            <v-col cols="7">
              {{ userdetail.name }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Type
            </v-col>
            <v-col cols="7" v-if="userdetail.role == 1">
              User
            </v-col>
            <v-col cols="7" v-else>
              Admin
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Email
            </v-col>
            <v-col cols="7">
              {{ userdetail.email }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Phone
            </v-col>
            <v-col cols="7">
              {{ userdetail.phone }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Date Of Birth
            </v-col>
            <v-col cols="7">
              {{ userdetail.dob }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Address
            </v-col>
            <v-col cols="7">
              {{ userdetail.address }}
            </v-col>
          </v-row>

          <v-row>
            <v-btn class="primary" @click="editProfile">
              Edit Profile
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script src="../../services/user/user-profile.js"></script>

<style></style>
