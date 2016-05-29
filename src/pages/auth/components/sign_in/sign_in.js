import Component from 'vue-class-component';
import tpl from './sign_in.tpl.html';
import vInputGroup from '../../../../components/form/input-group/input-group';

@Component({
    template: tpl,
    components: {
        vInputGroup
    }
})
class Login{

    data() {
        return {
            passport: '',
            password: ''
        }
    }

    ready() {
    }
}

export default Login;