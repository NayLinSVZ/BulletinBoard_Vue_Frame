import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";
import cookie from "vue-cookie"

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
    state: {
        user: null,
        createUserData: null,
        userSuccessMsg: false,
        userValidateMsg: null,
        userDeleteMsg: false,
        userUpdateMsg: false,
        changePasswordMsg: false,
        changePasswordValidateMsg: null,
        passwordResetMsg: false,
        emailValidateMsg: null,
        createPostData: null,
        postValidateMsg: null,
        postSuccessMsg: false,
        postDeleteMsg: false,
        postEditId: null,
        editPostData: null,
        editPostValidateMsg: null,
        editPostMsg: false,
    },

    //   MUTATIONS
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
        setToken(state, token) {
            state.token = token
        },
        setCreateUserData(state, data) {
            state.createUserData = data;
        },
        setUserValidateMsg(state, validateMsg) {
            state.userValidateMsg = validateMsg;
        },
        setUserSuccessMsg(state, msg) {
            state.userSuccessMsg = msg;
        },
        setUserDeleteMsg(state, msg) {
            state.userDeleteMsg = msg;
        },
        setUserUpdateMsg(state, msg) {
            state.userUpdateMsg = msg;
        },
        setChangePasswordMsg(state, msg) {
            state.changePasswordMsg = msg
        },
        setChangePasswordValidateMsg(state, msg) {
            state.changePasswordValidateMsg = msg
        },
        setPasswordResetMsg(state, msg) {
            state.passwordResetMsg = msg
        },
        setEmailValidateMsg(state, msg) {
            state.emailValidateMsg = msg
        },

        // Post Section
        setCreatePostData(state, data) {
            state.createPostData = data;
        },
        setPostValidateMsg(state, validateMsg) {
            state.postValidateMsg = validateMsg;
        },
        setPostSuccessMsg(state, msg) {
            state.postSuccessMsg = msg;
        },
        setPostDeleteMsg(state, msg) {
            state.postDeleteMsg = msg;
        },
        setpostEditId(state, id) {
            state.postEditId = id;
        },
        setEditPostData(state, data) {
            state.editPostData = data;
        },
        setEditPostValidateMsg(state, data) {
            state.editPostValidateMsg = data;
        },
        setEditPostMsg(state, msg) {
            state.editPostMsg = msg;
        },
    },

    //   ACTIONS
    actions: {
        /**
         * to get the userdata and token 
         * @param {*} commit 
         * @param { object } credentials user information to login
         * @returns void
         */
        login({
            commit
        }, credentials) {
            return axios.post("/auth/login", credentials)
                .then(data => {
                    let user = {
                        user: null
                    }
                    user.user = data.data.model
                    commit("setUserData", user);
                    if (!credentials.remember) {
                        cookie.set("token", data.data.token)
                    } else {
                        cookie.set("token", data.data.token, {
                            expires: 7
                        })
                    }
                });
        },
        /**
         * to set null data 
         * @param {*} commit to mutate the userData 
         * @returns void
         */
        logout({
            commit
        }) {
            commit("setUserData", null);
        },

        /**
         * this is to confirm user data before save and push route after confirm
         * @param {*} commit to mutate the user data
         * @param { object } Sdata all information of the new user
         * @returns void
         */
        validateUser({
            commit
        }, Sdata) {
            axios
                .post("/user/validate", Sdata.formData)
                .then((data) => {
                    if (data) {
                        commit("setCreateUserData", Sdata.userData);
                        commit("setUserValidateMsg", null);
                        router.push({
                            name: "user-confirm",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    commit("setUserValidateMsg", err.response.data);
                    setTimeout(() => {
                        commit("setUserValidateMsg", null);
                    }, 5000);
                });
        },

        /**
         * create new user and push route to 'user-list'
         * @param { * } commit
         * @param {object} userData  user data
         * @returns void
         */
        createUser({
            commit
        }, userData) {
            axios
                .post("/user", userData)
                .then((data) => {
                    if (data) {
                        if (data) {
                            commit("setUserSuccessMsg", true);
                            commit("setCreateUserData", null);
                            router.push({
                                name: "user-list",
                            });
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
        /**
         * to set null data 
         * @param {*} commit
         * @returns void
         */
        cancelCreateUser({
            commit
        }) {
            commit("setCreateUserData", null);
        },

        /**
         * to update user data 
         * @param {commit} param0 
         * @param {formData} userData  
         */
        editUser({
            commit
        }, userData) {
            axios.patch(`/user/${userData.userId}`, userData.formData).then((data) => {
                if (data) {
                    commit("setUserUpdateMsg", true);
                    router.push({
                        name: "user-list",
                    });
                }
            });
        },

        /**
         * change user account passwrod
         * @param {*} param0 
         * @param {formData} passwordData new password data 
         */
        changePassword({
            commit
        }, passwordData) {
            axios.post("/user/change_password", passwordData)
                .then(data => {
                    if (data) {
                        commit("setChangePasswordMsg", true)
                        router.push({
                            name: "user-list",
                        });
                    }
                })
                .catch(err => {
                    commit("setChangePasswordValidateMsg", err.response.data)
                    setTimeout(() => {
                        commit("setChangePasswordValidateMsg", null)
                    }, 3000);
                })
        },

        /**
         * reset password when forget current passwrod
         * @param {commit} param0 
         * @param {string} email this email is user acc email 
         */
        resetPassword({
            commit
        }, email) {
            axios.post("/user/resetPassword", email)
                .then(data => {
                    if (data) {
                        commit("setPasswordResetMsg", true)
                        setTimeout(() => {
                            commit("setPasswordResetMsg", false)
                        }, 5000);
                        router.push({
                            name: "login"
                        })
                    }
                })
                .catch(err => {
                    commit("setEmailValidateMsg", err.response.data)
                })
        },
        /**
         * show success msg after new user create
         * @param {commit}
         * @param {boolean} msg  asign true value
         */
        userSuccessMsg({
            commit
        }, msg) {
            commit("setUserSuccessMsg", msg);
        },
        /**
         * show success msg after user delete
         * @param {commit}
         * @param {boolean} msg  asign true value
         */
        userDeleteMsg({
            commit
        }, msg) {
            commit("setUserDeleteMsg", msg);
        },
        /**
         * show success msg after new user create
         * @param {commit}
         * @param {boolean} msg  asign true value
         */
        userUpdateMsg({
            commit
        }, msg) {
            commit("setUserUpdateMsg", msg);
        },
        /**
         * show success msg after user password changed
         * @param {commit}
         * @param {boolean} msg  asign true value
         */
        changePasswordMsg({
            commit
        }, msg) {
            commit("setChangePasswordMsg", msg)
        },

        // post create section

        /**
         * this is to confirm post data before save and push route after confirm
         * @param {*} commit to mutate the post data
         * @param { object } postData all information of the new post
         * @returns void
         */
        validatePost({
            commit
        }, postData) {
            axios
                .post("/post/validate", postData)
                .then((data) => {
                    if (data) {
                        commit("setCreatePostData", postData);
                        commit("setPostValidateMsg", null);
                        router.push({
                            name: "post-confirm",
                        });
                    }
                })
                .catch((err) => {
                    commit("setPostValidateMsg", err.response.data);
                    setTimeout(() => {
                        commit("setPostValidateMsg", null);
                    }, 2000);
                });
        },
        /**
         * create new post and push route to 'post-list'
         * @param { * } commit
         * @param {object} postData  post data
         * @returns void
         */
        createPost({
            commit
        }, postData) {
            axios
                .post("/post", postData)
                .then((data) => {
                    if (data) {
                        if (data) {
                            commit("setPostSuccessMsg", true);
                            commit("setCreatePostData", null);
                            setTimeout(() => {
                                commit("setPostSuccessMsg", null);
                            }, 3000);
                            router.push({
                                name: "post-list",
                            });
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
        /**
         * to set null data 
         * @param {*} commit
         * @returns void
         */
        cancelCreatePost({
            commit
        }) {
            commit("setCreatePostData", null);
        },

        /**
         * show success msg after post deleted
         * @param {commit}
         * @param {boolean} msg  asign true value
         */
        postDeleteMsg({
            commit
        }, msg) {
            commit("setPostDeleteMsg", msg);
            setTimeout(() => {
                commit("setPostDeleteMsg", null);
            }, 3000);
        },

        // post edit section

        /**
         * setup post id to edit
         * @param {commit}
         * @param {int} id  post id to edit
         */
        postEditId({
            commit
        }, id) {
            commit("setpostEditId", id);
        },

        /**
         *this is to confirm post edit data before save and push route after confirm
         * @param {commit}
         * @param {formData} postData  post edit data
         */
        validateEditPost({
            commit
        }, postData) {
            axios
                .post("/post/validate-edit", postData)
                .then((data) => {
                    if (data) {
                        commit("setEditPostData", postData);
                        commit("setEditPostValidateMsg", null);
                        router.push({
                            name: "post-edit-confirm",
                        });
                    }
                })
                .catch((err) => {
                    commit("setEditPostValidateMsg", err.response.data);
                    setTimeout(() => {
                        commit("setEditPostValidateMsg", null);
                    }, 2000);
                });
        },
        /**
         * update post data and push route to 'user-list'
         * @param { * } commit
         * @param {object} editData  post data to edit
         * @returns void
         */
        saveEditPost({
            commit
        }, editData) {
            axios
                .patch(`/post/${editData.id}`, editData)
                .then((data) => {
                    if (data) {
                        if (data) {
                            commit("setEditPostMsg", true);
                            setTimeout(() => {
                                commit("setEditPostMsg", null);
                            }, 3000);
                            commit("setEditPostData", null);
                            commit("setpostEditId", null);
                            router.push({
                                name: "post-list",
                            });
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
    },

    //   GETTERS
    getters: {
        isLoggedIn: (state) => !!state.user,

        userType: (state) => {
            if (state.user && state.user.user.role) {
                return state.user.user.role;
            }
            return -1;
        },
        userId: (state) => {
            if (state.user && state.user.user.id) {
                return state.user.user.id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.user.name) {
                return state.user.user.name;
            }
        },
        // ----------------User Creation Section------------------
        createUserData: (state) => {
            if (state.createUserData) {
                return state.createUserData;
            }
        },
        userValidateMsg: (state) => {
            if (state.userValidateMsg) {
                return state.userValidateMsg;
            }
        },
        userSuccessMsg: (state) => {
            if (state.userSuccessMsg) {
                return state.userSuccessMsg;
            }
        },
        userDeleteMsg: (state) => {
            if (state.userDeleteMsg) {
                return state.userDeleteMsg;
            }
        },
        userUpdateMsg: (state) => {
            if (state.userUpdateMsg) {
                return state.userUpdateMsg;
            }
        },
        changePasswordMsg: (state) => {
            if (state.changePasswordMsg) {
                return state.changePasswordMsg;
            }
        },
        changePasswordValidateMsg: (state) => {
            if (state.changePasswordValidateMsg) {
                return state.changePasswordValidateMsg
            }
        },
        passwordResetMsg: (state) => {
            if (state.passwordResetMsg) {
                return state.passwordResetMsg
            }
        },
        emailValidateMsg: (state) => {
            if (state.emailValidateMsg) {
                return state.emailValidateMsg
            }
        },
        // --------------end----------------

        // --------------post creation section-------------------
        createPostData: (state) => {
            if (state.createPostData) {
                return state.createPostData;
            }
        },
        postValidateMsg: (state) => {
            if (state.postValidateMsg) {
                return state.postValidateMsg;
            }
        },
        postSuccessMsg: (state) => {
            if (state.postSuccessMsg) {
                return state.postSuccessMsg;
            }
        },
        postDeleteMsg: (state) => {
            if (state.postDeleteMsg) {
                return state.postDeleteMsg;
            }
        },
        postEditId: (state) => {
            if (state.postEditId) {
                return state.postEditId;
            }
        },
        editPostData: (state) => {
            if (state.editPostData) {
                return state.editPostData;
            }
        },
        editPostValidateMsg: (state) => {
            return state.editPostValidateMsg;
        },
        editPostMsg: (state) => {
            return state.editPostMsg;
        },
        // --------------end----------------
    },
    plugins: [createPersistedState()],
});