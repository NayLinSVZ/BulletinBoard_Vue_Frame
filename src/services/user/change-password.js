import {
    required,
    max,
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
extend("max", {
    ...max,
    message: "{_field_} may not be greater than {length} characters",
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
    computed: {
        ...mapGetters(["userId", "changePasswordValidateMsg"]),
    },
    mounted() {
        this.passwordData.id = this.userId;
    },
    data() {
        return {
            showCurrent: false,
            show: false,
            show1: false,
            passwordData: {
                id: null,
                currentpassword: null,
                newpassword: null,
                confirmpassword: null,
            },
        };
    },
    methods: {
        /**
         * to change user password 
         * @returns void
         */
        changePassword() {
            this.$refs.observer.validate();
            this.$store.dispatch("changePassword", this.passwordData);
        },
        /**
         * back route when click cancel btn
         * @returns void
         */
        cancelChangePassword() {
            router.push({
                name: "profile-edit",
            });
        },
    },
};