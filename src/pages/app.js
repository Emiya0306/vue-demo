import Component from 'vue-class-component';
import tpl from './app.tpl.html';
import style from './app.scss';

import vSidebar from '../components/siderbar/sidebar';

@Component({
    template: tpl,
    replace: false,
    components: {
        vSidebar
    }
})
class App{
    ready() {
    }
}

export default App;