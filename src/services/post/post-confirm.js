import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["createPostData"]),
    },
    methods: {
        /**
         * back route when click 'cancel btn' 
         * @returns void
         */
        resetConfirmForm() {
            this.$router.push({
                name: "post-create",
            });
        },
        /**
         * save post data 
         * @returns void
         */
        confirmPost() {
            this.$store.dispatch("createPost", this.createPostData)
        }
    },
};