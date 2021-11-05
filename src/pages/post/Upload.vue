<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Upload CSV File
    </v-card-title>
    <v-container class="px-5 mt-5">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitPost)">
          <v-row>
            <v-col cols="4" class="text-right pr-5">
              CSV File <span class="rq">*</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="CSV File"
                :rules="{
                  required: true,
                }"
              >
                <v-file-input
                  accept="text/csv"
                  label="upload post with csv file"
                  :error-messages="errors"
                  v-model="postfile"
                ></v-file-input>
              </ValidationProvider>
            </v-col>
          </v-row>
          <div v-if="postValidateMsg">
            <v-row v-if="typeof postValidateMsg === 'string'">
              <v-col>
                <v-alert color="red" type="error" elevation="3" text>
                  {{ postValidateMsg }}
                </v-alert>
              </v-col>
            </v-row>
            <v-row v-else-if="typeof postValidateMsg === 'object'">
              <v-col>
                <v-alert
                  v-for="(value, index) in postValidateMsg"
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
          </div>

          <v-row>
            <v-col class="text-right">
              <v-btn @click="resetPostForm" type="reset" class="mr-4 error">
                Clear
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                Upload
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>
<script src="../../services/post/upload.js"></script>

<style>
.star {
  color: red;
}
</style>
