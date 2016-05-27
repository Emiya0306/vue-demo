import Component from 'vue-class-component';
import tpl from './app.tpl.html'

@Component({
    template: tpl,
    replace: false
})
class App{
    constructor() {}
    ready() {
    }
}

export default App;