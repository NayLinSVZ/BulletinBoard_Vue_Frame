import {
    mapGetters
} from "vuex";
// import moment  from "moment";
export default {
    props: ["deletepost", "getAllPost"],
    data() {
        return {
            dialog: false,
            deletePostData: {
                id: null,
                deleted_user_id: null,
                deleted_at: null,
            },
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * delete post from post table ( soft-delete)
         * @returns void
         */
        remove() {
            if (confirm("Do you really want to delete?")) {
                this.deletePostData.id = this.deletepost.id;
                this.deletePostData.deleted_user_id = this.userId;
                this.deletePostData.deleted_at = Date();

                this.$axios
                    .patch("/post/remove", this.deletePostData)
                    .then((data) => {
                        if (data) {
                            this.$store.dispatch("postDeleteMsg", true);
                            this.dialog = false;
                            this.getAllPost();
                        }
                    })
                    .catch((err) => console.log(err.response.data));
            }
        },
    },
};