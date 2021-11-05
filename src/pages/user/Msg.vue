<template>
  <v-alert color="green" type="success" elevation="3" text v-if="msg">
    {{ alertTxt }}
  </v-alert>
</template>

<script>
export default {
  props: ["alertMsg", "alertTxt", "msgCon"],
  data() {
    return {
      msg: false,
    };
  },
  mounted() {
    this.msg = this.alertMsg;
    setTimeout(() => {
      this.msg = false;
      if (this.msgCon == "create") {
        this.$store.dispatch("userSuccessMsg", false);
      }
      if (this.msgCon == "delete") {
        this.$store.dispatch("userDeleteMsg", false);
      }
      if (this.msgCon == "edit") {
        this.$store.dispatch("userUpdateMsg", false);
      }
      if (this.msgCon == "change") {
        this.$store.dispatch("changePasswordMsg", false);
      }
    }, 3000);
  },
};
</script>

<style></style>
