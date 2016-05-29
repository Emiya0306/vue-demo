import Component from 'vue-class-component';
import tpl from './sign_in.tpl.html'

import vQueueAnim from 'vue-antd/components/queue-anim'

@Component({
    template: tpl,
    components: {
        vQueueAnim
    },
    props:['show']
})
class Login{

    ready() {
    }
}

export default Login;