import {
    extend,
    ValidationObserver,
    ValidationProvider
} from "vee-validate";
import {
    required,
    digits,
    email,
    max,
    min,
    regex,
    image,
    size,
} from "vee-validate/dist/rules";
import {
    mapGetters
} from "vuex";
import router from "../../router";
// import router from "../../router";
extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});
extend("max", {
    ...max,
    message: "{_field_} may not be greater than {length} characters",
});
extend("regex", {
    ...regex,
    message: "{_field_} {_value_} does not match 09*********",
});
extend("min", {
    ...min,
    message: "{_field_} may not be greater than {length} characters",
});
extend("email", {
    ...email,
    message: "Email must be valid",
});
extend("digits", {
    ...digits,
    message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("image", {
    ...image,
    message: "{_field_} please select img type",
});
extend("size", {
    ...size,
    message: `file size is grater than {size} kb`,
});
export default {
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            items: ["admin", "user"],
            menu: false,
            userData: {
                name: "",
                email: "",
                role: "",
                phone: "",
                dob: null,
                address: "",
                profile: null,
                create_user_id: null,
                updated_user_id: null,
            },
            oldProfile: null,
            newProfile: null,
        };
    },
    computed: {
        ...mapGetters(["userId", "userValidateMsg"]),
    },
    created() {
        this.$axios.get(`user/${this.userId}`).then((data) => {

            this.userData = data.data.user;
            if (data.data.user.role == 1) {
                this.userData.role = "user";
            } else {
                this.userData.role = "admin";
            }
            this.oldProfile = data.data.profileImg;
        });
    },
    mounted() {},
    methods: {
        /**
         * to edit user data 
         * @returns void
         */
        submitEditUser() {
            this.$refs.observer.validate();
            let formData = new FormData();

            if (this.userData.role == "admin") {
                this.userData.role = 0;
            } else {
                this.userData.role = 1;
            }
            Object.entries(this.userData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (this.newProfile) {
                formData.append("profile", this.userData.name + this.newProfile.name);
                formData.append("image", this.newProfile);
            }
            let data = {
                userId: this.userId,
                formData: formData
            }
            this.$store.dispatch("editUser", data);
        },

        /**
         * click 'cancel' btn , back route
         * @returns void
         */
        cancelUserEdit() {
            router.push({
                name: "user-profile",
            });
        },
    },
};