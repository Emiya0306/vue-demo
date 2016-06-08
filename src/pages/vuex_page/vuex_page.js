import Component from 'vue-class-component';
import tpl from './vuex_page.tpl.html'

import Display from './display.js'
import Increment from './increment.js'

@Component({
    template: tpl,
    components: {
        Display,
        Increment
    }
})
class Vuex_Page {
    ready() {
    }
}

export default Vuex_Page;