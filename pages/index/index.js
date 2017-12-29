//获取应用实例
let resouse_ = require('../../utils/path_config.js');
let indexCrl = require(resouse_.indexCrl);
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		timeSecond: 3 //倒计时时间
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		});
	},
	tstFn:indexCrl.optionModel.tstFn,
	onLoad: function () {
		let this_ = this;
		indexCrl.optionModel.wxLoginOptionFn({this_: this_});
	}
});