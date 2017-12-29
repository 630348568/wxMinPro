let app = getApp();
var commonService = {
	wxLoginFn: function (returnFunction) {
		var wxLoginFn = app.globalData.requestService.requireModel.wxLogin();
		wxLoginFn().then(res => {
			returnFunction(res);
		});
	},
	wxGetSystemInfoFn: function (returnFunction) {
		var wxGetSystemInfoFn = app.globalData.requestService.requireModel.wxGetSystemInfo();
		wxGetSystemInfoFn().then(res => {
			returnFunction(res);
		});
	},
	wxGetUserInfoFn: function (returnFunction) {
		var wxGetSystemInfoFn = app.globalData.requestService.requireModel.wxGetUserInfo();
		wxGetSystemInfoFn().then(res => {
			returnFunction(res);
		});
	},
	imitate_login: function (postData, myData, returnfunction) {
		//获取js注入配置
		app.globalData.requestService.requireModel.myGet({
			constsUrl: app.globalData.constsService.URL.imitate_login,
			data: postData,
			myData: myData
		}).then(res => {
			returnfunction(res);
		});
	},
	getOpenId: function (postData, myData, returnfunction) {
		//获取openId
		app.globalData.requestService.requireModel.myGet({
			constsUrl: app.globalData.constsService.URL.get_js_config,
			data: postData,
			myData: myData
		}).then(res => {
			app.globalData.optionWarnService.optionWarnModel.sucessFn();
			console.error(res);
		});
	},
	wxPayFn:function(){
		
	}
};
module.exports = {
	commonService: commonService
};