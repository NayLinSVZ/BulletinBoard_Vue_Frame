<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Confirm Update Post
    </v-card-title>
    <v-container class="px-5">
      <form @submit.prevent="confirmPost">
        <v-row>
          <v-col cols="4" class="text-right pr-5">
            Title :
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="editPostData.title" readonly> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-right pr-5">
            Description :
          </v-col>
          <v-col cols="8">
            <v-textarea
              name="description"
              v-model="editPostData.description"
              rows="3"
              auto-grow
              readonly
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-right pr-5">
            Status
          </v-col>
          <v-col cols="8">
            <v-switch v-model="editPostData.status" readonly></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-right">
            <v-btn @click="resetConfirmForm" type="reset" class="mr-4 error">
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
    </v-container>
  </v-card>
</template>
<script src="../../services/post/edit-confirm.js"></script>

<style scoped>
.v-input--selection-controls {
  margin-top: 0;
}
.star {
  color: red;
}
</style>
