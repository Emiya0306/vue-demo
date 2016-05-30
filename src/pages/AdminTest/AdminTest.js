import $ from 'jquery'
import Component from 'vue-class-component';
import tpl from './adminTest.tpl.html'
import AdminLTE from '../../lib/newAdminLTE'

@Component({
    template: tpl
})
class AdminTest {

    init() {
        require('./AdminLTE.scss');
        require('./bootstrap.scss');
        require('./skins/_all-skins.scss');
    }

    ready() {
        let adminLTE = new AdminLTE($);
        console.log(adminLTE);
    }
}

export default AdminTest;