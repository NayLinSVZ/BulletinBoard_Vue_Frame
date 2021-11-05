import {
    required,
    email
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
extend("email", {
    ...email,
    message: "Email must be valid",
});
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
        ...mapGetters(["emailValidateMsg"]),
    },
    data() {
        return {
            resetData: {
                email: null,
            }
        };
    },
    methods: {
        /**
         * forget password , to change new passwork ( password reset)
         * @returns void
         */
        resetPassword() {
            this.$refs.observer.validate();
            this.$store.dispatch("resetPassword", this.resetData);
        },
        /**
         * click 'cancel'btn , clear data form input field
         * @returns void
         */
        cancelResetPassword() {
            router.push({
                name: "post-list",
            });
        },
    },
};