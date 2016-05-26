import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './route-config'
import App from './pages/app'

Vue.use(VueRouter);

var router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map(routers);

router.start(App, '#app');

window.router = router;