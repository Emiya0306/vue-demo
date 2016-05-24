import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Foo = Vue.extend({
    template: '<p>This is foo!</p>'
});

const Bar = Vue.extend({
    template: '<p>This is bar!</p>'
});

const App = Vue.extend({});

var router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
});

router.start(App, '#app');

window.router = router;