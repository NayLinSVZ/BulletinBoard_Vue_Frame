<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <a color="primary" dark v-bind="attrs" v-on="on">
          {{ userdetail.name }}
        </a>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            User Details
            <v-spacer></v-spacer>
            <v-btn text @click="dialog.value = false"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="4" class="text-center">
                <img width="150px" :src="userdetail.img" alt="" />
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
                  <v-col cols="7">
                    {{ role }}
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
                  <v-col cols="5">
                    Created Date
                  </v-col>
                  <v-col cols="7">
                    {{ userdetail.created_at }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="5">
                    Created User
                  </v-col>
                  <v-col cols="7">
                    {{ userdetail.createdUser }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="5">
                    Updated Date
                  </v-col>
                  <v-col cols="7">
                    {{ userdetail.updated_at }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="5">
                    Updated User
                  </v-col>
                  <v-col cols="7">
                    {{ userdetail.updatedUser }}
                  </v-col>
                </v-row>
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
  props: ["userdetail"],
  data() {
    return {
      dialog: false,
      userData: null,
      role: "",
    };
  },
  mounted() {
    if (this.userdetail.role == 0) {
      this.role = "admin";
    } else {
      this.role = "user";
    }
  },
};
</script>

<style></style>
