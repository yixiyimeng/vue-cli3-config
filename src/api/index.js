export const api = {
	getlistLevelOneMenu: '/plat/sys/menu/listLevelOneMenu',
	getlistLevelOtherMenu: '/plat/sys/menu/listLevelOtherMenu',
	getDict: '/plat/common/dict/query',
	getToplist: '/inte/topicRec/list_topic_for_pull_down', //查询主题
	getCountToplist: '/inte/answerRec/list_topic_for_statistical_pull_down',
	getSubjectlist: '/inte/answerRec/list_subject_for_pull_down', //查询科目
	getAnswerToplist: '/inte/answerRec/list_topic_for_pull_down', //查询答题记录主题
	getSchoollist: '/inte/answerRec/list_school_for_pull_down', //查询校区
	getClasslist: '/inte/answerRec/list_class_for_pull_down', //查询班级
	getCountClasslist: '/inte/answerRec/list_class_for_statistical_pull_down ', //查询班级
	getCountSubjectlist: '/inte/topicRec/subject_pull_down', //根据时间校区查询科目
	/*getCountSchoollist:'/inte/answerRec/list_school_for_statistical_pull_down',//根据时间查询校区*/
	getCountSchoollist: '/inte/topicRec/school_pull_down ', //根据时间查询校区
	getOrglist: '/foun/org/list_for_pull_down', //查询所有启用的机构
	geAllSchoollist: '/foun/school/list_for_pull_down', //根据机构查询校区
	logout: '/plat/logout',
	resetPwd: '/plat/sys/user/resetPwd',
	updatePeronal: '/plat/sys/user/updatePeronal',
	uploadImg: '/plat/sys/user/uploadImg',
	getCurrLoginUser: '/plat/sys/user/getCurrLoginUser', //获取当前用户信息
	getTopicDate: '/inte/voteScoreTitle/list_datatime_for_pull_down', //根据机构和月份查询有效日期
	getSchoollistbyDate: '/inte/voteScoreTitle/list_school_for_pull_down', //根据机构和日期查询学校
	getClasslistbyDate: '/inte/voteScoreTitle/list_class_for_pull_down', //根据机构和日期查询班级
	getTopiclistbyDate: '/inte/voteScoreTitle/list_topic_for_pull_down', //根据机构和日期查询班级
	gettestTopicDate: '/inte/testPaperRec/list_datatime_for_pull_down', //根据机构和月份查询有效日期
	gettestSchoollistbyDate: '/inte/testPaperRec/list_school_for_pull_down', //根据机构和日期查询学校
	gettestClasslistbyDate: '/inte/testPaperRec/list_class_for_pull_down', //根据机构和日期查询班级
	gettestTopiclistbyDate: '/inte/testPaperRec/list_topic_for_pull_down', //根据机构和日期查询班级
	gettestSubjectlist: '/inte/testPaperRec/list_subject_for_pull_down',
	/*获取所有学生维度的下拉选项框接口*/
	getAllTopic: '/inte/analyse/getAllTopic',
	getDatatime:'/inte/topicRec/datatime_pull_down',//查询班级维度可用时间
	gettestPaperReclist: '/inte/testPaperRec/list',
	getHomeworkPullData:'/foun/offlineTestPaper/getPullData'//课后作业下来筛选

}
import {
	axios
} from '@/utils/request'

//post
export function postAction(url, parameter, obj = {}) {
	return axios(Object.assign({}, {
		url: url,
		method: 'post',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: parameter
	}, obj))
}
export function postQsAction(url, parameter) {
	function $stringify(param) {
		var query = []
		for (var k in param) {
			query.push(k + '=' + param[k])
		}
		return query.join('&')
	}
	let param = $stringify(parameter);
	return axios({
		url: url,
		method: 'post',
		data: param
	})
}
export function getlistLevelOtherMenu(parameter) {
	return axios({
		url: api.getlistLevelOtherMenu,
		method: 'post',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: parameter
	})
}
export function getDict(type) {
	return postAction(api.getDict, {
		type: type
	})
}
export function getToplist(parameter) {
	return postAction(api.getToplist, parameter).then(da => {
		return da.data
	})
}
export function getSchoollist(parameter) {
	return postAction(api.getSchoollist, parameter).then(da => {
		return da.data
	})
}
export function getClasslist(parameter) {
	return postAction(api.getClasslist, parameter).then(da => {
		return da.data
	})
}
export function getOrglist(parameter) {
	return postAction(api.getOrglist, parameter).then(da => {
		return da.data
	})
}
/* 根据机构查询所有能用的校区 */
export function geAllSchoollist(parameter) {
	return postAction(api.geAllSchoollist, parameter).then(da => {
		return da.data
	})
}

export function logout() {
	return postAction(api.logout).then(da => {
		return da.data
	})
}
export function postActionUpload(url, parameter) {
	return axios({
		url: url,
		method: 'post',
		headers: {
			"Content-Type": "multipart/form-data"
		},
		processData: false,
		data: parameter
	})
}
