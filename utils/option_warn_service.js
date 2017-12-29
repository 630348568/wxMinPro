//公共的业务操作方法
let constsService = require('consts.js');
var optionWarnModel = {
	wuxToastFn: function (this_, app) {
		app.wux(this_).$wuxToast.show({
			type: 'text',
			timer: 1000,
			color: '#fff',
			text: "用户名不能为空！",
			success: () => console.log('用户名不能为空！')
		});
	},
	showToastErr: function (myData) {//报错的处理
		var text_ = '';
		if (!myData.isPost && !myData.whatOption) {
			//非操作请求报错
			myData.whatOption = '操作';
		}
		if (myData.message) {
			text_ = myData.whatOption + myData.message;
		} else {
			text_ = '禁止操作';
		}
		if(myData.whatOption){
			myData.theApp.wux(myData.this_).$wuxToast.show({
				type: 'forbidden',
				timer: 1500,
				color: '#fff',
				text: text_,
				success: () => {
					if (myData.errorFunction) {
						myData.errorFunction();
					};
				}
			});
		}else{
			if (myData.errorFunction) {
				myData.errorFunction();
			};
		}
	},
	sucessFn: function () {
		wx.showToast({ //显示消息提示框
			title: '成功',
			icon: 'success', //只支持success,loading
			duration: 2000,
			success: function () {},
			fail: function () {
				console.warn(12);
			}
		});
	},
	loadingWarnFn: function () {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 10000
		});
		setTimeout(function () {
			wx.hideToast(); //隐藏消息提示框
		}, 2000);
	},

	isConfirmFn: function () {
		//显示模态弹窗
		wx.showModal({
			title: '提示',
			content: '这是一个模态弹窗',
			success: function (res) {
				if (res.confirm) {
					console.log('用户点击确定');
				}
			}
		});
	},
	showActionSheetFn: function () {
		//显示操作菜单
		wx.showActionSheet({
			itemList: ['A', 'B', 'C'],
			success: function (res) {
				if (!res.cancel) {
					console.log(res.tapIndex);
				}
			}
		});
	},
	setNavigationBarTitleFn: function (title) {
		//动态设置当前页面的标题。
		wx.setNavigationBarTitle({
			title: title
		});
	},
	goToFn: function (obj) {
		//关闭当前页面，跳转到应用内的某个页面。
		wx.redirectTo({
			url: obj.url
		});
	},
	getCurrentPagesFn: function () {
		//获取当前的页数的路由
		var data_ = getCurrentPages();
		return data_[0].route;
	},
	isCurrentPageFn: function (obj) {
		//是否是当前页
		if (getCurrentPages()[0].route == constsService.THEROUTE[obj.whichRote]) {
			return true;
		} else {
			return false;
		}
	},
	setPubData: function (this_, data_) {
		//更改公共数据
		this_.setData({
			optionPubData: data_
		});
	},
	thePubData: function (needData) {
		//更改主体信息
		var titles = {
			dining: '微信点餐',
			car: '购物车'
		};
		this.setNavigationBarTitleFn('× | ' + titles[needData.rote]);
		needData.this_.data.optionPubData.isNotCurrentPageRote = !this.isCurrentPageFn({
			'theApp': needData.app_,
			'whichRote': needData.rote
		});
		this.setPubData(needData.this_, needData.this_.data.optionPubData);
	}
};
module.exports = {
	optionWarnModel: optionWarnModel
};