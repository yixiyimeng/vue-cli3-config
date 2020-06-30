import Vue from 'vue';
import Storage from 'vue-ls';

let options = {
	namespace: 'teacher__',
	name: 'ls',
	storage: 'local',
};

Vue.use(Storage, options);
