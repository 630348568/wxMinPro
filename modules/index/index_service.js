let requestService = require('../../utils/request_service.js'),
	constsService = require('../../utils/consts.js'),
	optionWarnService = require('../../utils/option_warn_service.js');
var indexService = {
	imitate_login: function (postData, myData, returnfunction) {		//----------获取js注入配置
		requestService.requireModel.myGet({
			constsUrl: constsService.URL.imitate_login,
			data: postData,
			myData: myData
		}).then(res => {
			returnfunction(res);
		});
	},
	getOpenId: function (postData, myData, returnfunction) {			//----------获取openId
		requestService.requireModel.myGet({
			constsUrl: constsService.URL.get_js_config,
			data: postData,
			myData: myData
		}).then(res => {
			optionWarnService.optionWarnModel.sucessFn();
			console.error(res);
		});
	}
};
module.exports = {
	indexService: indexService
};