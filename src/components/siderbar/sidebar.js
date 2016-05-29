import Component from 'vue-class-component';
import tpl from './sidebar.tpl.html';
import style from './sidebar.scss';

@Component({
    template: tpl
})
class Sidebar {
    data () {
        return {
            currentLink: this.$route.name
        }
    }

    ready() {
    }

    getRouteName(event) {
        // 外部this.$route.name的变化,并不会引起this.currentLink watch的变化
        // 因此,只能通过获取DOM节点上的属性名,来判断点击的是哪个路由
        this.currentLink = event.target.attributes.getNamedItem('name') ?
            event.target.attributes.getNamedItem('name').value :
            '';
    }
}

export default Sidebar;