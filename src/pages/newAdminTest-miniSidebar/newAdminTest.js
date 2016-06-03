import $ from 'jquery'
import Component from 'vue-class-component';
import tpl from './newAdminTest.tpl.html'
import { PushMenu } from '../../lib/newAdminLTE'

import style from './AdminLTE.scss';
import skin from './skins/_all-skins.scss'

@Component({
    template: tpl
})
class NewAdminTest_minisidebar {

    init() {
        document.querySelector('.Sidebar__container').style.display = 'none';
        document.querySelector('.App__Container').style.position = 'initial';
        document.querySelector('.App__Container').style.paddingLeft = 'initial';
        document.body.className += ' sidebar-mini';
    }

    data() {
        return {
            PushMenu: {}
        }
    }

    ready() {
        this.PushMenu = new PushMenu(
            {sidebarExpandOnHover: false},
            document.getElementById('PushMenuBtn'),
            document.getElementById('MainSidebar'),
            document.getElementById('PushMenuWrapper')
        );
    }
}

export default NewAdminTest_minisidebar;