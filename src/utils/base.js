export function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// export const baseURL = 'http://47.111.169.108:8880/platform-face';
// export const fileUrl = 'http://47.111.169.108:8880/platform-face'
export const  baseURL='https://www.edu113.zkxltech.com/platform-face';
export const  fileUrl='https://www.edu113.zkxltech.com/platform-face';

export const webInfo={
	name:'智慧教育云平台管理系统',
	engname:'SMART EDUCATION CLOUD PLATFORM MANAGEMENT SYSTEM',
	logo:'/img/cslogo5.png'
}


export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}
