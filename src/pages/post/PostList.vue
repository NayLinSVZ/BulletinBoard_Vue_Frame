<template>
  <v-card>
    <v-alert
      v-if="postSuccessMsg"
      color="green"
      type="success"
      elevation="3"
      text
    >
      New Post Creation is successful...
    </v-alert>
    <v-alert
      v-if="postDeleteMsg"
      color="green"
      type="success"
      elevation="3"
      text
    >
      Post Delete Successfully...
    </v-alert>
    <v-alert v-if="editPostMsg" color="green" type="success" elevation="3" text>
      Post Successfully Edited...
    </v-alert>
    <v-toolbar color="primary" dark>
      Post List
    </v-toolbar>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="filterPosts">
        <v-row class="filter-bar">
          <v-col cols="3">
            <v-text-field
              class="search-txt-field"
              label="Search keyword"
              hide-details="auto"
              v-model="searchValue"
              @change="filterPosts()"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="post-list-btn mr-4" type="submit" color="primary"
              >Search</v-btn
            >
          </v-col>
          <v-col v-if="isLoggedIn" cols="7">
            <v-btn class="post-list-btn mr-4" to="post/create" color="primary"
              >Create</v-btn
            >
            <v-btn class="post-list-btn mr-4" to="post/upload" color="primary"
              >Upload</v-btn
            >
            <Download />
          </v-col>
        </v-row>
      </v-form>
    </v-card-title>

    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.title`]="{ item }">
          <Detail :postdetail="item"></Detail>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <div class="text-truncate" style="max-width: 200px;">
            {{ item.description }}
          </div>
        </template>
        <template v-slot:[`item.create_user`]="{ item }">
          {{ item.create_user.name }}
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <v-btn
                color="primary"
                class="post-list-btn"
                @click="edit(item.id)"
                >Edit</v-btn
              >
            </div>
            <div class="operation-btn ml-3">
              <Delete :deletepost="item" :getAllPost="getAllPost" />
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script src="../../services/post/post-list.js"></script>

<style scoped src="../../assets/css/pages/post/post-list.css"></style>
