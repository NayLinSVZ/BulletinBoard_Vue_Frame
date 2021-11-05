import {
    required,
    digits,
    email,
    max,
    min,
    is,
    regex,
    image,
    size,
} from "vee-validate/dist/rules";
import {
    extend,
    ValidationObserver,
    ValidationProvider
} from "vee-validate";
import {
    mapGetters
} from "vuex";
extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});
extend("is", {
    ...is,
    message: "Password and Password Confirmantion is not match",
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
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            items: ["admin", "user"],

            show: false,
            show1: false,
            userData: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "admin",
                phone: "",
                dob: null,
                address: "",
                profile: null,
                create_user_id: null,
                updated_user_id: null,
            },
            confirm: "",
            menu: false,
            url: null,
        };
    },
    computed: {
        ...mapGetters(["userId", "createUserData", "userValidateMsg"]),
    },
    beforeCreate() {
        this.$store.state.userValidateMsg = null;
    },
    created() {
        if (this.createUserData) {
            this.userData = this.createUserData;
            this.$store.dispatch("cancelCreateUser");
        }
    },
    mounted() {},
    methods: {
        /**
         * to create new user 
         * @returns void
         */
        submitUser() {
            this.$refs.observer.validate();
            this.userData.create_user_id = this.userId;
            this.userData.updated_user_id = this.userId;

            let formData = new FormData();
            Object.entries(this.userData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            let sendData = {
                formData: formData,
                userData: this.userData
            }
            this.$store.dispatch("validateUser", sendData);

        },
        resetUserForm() {
            this.$refs.observer.reset();
        },
    },
};