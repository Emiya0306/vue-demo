import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routers from './route-config'
import App from './pages/app'

Vue.use(VueRouter);
Vue.use(Vuex);

var router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map(routers);

router.start(App, 'body');

window.router = router;