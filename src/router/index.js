import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
import UserRegister from "../pages/user/UserRegister";
import UserConfirm from "../pages/user/UserConfirm";
import Profile from "../pages/user/Profile";
import Edit from "../pages/user/Edit";
import ChangePassword from "../pages/user/ChangePassword";
import ResetPassword from "../pages/user/ResetPassword";
import ResetPasswordUpdated from "../pages/user/ResetPasswordUpdate";

import PostList from "../pages/post/PostList";
import PostCreate from "../pages/post/PostCreate";
import PostConfirm from "../pages/post/PostConfirm";
import PostEdit from "../pages/post/Edit";
import PostEditConfirm from "../pages/post/EditConfirm";
import Upload from "../pages/post/Upload";

import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/user",
        name: "user-list",
        component: UserList,
    },
    {
        path: "/register",
        name: "user-register",
        component: UserRegister,
    },
    {
        path: "/confirm",
        name: "user-confirm",
        component: UserConfirm,
    },
    {
        path: "/user/profile",
        name: "user-profile",
        component: Profile,
    },
    {
        path: "/user/profile/edit",
        name: "profile-edit",
        component: Edit,
    },
    {
        path: "/user/change",
        name: "change-password",
        component: ChangePassword,
    },

    {
        path: "/login/reset",
        name: "reset-password",
        component: ResetPassword,
    },
    {
        path: "/login/forget-password-update",
        name: "reset-password-update",
        component: ResetPasswordUpdated,
    },
    {
        path: "/post",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/post/create",
        name: "post-create",
        component: PostCreate,
    },
    {
        path: "/post/confirm",
        name: "post-confirm",
        component: PostConfirm,
    },
    {
        path: "/post/edit",
        name: "post-edit",
        component: PostEdit,
    },
    {
        path: "/post/edit/confirm",
        name: "post-edit-confirm",
        component: PostEditConfirm,
    },
    {
        path: "/post/upload",
        name: "post-upload",
        component: Upload,
    },
    {
        path: "/*",
        redirect: "/post",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    const createUserData = store.getters.createUserData;
    const createPostData = store.getters.createPostData;
    const postEditId = store.getters.postEditId;
    const editPostData = store.getters.editPostData;
    const userType = store.getters.userType;

    if (
        !loggedIn &&
        to.name != "login" &&
        to.name != "post-list" &&
        to.name != "reset-password" &&
        to.name != "reset-password-update"
    ) {
        return next("/login");
    }
    next();
    if (
        loggedIn &&
        (to.name == "login" ||
            to.name == "reset-password" ||
            to.name == "reset-password-update")
    ) {
        return next("/post");
    }
    next();
    if (!createUserData && to.name == "user-confirm" && userType == 0) {
        return next("/register");
    }
    next();
    if (loggedIn && userType == 1 && to.name == "user-list") {
        return next("/login");
    }
    next();
    if (loggedIn && to.name == "user-register" && userType == 1) {
        return next("/login");
    }
    //   next();
    //   if (!loggedIn && to.name == "user-profile") {
    //     return next("/login");
    //   }
    next();
    if (!loggedIn && to.name == "post-create") {
        return next("/login");
    }
    next();
    if (!createPostData && to.name == "post-confirm") {
        return next("/post/create");
    }
    next();
    if (!postEditId && to.name == "post-edit") {
        return next("/post");
    }
    next();
    if (!editPostData && to.name == "post-edit-confirm") {
        return next("/post/edit");
    }
    next();
    if (!loggedIn && to.name == "post-upload") {
        return next("/post");
    }
});

export default router;