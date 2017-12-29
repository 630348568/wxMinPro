//app.js
import wux from 'plugins/toast/wux';
let wxPublicService = require('utils/path_config.js').wxPublicService;
App({
	//弹框插件
	wux: scope => new wux(scope),
	setPageData: function(data_) {
		//  if (data_.code == 0) {
		//      var albummid = data_.data.mid;
		//      var img = 'http://y.gtimg.cn/music/photo/mid_album_500/' + albummid.slice(-2, -1) + '/' + albummid.slice(-1) + '/' + albummid + '.jpg'
		//      this.setData({albumInfo: data.data, coverImg: img});
		//      this.setListBgColor(data.data.color);
		//  }
	},
	onLaunch: function() {
		var that_ = this;
//		wxPublicService.wxLoginFn(function(data){//登录
//			that_.globalData.loginInfo = data;
//			wxPublicService.wxGetUserInfoFn({//获取用户信息
//				theApp:that_,
//				returnFunction:function(data){
//					that_.globalData.userInfo = data;
//				}
//			});
//		});
	},
	//公共数据
	globalData: {
		userInfo: '',
		loginInfo: '',
		theCookie:'',
	}
});