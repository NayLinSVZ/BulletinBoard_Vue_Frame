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
            post: {
                title: "",
                description: "",
                status: false,
                create_user_id: null,
                updated_user_id: null,
            },
            editId: {
                id: null,
            },
        };
    },
    computed: {
        ...mapGetters(["userId", "postEditId", "editPostValidateMsg"]),
    },
    mounted() {
        this.editId.id = this.postEditId;
        if (this.editId.id) {
            this.$axios
                .get(`/post/${this.editId.id}`)
                .then((data) => {
                    this.post = data.data.model;
                })
                .catch((err) => console.log(err));
        }
    },
    methods: {
        /**
         * edit post data with specific ID
         * @returns void
         */
        submitPost() {
            this.$refs.observer.validate();
            this.post.updated_user_id = this.userId;
            if (!this.post.status) {
                this.post.status = 0
            } else {
                this.post.status = 1
            }
            this.$store.dispatch("validateEditPost", this.post);
        },

        /**
         * click 'cancel' btn change route
         */
        cancelPostEdit() {
            this.$store.dispatch("postEditId", null);
            router.push({
                name: "post-list"
            })
        },
    },
};