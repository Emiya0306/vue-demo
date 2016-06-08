import Component from 'vue-class-component';
import tpl from './increment.tpl.html'

import { incrementCounter } from '../../vuex/action/actions'

@Component({
    template: tpl,
    vuex: {
        actions: {
            increment: incrementCounter
        }
    }
})
class Increment {

}
export default Increment
