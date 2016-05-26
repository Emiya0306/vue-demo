import $ from 'jquery'
import Component from 'vue-class-component';
import tpl from './home.tpl.html'
import AdminLTE from '../../lib/AdminLTE'

@Component({
    template: tpl
})
class Home{
    constructor() {}
    ready() {
        let adminLTE = new AdminLTE($);
        console.log(adminLTE);
    }
}

export default Home;