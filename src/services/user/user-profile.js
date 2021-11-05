import {
    mapGetters
} from "vuex";
import router from '../../router';
export default {
    data() {
        return {
            userdetail: {
                id: 1,
                name: "",
                email: "",
                profile: "",
                role: 0,
                phone: null,
                address: null,
                dob: null,
                create_user_id: null,
                updated_user_id: null,
                deleted_user_id: null,
                deleted_at: null,
                created_at: null,
                updated_at: null,
            },
            profileImg: null,
        };
    },
    created() {
        this.$axios
            .get(`/user/${this.userId}`)
            .then((data) => {
                this.userdetail = data.data.user
                this.profileImg = data.data.profileImg
            })
            .catch((err) => console.log(err));
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    mounted() {},
    methods: {
        /**
         * click 'edit'btn , change route to 'profile-edit'
         * @returns void
         */
        editProfile() {
            router.push({
                name: "profile-edit",
            })
        }
    }
};