const getters = {
	visitedViews: state => state.tagsView.visitedViews,
	activeView: state => state.tagsView.activeView,
	device: state => state.app.device,
	theme: state => state.app.theme,
	avatar: state => state.user.avatar||'/img/logo.a5a6223c.png',
	nickname: state => state.user.name,
	welcome: state => state.user.welcome,
	roles: state => state.user.roles,
	userId: state => state.user.userId,
	userInfo: state => state.user.info,
	addRouters: state => state.permission.addRouters
}

export default getters
