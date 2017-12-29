let app =getApp();
let resouse_ = require('../../utils/path_config.js');
let wxPublicService = require(resouse_.moddelUtilwxPublicSer),
	mainSer = require(resouse_.moddelUtilMainSer),
	optionWarnService = require(resouse_.moddelUtilOptionWarnSer),
	indexSer = require(resouse_.indexSer);
let optionModel = {
	wxLoginOptionFn:function(myData_){
		wxPublicService.wxLoginFn(function(loginInfo){//登录
			app.globalData.loginInfo = loginInfo;
			wxPublicService.wxGetUserInfoFn({//获取用户信息
				theApp:app,
				returnFunction:function(userInfo){
					app.globalData.userInfo = userInfo;
					wxPublicService.wxGetLocationFn(function(addressInfo){//获取地址
						let imitateLoginFn = function () {//模拟登陆
							let imitateLoginPostData = {
								openId: 'oGDzFs5kehjBr8jE70t1RSucDX-g',
								storeId: 182,
								seatId: 1093
							};
							indexSer.indexService.imitate_login(imitateLoginPostData, myData_ , function (responce) {
								app.globalData.theCookie = mainSer.getCookicFn(responce);
								optionWarnService.optionWarnModel.goToFn({ 'url': '../../pages/dining/dining' });
							});
						}
						let params = {
							appid: "wxed7******2d465",
							secret: "e9c5e4c******09ecc5ebd811",
							js_code: loginInfo.code,
							grant_type: "authorization_code"
						};
			//			2.获取openid
						myData_.theApp = app;
						myData_.whatOption = '获取openid:';
						myData_.errorFunction = function(){
							imitateLoginFn(); //模拟登陆
						}
						return indexSer.indexService.getOpenId(params, myData_, function () {
							imitateLoginFn(); //模拟登陆
						});
					});
				}
			});
		});
	},
	tstFn:function(){
		console.error(13);
	}
}
module.exports = {
	optionModel:optionModel
//	wxLoginOptionFn: optionModel.wxLoginOptionFn
};