import {
    mapGetters
} from "vuex"
import detail from "../../pages/user/detail"
import deleteUser from "../../pages/user/delete"
import Msg from "../../pages/user/Msg"
import moment from "moment"
export default {
    components: {
        detail,
        deleteUser,
        Msg,
    },
    data() {
        return {
            fromdate: null,
            todate: null,
            menu: false,
            menu1: false,
            headerList: [{
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Name",
                    value: "name",
                    width: '100px'
                },
                {
                    text: "Email",
                    value: "email",
                },
                {
                    text: "Created User",
                    value: "create_user_id",
                    width: "150px",
                },
                {
                    text: "Type",
                    value: "role",
                    width: "100px",
                },
                {
                    text: "Phone Number",
                    value: "phone",
                    width: "140px",
                },
                {
                    text: "Date of Birth",
                    value: "dob",
                    width: "120px",
                },
                {
                    text: "Address",
                    value: "address",
                    width: "100px",
                },
                {
                    text: "Created_Date",
                    value: "created_at",
                    width: "11em",
                },
                {
                    text: "Updated_Date",
                    value: "updated_at",
                    width: "11em",
                },
                {
                    text: "Operation",
                    value: "operation",
                    width: "10em",
                },
            ],
            userList: [],
            showList: [],
            removeUser: {
                id: null,
                deleted_at: null,
                deleted_user_id: null,
            },
            createAlertTxt: "New user creation is success...",
            deleteAlertTxt: "User delete is success...",
            updateAlertTxt: "User Profile Successfully Updated...",
            changePasswordTxt: "Password is successfully Updated...",
            change: "change",
            create: "create",
            dele: "delete",
            edit: "edit",
            search: {
                name: null,
                email: null
            }

        };
    },
    computed: {
        ...mapGetters(["isLoggedIn", "userId", "userSuccessMsg", "userDeleteMsg", "userUpdateMsg", "changePasswordMsg"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
    },
    created() {
        this.getAllUser()
    },

    methods: {

        /**
         * change local time zone 
         * @param {date} date to filter user list with data
         * @returns 
         */
        localizeDate(date) {
            if (!date || !date.includes('-')) return date
            const [yyyy, mm, dd] = date.split('-')
            return new Date(`${mm}/${dd}/${yyyy}`)
        },
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterUsers() {
            let startdate = this.localizeDate(this.fromdate)
            let enddate = this.localizeDate(this.todate)


            if (this.search.name && this.search.email && startdate && enddate) {
                this.showList = this.userList.filter((user) => {
                    const createdDate = new Date(user.created_at)
                    return (
                        user.name.toLowerCase().includes(this.search.name.toLowerCase()) &&
                        user.email.toLowerCase().includes(this.search.email.toLowerCase()) &&
                        startdate <= createdDate && createdDate <= enddate
                    );
                });
            } else if (this.search.name) {
                this.showList = this.userList.filter((user) => {
                    return (
                        user.name.toLowerCase().includes(this.search.name.toLowerCase())
                    );
                });
            } else if (this.search.email) {
                this.showList = this.userList.filter((user) => {
                    return (
                        user.email.toLowerCase().includes(this.search.email.toLowerCase())
                    );
                });
            } else if (startdate && !enddate) {
                this.showList = this.userList.filter((user) => {
                    const createdDate = new Date(user.created_at)
                    return startdate <= createdDate;
                });
            } else if (!startdate && enddate) {
                this.showList = this.userList.filter((user) => {
                    const createdDate = new Date(user.created_at)
                    return createdDate <= enddate;
                });
            } else if (startdate && enddate) {

                this.showList = this.userList.filter((user) => {
                    const createdDate = new Date(user.created_at)
                    return startdate <= createdDate && createdDate <= enddate;
                });
            } else {
                this.showList = this.userList
            }
        },

        /**
         * get all user list from user Table
         * @returns void
         */
        getAllUser() {
            this.$axios
                .get("/user")
                .then((response) => {
                    this.userList = response.data;
                    response.data.filter((value, index) => {
                        this.userList[index].created_at = moment(String(this.userList[index].created_at)).format(
                            "MM/DD/YYYY"
                        );
                        this.userList[index].updated_at = moment(String(this.userList[index].updated_at)).format(
                            "MM/DD/YYYY"
                        );
                    });
                    this.showList = this.userList;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};