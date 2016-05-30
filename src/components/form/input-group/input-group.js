import Component from 'vue-class-component';
import tpl from './input-group.tpl.html';
import style from './input-group.scss';

@Component({
    template: tpl,
    props: {
        id: String,
        label: String,
        addon: String,
        field: String,
        type: String,
        maxLength: String,
        showLimited: String,
        value: {
            type: String,
            twoWay: true
        }
    }
})
class InputGroup {

    data() {
        return {
            length: 0
        }
    }

    _onInput() {
        this.length = this.value.length;
    }

    _clearInput() {
        this.value = '';
    }

}

export default InputGroup;