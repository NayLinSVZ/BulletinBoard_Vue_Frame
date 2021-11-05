import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import moment from "moment";
import vuetify from "./plugins/vuetify";
import cookie from "vue-cookie"

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.moment = moment;
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    beforeCreate() {
        if (!cookie.get("token")) {
            store.state.user = null
        }
    },
    /**
     * This is to set token to any request to server side.
     * @returns Resquest with configurations
     */
    created() {
        axios.interceptors.request.use(
            function (config) {
                const tokenType = "Bearer"
                const token = cookie.get("token");
                if (token) config.headers.Authorization = `${tokenType} ${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    },
}).$mount("#app");