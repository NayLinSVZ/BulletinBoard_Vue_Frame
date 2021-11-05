<template>
  <v-card>
    <div v-if="userSuccessMsg">
      <Msg
        :alertMsg="userSuccessMsg"
        :alertTxt="createAlertTxt"
        :msgCon="create"
      ></Msg>
    </div>
    <div v-if="userDeleteMsg">
      <Msg
        :alertMsg="userDeleteMsg"
        :alertTxt="deleteAlertTxt"
        :msgCon="dele"
      ></Msg>
    </div>
    <div v-if="userUpdateMsg">
      <Msg
        :alertMsg="userUpdateMsg"
        :alertTxt="updateAlertTxt"
        :msgCon="edit"
      ></Msg>
    </div>
    <div v-if="changePasswordMsg">
      <Msg
        :alertMsg="changePasswordMsg"
        :alertTxt="changePasswordTxt"
        :msgCon="change"
      ></Msg>
    </div>
    <v-toolbar color="primary" dark>
      User List
    </v-toolbar>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="filterUsers">
        <v-row class="filter-bar">
          <v-col>
            <v-text-field
              class="search-txt-field"
              label="name"
              hide-details="auto"
              v-model="search.name"
              @change="filterUsers"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="search-txt-field"
              label="email"
              hide-details="auto"
              v-model="search.email"
              @change="filterUsers"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="fromdate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fromdate"
                  label="From"
                  prepend-icon="mdi-calendar"
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="fromdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(fromdate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="todate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="todate"
                  label="To"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker v-model="todate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  Clear
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(todate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="2">
            <v-btn class="post-list-btn mr-4" type="submit" color="primary"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-title>
    <!-- List section -->
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.name`]="{ item }">
          <div>
            <detail :userdetail="item"></detail>
          </div>
        </template>
        <template v-slot:[`item.create_user_id`]="{ item }">
          {{ item.createdUser }}
        </template>
        <template v-slot:[`item.role`]="{ item }">
          <span v-if="item.role == 0">Admin</span>
          <span v-else>User</span>
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <deleteUser :deleteuser="item" :getAllUser="getAllUser" />
              <!-- <v-btn color="error" v-on:click="remove(item)" class="post-list-btn">Delete</v-btn> -->
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script src="../../services/user/user-list.js"></script>

<style scoped src="../../assets/css/pages/user/user-list.css"></style>
