import $ from 'jquery'
import Component from 'vue-class-component';
import tpl from './newAdminTest.tpl.html'
import { ControlSidebar } from '../../lib/newAdminLTE'

import style from './AdminLTE.scss';

@Component({
    template: tpl
})
class AdminTest {

    data() {
        return {
            ControlSidebarBtn: {}
        }
    }

    ready() {


        this.ControlSidebar = new ControlSidebar(
            document.getElementById('ControlSidebarBtn'),
            document.getElementById('ControlSidebar'),
            document.getElementById('ControlSidebarBg'),
            { slide: true }
        );
    }

    openSidebar() {
        this.ControlSidebar.open();
    }

    closeSidebar() {
        this.ControlSidebar.close();
    }
}

export default AdminTest;