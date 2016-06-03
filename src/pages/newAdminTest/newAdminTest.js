import $ from 'jquery'
import Component from 'vue-class-component';
import tpl from './newAdminTest.tpl.html'
import { ControlSidebar, PushMenu, BoxWidget } from '../../lib/newAdminLTE'

import style from './AdminLTE.scss';
import skin from './skins/_all-skins.scss'

@Component({
    template: tpl
})
class AdminTest {

    data() {
        return {
            ControlSidebarBtn: {},
            PushMenu: {},
            BoxWidget: {}
        }
    }

    ready() {
        this.ControlSidebar = new ControlSidebar(
            { slide: true },
            document.getElementById('ControlSidebarBtn'),
            document.getElementById('ControlSidebar'),
            document.getElementById('ControlSidebarBg'),
            document.getElementById('bodyWrapper')
        );


        this.PushMenu = new PushMenu(
            null,
            document.getElementById('PushMenuBtn'),
            document.getElementById('PushMenuWrapper')
        );

        this.BoxWidget = new BoxWidget(
            null,
            document.getElementById('BoxWidget')
        );
    }

    openSidebar() {
        this.ControlSidebar.open();
    }

    closeSidebar() {
        this.ControlSidebar.close();
    }

    removeBoxWidget() {
        this.BoxWidget.remove();
    }

    collapseBoxWidget() {
        this.BoxWidget.collapse();
    }
}

export default AdminTest;