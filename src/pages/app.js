import Vue from 'vue'
import Vuex from 'vuex'
import Component from 'vue-class-component';
import tpl from './app.tpl.html';
import style from './app.scss';
import store from '../vuex/store/store';

import vSidebar from '../components/siderbar/sidebar';

Vue.use(Vuex);

@Component({
    template: tpl,
    replace: false,
    components: {
        vSidebar
    },
    store
})
class App{
    ready() {
    }
}

export default App;