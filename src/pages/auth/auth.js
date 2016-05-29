import Component from 'vue-class-component';
import tpl from './auth.tpl.html'
import style from './auth.scss'

import vLogin from './components/sign_in/sign_in'
import vRegister from './components/sign_up/sign_up'


@Component({
    template: tpl,
    components: {
        vLogin,
        vRegister
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