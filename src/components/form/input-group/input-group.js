import Component from 'vue-class-component';
import tpl from './input-group.tpl.html';
import style from './input-group.scss';

@Component({
    template: tpl,
    props: {
        field: String,
        type: String,
        length: String,
        value: {
            type: String,
            twoWay: true
        }
    }
})
class InputGroup {

    _onKeyDown(event) {
        this.value = event.target.value;
        console.log(event.target.value.length);
    }

    _onChange(event) {
        let value = event.target.value;
        this._setValue(value);
    }

    _setValue(value) {
        this.value = value;
    }
}

export default InputGroup;