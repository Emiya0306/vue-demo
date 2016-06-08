import Component from 'vue-class-component';
import tpl from './display.tpl.html'

import { getCount } from '../../vuex/getters'

@Component({
    template: tpl,
    vuex: {
        getters: {
            // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
            counterValue: getCount
        }
    }
})
class Display {

}
export default Display
