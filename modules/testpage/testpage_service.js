let requestService = require('../../utils/request_service.js');
let constsService = require('../../utils/consts.js');
let optionWarnService = require('../../utils/option_warn_service.js');
let diningService = {
	get_plat_goods_type_list: function (postData, myData, returnfunction) {		//----------获取js注入配置
		requestService.requireModel.myGet({
			constsUrl: constsService.URL.get_plat_goods_type_list,
			data: postData,
			myData: myData
		}).then(res => {
			returnfunction(res.data);
		});
	},
	get_plat_business_goods_list:function(postData, myData , returnfunction){  //商品信息列表(商家的+平台)
        requestService.requireModel.myGet({
			constsUrl: constsService.URL.get_plat_business_goods_list,
			data: postData,
			myData: myData
		}).then(res => {
			returnfunction(res.data);
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
	diningService: diningService
};