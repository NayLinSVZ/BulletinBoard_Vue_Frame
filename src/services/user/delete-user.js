import {
    mapGetters
} from "vuex";
import moment from "moment";
export default {
    props: ["deleteuser", "getAllUser"],
    data() {
        return {
            dialog: false,
            deleteUserData: {
                id: null,
                deleted_user_id: null,
                deleted_at: null,
            },
            role: "",
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    created() {},
    mounted() {
        if (this.deleteuser.role == 0) {
            this.role = "admin";
        } else {
            this.role = "user";
        }
    },
    methods: {
        /**
         * delete user from user table ( soft-delete)
         * @returns void
         */
        remove() {
            if (confirm("Do you really want to delete?")) {
                this.deleteUserData.id = this.deleteuser.id;
                this.deleteUserData.deleted_user_id = this.userId;
                this.deleteUserData.deleted_at = moment(String(Date())).format(
                    "MM/DD/YYYY"
                );

                this.$axios
                    .patch("/user/remove", this.deleteUserData)
                    .then((data) => {
                        if (data) {
                            this.$store.dispatch("userDeleteMsg", true)
                            this.dialog = false;
                            this.getAllUser();
                        }
                    })
                    .catch((err) => console.log(err.response.data));
            }
        },
    },
};