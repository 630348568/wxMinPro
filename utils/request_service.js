//请求服务
let constsService = require('consts.js');
let optionWarnService = require('option_warn_service.js').optionWarnModel;
let optionFn = function (res, myData, returnFunction) {
	console.error(myData);
	if (res.data && res.data.status) {
		//是否是调用接口
		if (res.data.status == constsService.RESULTSTATUS.NO_AUTHORITY) {
			if (res.data.status == constsService.RESULTSTATUS.NO_AUTHORITY) {
				myData.message = '您没有访问权限！！！';
				optionWarnService.showToastErr(myData);
			} else if (res.data.status == constsService.RESULTSTATUS.RE_LOGIN) {
				myData.message = '访问超时，请重新登录！！！';
				myData.errorFunction = function () {
					wx.close();
					sessionStorage.clear();
					localStorage.clear();
				};
				optionWarnService.showToastErr(myData);
			}
		} else if (res.data.status == constsService.RESULTSTATUS.NOT_FOUND) {
			optionWarnService.showToastErr(myData);
			myData.message = '接口404！！！';
			optionWarnService.showToastErr(myData);
		} else if (res.data.status == constsService.RESULTSTATUS.SERVER_INTERNAL_ANOMSLIES) {
			myData.message = '系统繁忙，请与管理员联系';
			optionWarnService.showToastErr(myData);
		} else if (res.data.status == constsService.RESULTSTATUS.SUCCESS) {
			returnFunction(res);
		} else {
			myData.message = res.data.message;
			optionWarnService.showToastErr(myData);
		}
	} else {
		returnFunction(res);
	}
};

//微信的 wx.request 即便服务器返回的状态码是 4XX 5XX，仍然当做成功而不是失败，
//也就是说 wx.request 的 fail 只处理网络错误，即没有收到服务器应答才算做错误
let Promisify = require('../plugins/es6-promise.auto.min.js');
let wxPromisify = function (fn, myData) {
	return function (obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function (res) {
				//成功
				optionFn(res, myData, function () {
					resolve(res);
				});
			};
			obj.fail = function (res) {
				//失败
				reject(res);
			};
			fn(obj);
		});
	};
};
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
	let P = this.constructor;
	return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
		throw reason;
	}));
};

let requestUrl = function (constsUrl, who) {
	let data_ = ''; //hx--何旭;?dev--罗挺进销存,ting--罗挺，tingbiji",//罗挺笔记本254，chief
	if (who) {
		data_ = '?s=' + who;
	};
	let url_ = constsUrl + data_;
	return url_;
};
let requireModel = {
	myGet: function (httpObj) {
		let getRequest = wxPromisify(wx.request, httpObj.myData);
		return getRequest({
			url: requestUrl(httpObj.constsUrl), //仅为示例，并非真实的接口地址
			method: 'GET',
			data: httpObj.data,
			header: {
				'content-type': 'application/json', // 默认值
				'Cookie':httpObj.myData.theApp.globalData.theCookie,
				'twdrpUserAgent':'{"operationSource":1}',
			}
		});
	},
	myPost: function (httpObj) {
		let postRequest = wxPromisify(wx.request, httpObj.myData);
		return postRequest({
			url: requestUrl(httpObj.constsUrl), //仅为示例，并非真实的接口地址
			method: 'POST',
			data: httpObj.data,
			header: {
				"content-type": "application/x-www-form-urlencoded",
				'Cookie':httpObj.myData.theApp.globalData.theCookie,
				'twdrpUserAgent':'{"operationSource":1}',
			}
		});
	},
};
module.exports = {
	requireModel: requireModel
};