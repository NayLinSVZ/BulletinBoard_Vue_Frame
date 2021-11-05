import {
    mapGetters
} from "vuex";
import moment from "moment";
import Detail from "../../pages/post/Details";
import Delete from "../../pages/post/Delete";
import Download from "../../pages/post/Download";
import router from "../../router";
export default {
    components: {
        Detail,
        Delete,
        Download,
    },
    data() {
        return {
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            isDeleteDialog: false,
            headerList: [{
                    text: "Post Title",
                    align: "start",
                    value: "title",
                },
                {
                    text: "Post Desciption",
                    value: "description",
                },
                {
                    text: "Posted User",
                    value: "create_user",
                },
                {
                    text: "Posted Date",
                    value: "created_at",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            postList: [],
            showList: [],
            searchValue: null,
        };
    },
    computed: {
        ...mapGetters([
            "isLoggedIn",
            "postSuccessMsg",
            "postDeleteMsg",
            "editPostMsg",
        ]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
    },
    mounted() {
        this.getAllPost();
    },
    methods: {
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterPosts() {
            if (this.searchValue) {
                this.showList = this.postList.filter((post) => {
                    return (
                        post.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                        post.description
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase())
                    );
                });
            } else {
                this.showList = this.postList;
            }
        },
        /**
         * get all post list from Post Table
         * @returns void
         */
        getAllPost() {
            this.$axios
                .get("/post")
                .then((response) => {
                    response.data.posts.filter((value, index) => {
                        response.data.posts[index].created_at = moment(
                            String(response.data.posts[index].created_at)
                        ).format("MM/DD/YYYY");
                        response.data.posts[index].updated_at = moment(
                            String(response.data.posts[index].updated_at)
                        ).format("MM/DD/YYYY");
                    });
                    this.postList = response.data.posts;
                    this.showList = this.postList;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * change edit route to edit post
         * @param {id} id post id to edit
         */
        edit(id) {
            this.$store.dispatch("postEditId", id);
            router.push({
                name: "post-edit",
            });
        },
    },
};