import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["editPostData"]),
    },
    methods: {
        /**
         * back route when reset edit form 
         * @returns void
         */
        resetConfirmForm() {
            this.$store.state.editPostData = null;
            this.$router.push({
                name: "post-edit",
            });
        },
        /**
         * save post edit data 
         * @returns void
         */
        confirmPost() {
            this.$store.dispatch("saveEditPost", this.editPostData)
        }
    },
};