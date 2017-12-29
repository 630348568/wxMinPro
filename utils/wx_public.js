	let wxLoginFn = function(returnFunction){//wx------------登录
		wx.login({
			success: res => {
				if(res.code) {
					if(returnFunction){
						returnFunction(res);
					}
//					wx.request({
//						url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
//						data: {
//							code: res.code
//						}
//					})
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			}
		});
	};
	let wxCheckSessionFn = function(){//wx------------登录检查
		wx.checkSession({
			success: function() {
				//session 未过期，并且在本生命周期一直有效
			},
			fail: function() {
				//登录态过期
				wxLoginFn();
			}
		})
	};
	let wxGetUserInfoFn = function(obj) {//wx------------获取用户信息
		let userInfo_ = obj.theApp.globalData.userInfo;
		if(!userInfo_){
			wx.getUserInfo({
				withCredentials: false,
				success: function(res) {
					if(typeof obj.returnFunction == "function" && obj.returnFunction){
						obj.returnFunction(res.userInfo);
					}
				}
			});
		}
	};
	let wxGetLocationFn = function(returnFunction){//wx------------获取获取位置
		wx.getLocation({
		    type: 'wgs84',
		    success: function (res) {
		        returnFunction(res);
		    }
		})
	};
//	let wxWebsocketFn = function(obj){//wx------------Websocket
//		wx.connectSocket({
//		  url: '51emm.cc/customer/home/loginwarrant/login',
//		})
//		wx.onSocketOpen(function(res){
//		  console.log('WebSocket连接已打开！')
//		})
//		wx.onSocketError(function(res){
//		  console.log('WebSocket连接打开失败，请检查！')
//		})
//	};
module.exports = {
	wxLoginFn: wxLoginFn,				//wx------------登录
	wxCheckSessionFn: wxCheckSessionFn, //wx------------登录检查
	wxGetUserInfoFn: wxGetUserInfoFn,	//wx------------获取用户信息
	wxGetLocationFn: wxGetLocationFn,	//wx------------获取获取位置
//	wxWebsocketFn: wxWebsocketFn,       //wx------------Websocket
}
