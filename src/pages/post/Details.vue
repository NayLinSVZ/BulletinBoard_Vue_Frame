<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="960px">
      <template v-slot:activator="{ on, attrs }">
        <a color="primary" dark v-bind="attrs" v-on="on">
          {{ postdetail.title }}
        </a>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            Post Details
            <v-spacer></v-spacer>
            <v-btn text @click="dialog.value = false"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="5">
                Title
              </v-col>
              <v-col cols="7">
                {{ postdetail.title }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Description
              </v-col>
              <v-col cols="7">
                {{ postdetail.description }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Status
              </v-col>
              <v-col cols="7">
                <div v-if="postdetail.status == 1">
                  Active
                </div>
                <div v-else>
                  Inactive
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Created Date
              </v-col>
              <v-col cols="7">
                {{ postdetail.created_at }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Created User
              </v-col>
              <v-col cols="7">
                {{ postdetail.create_user.name }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Updated Date
              </v-col>
              <v-col cols="7">
                {{ postdetail.updated_at }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5">
                Updated User
              </v-col>
              <v-col cols="7">
                {{ postdetail.updated_user.name }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["postdetail"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>
