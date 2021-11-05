import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            show: false,
            show1: false,
            menu: false,
            type: "user",
            url: null,
        };
    },
    computed: {
        ...mapGetters(["createUserData"]),
    },
    mounted() {
        if (this.createUserData.role == 0) {
            this.type = "admin";
        } else {
            this.type = "user";
        }
        this.url = URL.createObjectURL(this.createUserData.profile);
    },
    methods: {
        /**
         * confirm user data to create new user 
         * @returns void
         */
        confirmUser() {
            let formData = new FormData();
            formData.append("image", this.createUserData.profile);
            if (this.createUserData.role == "admin") {
                this.createUserData.role = 0;
            } else {
                this.createUserData.role = 1;
            }
            Object.entries(this.createUserData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append(
                "profile",
                this.createUserData.name + this.createUserData.profile.name
            );
            formData.append("deleted_user_id", 0)
            this.$store.dispatch("createUser", formData);
        },

        /**
         * click 'cancel'btn , route change to 'user-register' component
         * @returns void
         */
        cancelUserForm() {
            this.$router.push({
                name: "user-register",
            });
        },
    },
};