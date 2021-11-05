<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="error" v-bind="attrs" v-on="on">Delete</v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            Delete Confirm
            <v-spacer></v-spacer>
            <v-btn text @click="dialog.value = false"
              ><v-icon>mdi-minus</v-icon></v-btn
            ></v-toolbar
          >
          <v-card-text>
            <p class="delete-txt pt-3 pl-2">Are you sure to delete User?</p>
            <div class="pl-5 ml-5">
              <v-row>
                <v-col cols="5">
                  ID
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.id }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Name
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.name }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Type
                </v-col>
                <v-col cols="7">
                  {{ role }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Email
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.email }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Phone
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.phone }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Date Of Birth
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.dob }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Address
                </v-col>
                <v-col cols="7">
                  {{ deleteuser.address }}
                </v-col>
              </v-row>
            </div>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Cancel</v-btn>
              <v-btn text @click="remove">Delete</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script src="../../services/user/delete-user.js"></script>

<style>
.delete-txt {
  font-size: 16px;
  color: red;
}
</style>
