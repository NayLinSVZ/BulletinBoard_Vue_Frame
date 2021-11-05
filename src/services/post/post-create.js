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
            post: {
                title: "",
                description: "",
                status: 1,
                create_user_id: null,
                updated_user_id: null,
            },
        };
    },
    computed: {
        ...mapGetters(["userId", "createPostData", "postValidateMsg"]),
    },
    created() {
        if (this.createPostData) {
            this.post = this.createPostData;
            this.$store.dispatch("cancelCreatePost");
        }
    },
    methods: {
        /**
         * to validate post data for create post
         * @returns void
         */
        submitPost() {
            this.$refs.observer.validate();
            this.post.create_user_id = this.userId;
            this.post.updated_user_id = this.userId;
            this.$store.dispatch("validatePost", this.post);
        },
        /**
         * clear data when reset post creation form 
         * @returns void
         */
        resetPostForm() {
            this.$store.state.postValidateMsg = null
            this.$refs.observer.reset();
        },
    },
};