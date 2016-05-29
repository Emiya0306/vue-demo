import Component from 'vue-class-component';
import tpl from './sidebar.tpl.html';
import style from './sidebar.scss';

@Component({
    template: tpl
})
class Sidebar{
    constructor() {}
    ready() {
    }
}

export default Sidebar;