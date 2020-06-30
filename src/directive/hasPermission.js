import Vue from 'vue'
import {GetQueryString} from './base'
/**权限指令**/
Vue.directive('has', {
	bind: function(el, binding) {
		if (!Vue.prototype.$_has(binding.value)) {
			//el.parentNode.removeChild(el);
			el.style.display = 'none';
		}
	}
});
//权限检查方法
Vue.prototype.$_has = function(value) {
	// debugger
	//console.log(value)
	let isExist = false;
	let menuId = GetQueryString('menuId');
	let buttonpermsStr = sessionStorage.getItem("buttenpremissions["+menuId+"]");
	if (buttonpermsStr == undefined || buttonpermsStr == null) {
		return false;
	}
	let buttonperms = JSON.parse(buttonpermsStr);
	for (let i = 0; i < buttonperms.length; i++) {
		//console.log(buttonperms[i])
		if (buttonperms[i].indexOf(value) > -1) {
			isExist = true;
			break;
		}
	}
	//console.log(isExist)
	return isExist;
};
