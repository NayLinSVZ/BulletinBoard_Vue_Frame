import {
    extend,
    ValidationObserver,
    ValidationProvider
} from "vee-validate";
import {
    required
} from "vee-validate/dist/rules";
import {
    mapGetters
} from "vuex";
import router from "../../router";
extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});
export default {
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            postfile: null,
            postValidateMsg: null,
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    created() {},
    methods: {
        /**
         * get post data  from CSV File for create post
         * @returns void
         */
        submitPost() {
            this.$refs.observer.validate();

            let formData = new FormData();
            formData.append("csvfile", this.postfile);
            formData.append("create_user_id", this.userId);
            formData.append("updated_user_id", this.userId);
            this.$axios
                .post("post/upload", formData)
                .then((data) => {
                    if (data) {
                        router.push({
                            name: "post-list",
                        });
                    }
                })
                .catch((err) => {
                    this.postValidateMsg = err.response.data;
                    setTimeout(() => {
                        this.postValidateMsg = null;
                    }, 5000);
                });
        },
        /**
         * click 'cancel'btn , clear data form input field
         * @returns void
         */
        resetPostForm() {
            this.postValidateMsg = null;
            this.postfile = null;
            this.$refs.observer.reset();
        },
    },
};