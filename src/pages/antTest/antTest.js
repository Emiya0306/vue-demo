import Vue from 'vue'
import Component from 'vue-class-component'
import vButton from 'vue-antd/components/button'
import vSteps from 'vue-antd/components/steps'
import vTimeline from 'vue-antd/components/timeline'
import vQueueAnim from 'vue-antd/components/queue-anim'
import tpl from './antTest.tpl.html'

@Component({
    template: tpl,
    components: {
        vButton,
        vSteps,
        vStep: vSteps.vStep,
        vTimeline,
        vTimelineItem: vTimeline.vTimelineItem,
        vQueueAnim
    },
    data: () => {
        return {
            show: false
        }
    }
})
class AntTest {

    init() {
        require('../../../node_modules/vue-antd/style/index.less');
    }

    ready() {
        console.log(this.$refs);
    }

    _handleClick() {
        this.show = !this.show;
    }
}

export default AntTest;