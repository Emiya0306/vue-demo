import Component from 'vue-class-component';
import tpl from './auth.tpl.html'

import vLogin from './components/sign_in/sign_in'
import vRegister from './components/sign_up/sign_up'
import vQueueAnim from 'vue-antd/components/queue-anim'

import style from './auth.scss'

@Component({
    template: tpl,
    components: {
        vLogin,
        vRegister,
        vQueueAnim
    }
})
class Auth{

    data () {
        return {
            isLogin: true
        }
    }

    ready() {
    }

    _showLogin() {
        this.isLogin = true;
    }

    _showRegister() {
        this.isLogin = false;
    }
}

export default Auth;