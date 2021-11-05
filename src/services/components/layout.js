import { mapGetters } from "vuex";
import constants from "../../constants";
import router from "../../router";
import cookie from "vue-cookie";

export default {
  data() {
    return {
      title: constants.APP_TITLE,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userType", "userName"]),
  },
  methods: {
    /**
     * This is to log out from system.
     * @returns void
     */
    logout() {
      cookie.delete("token");
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * This is to route profile page.
     * @returns void
     */
    showProfile() {
      router.push({
        name: "user-profile",
      });
    },
  },
};
