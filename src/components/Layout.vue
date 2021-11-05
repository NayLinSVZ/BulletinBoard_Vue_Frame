<template>
   <v-app>
    <v-card color="lighten-4" flat tile>
      <v-app-bar dark color="primary" fixed>
        <v-container>
          <v-row>
            <v-toolbar-title class="title mr-2">
               <router-link :to="{ name: 'post-list' }" class="title-txt">
                 {{ title }}
               </router-link>
              <!-- <span>{{ title }}</span> -->
            </v-toolbar-title>
            <v-btn class="ma-2" text v-if="isLoggedIn && userType == -1" :to="{ name: 'user-list' }">
              Users 
            </v-btn>
            <v-btn class="ma-2" text :to="{ name: 'post-list' }">
              Posts
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" text v-if="isLoggedIn && userType == -1"  :to="{ name: 'user-register' }">
              Create User 
            </v-btn>
            <div class="route-links">
                
              <v-menu offset-y v-if="isLoggedIn">
                  
                <template v-slot:activator="{ on }">
                  <v-btn class="ma-2" text v-on="on">
                    {{ userName }}
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="showProfile()">
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="logout()">
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <router-link
                class="route-link"
                :to="{ name: 'login' }"
                v-if="!isLoggedIn"
                >Login</router-link
              >
            </div>
          </v-row>
        </v-container>
      </v-app-bar>
      <v-container class="mt-16 ">
        <router-view></router-view>
      </v-container>
    </v-card>
  </v-app>
 
</template>

<script src="../services/components/layout.js"></script>

<style scoped src="../assets/css/components/layout.css"></style>
