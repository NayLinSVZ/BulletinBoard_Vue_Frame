import {
    required,
    min,
    is
} from "vee-validate/dist/rules";
import {
    extend,
    ValidationObserver,
    ValidationProvider
} from "vee-validate";
import {
    mapGetters
} from "vuex";
import router from "../../router";
extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});
extend("is", {
    ...is,
    message: "Password and Password Confirmantion is not match",
});
extend("min", {
    ...min,
    message: "{_field_} may not be greater than {length} characters",
});
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    beforeCreate() {
        // console.log(this.$route.query.id)
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    mounted() {},
    data() {
        return {
            showCurrent: false,
            show: false,
            show1: false,
            passwordData: {
                token: null,
                newpassword: null,
                confirmpassword: null,
                id: null,
            },
            userData: {
                email: null,
            },
            errMsg: null,
        };
    },
    methods: {
        /**
         * get new password and update password field from user table
         * @returns void
         */
        resetPasswordUpdate() {
            this.$refs.observer.validate();
            this.passwordData.token = this.$route.query.token;
            this.$axios
                .post("user/resetPasswordData", this.passwordData)
                .then((data) => {
                    console.log(data.data.model.email)
                    this.userData.email = data.data.model.email;
                    if (this.userData.email != null) {
                        this.$axios
                            .get(`user/email?email=${this.userData.email}`)
                            .then((data) => {
                                if (data) {
                                    this.passwordData.id = data.data.model.id
                                    this.$axios.post("/user/updatePassword", this.passwordData)
                                        .then(data => {
                                            if (data) {
                                                router.push({
                                                    name: "login"
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                }
                            })
                            .catch((err) => {
                                this.errMsg = err.response.data;
                                setTimeout(() => {
                                    this.errMsg = null;
                                }, 5000);
                            });
                    } else {
                        console.log("hello");
                    }
                })
                .catch((err) => {
                    this.errMsg = err.response.data;
                    setTimeout(() => {
                        this.errMsg = null;
                    }, 5000);
                });
        },
        /**
         * click 'cancel'btn , change route to post-list(index)
         * @returns void
         */
        cancelResetPassword() {
            router.push({
                name: "post-list",
            });
        },
    },
};