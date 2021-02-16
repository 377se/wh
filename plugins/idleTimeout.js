import Vue from 'vue'
import IdleVue from '~/components/idleTimer'

const eventsHub = new Vue()

const options = {
	eventEmitter: eventsHub,
	idleTime: 5000
};
Vue.use(IdleVue, options);
