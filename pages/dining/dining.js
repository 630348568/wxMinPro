//获取应用实例
var app = getApp();
let diningCtl = require('../../modules/dining/dining_controller.js');
let resouse_ = require('../../utils/path_config.js');
let	optionWarnService = require(resouse_.moddelUtilOptionWarnSer),
	diningSer = diningCtl.diningSer,
	wxPublicService = require(resouse_.moddelUtilwxPublicSer),
	mainSer = require(resouse_.moddelUtilMainSer);
var image;
var listnum = 10;
var foodslist = [];
var cart = [];
var clicknum = 0;
var listnum2;
var secindex = null;
var navflag = null;
var screenWidth;
var cartTop = 0; //购物车位置Top
var cartLeft = 0; //购物车位置Left
var aniTop = 0; //动画圆点位置Top
var aniLeft = 0; //动画圆点位置Left
var makeidx; //传给确认做法的索引
var parentID; //存放传给确认做法的类别ID
Page({
	data: {
		optionPubData: { 'isNotCurrentPageRote': false }, //stt
		platGoodsTypeList:[], //平台分类
		goodsInfoList:[],//所有商品信息列表
		currentTab2: -1,
		currentTab: 0,
		bottomTab: -1,
		flag: true,
		openflag: false,
		viewright: 0,
		viewtop: 0,
		aniflag: true,
		scrollTop: 0,
		typenum: 0, //分类初始数量
		makeBox: false, //控制做法框的显示和隐藏
		chooseTap: false, //做法框几选几触发事件
		// Package: ['套餐1', '套餐2', '套餐3', '套餐4', '套餐5', '套餐6', '套餐7', '套餐8']
	},
	//获取购物车和动画圆的节点信息
	queryMultipleNodes: function () {
		var query = wx.createSelectorQuery();
		query.select('#mycart').boundingClientRect(function (rect) {
			cartTop = rect.top;
			cartLeft = rect.left;
		}).exec();
		query.selectAll('.anicircle').boundingClientRect(function (rects) {
			rects.forEach(function (rect) {
				aniTop = rect.top;
				aniLeft = rect.left;
			});
		}).exec();
	},
	onLoad: function (options) {
		let this_ = this;
		let myData = { this_: this_, theApp: app };
//		optionWarnService.optionWarnModel.thePubData({ this_: this_, app_: app, title_: '× | 微信点餐', rote: 'dining' });
		diningCtl.opGetPlatGoodsTypeListFn(this_,myData);//获取商品列表
		diningCtl.opGetThisTypeListFn(this_,myData);//初次加载所有的商品
	},

	navbarTap: function (e) {
		var idx = e.currentTarget.dataset.idx;
		var foods = this.data.foods;
		var typenum = this.data.typenum;
		var navindex = -1;

		var scrollTop = this.data.scrollTop;
		for (var i = 0; i < foods.length; i++) {
			if (foods[i].type == idx) {
				//typenum++;
				typenum = i;
				break;
			}
		}

		if (idx == 0 || idx == 1) {
			scrollTop = 0;
		} else {
			wx.getSystemInfo({
				success: function (res) {
					screenWidth = res.screenWidth;
				}
			});
			console.log(typenum, parseInt(typenum / 2));
			scrollTop = parseInt(typenum / 2) * 300 * (screenWidth / 750);
		}

		this.setData({
			navindex: navindex,
			scrollTop: scrollTop,
			currentTab: idx,
			currentTab2: -1,
//			toView:
		});
	},
	//套餐分类点击事件
	navbarTap2: function (e) {
		var idx = e.currentTarget.dataset.idx;
		//清除滚动改变的navindex影响产生actice的样式
		var navindex = -1;
		this.setData({
			currentTab: -1,
			currentTab2: idx,
			navindex: navindex
		});
	},
	//滚轮事件
	changeTop: function (e) {
//		var currentTab = -1;
//		var foods = this.data.foods;
//		var changeScrollTop = e.currentTarget.offsetTop - 200;
//		//获取设备信息
//		wx.getSystemInfo({
//			success: function (res) {
//				screenWidth = res.screenWidth;
//			}
//		});
//
//		var foodsindex = parseInt(changeScrollTop / 300 / (screenWidth / 750) * 2);
//
//		//避免报错type undefined
//		if (foodsindex <= 0) {
//			foodsindex = 0;
//		}
//		console.log("foodsindex", foodsindex);
//
//		//navindex用作和index比较
//		var navindex = foods[foodsindex].type;
//		this.setData({
//			changeScrollTop: changeScrollTop,
//			foodsindex: foodsindex,
//			navindex: navindex,
//			currentTab: currentTab
//		});
	},
	//添加商品
	add: function (e) {
		var idx = e.currentTarget.dataset.index;
		var foods = this.data.foods;
		// var num = this.data.foods[idx].num;
		var addflag = this.data.addflag;
		//获取做法框状态
		var makeBox = this.data.makeBox;
		this.clicktrue();

		//判断有没有做法
		if (foods[idx].practiceListJson == 1) {
			//有做法
			makeBox = true;
			this.setData({
				makeBox: true
			});
			//存索引给做法确认函数
			makeidx = idx;
			//存类别id发查询做法请求
			parentID = foods[idx].parentID;
			//发送查询做法请求
			// wx.request({
			//   url: '',
			// })
		} else {
			//没有做法
			this.addcart(idx);
		}

		//圆点动画
		var animation = wx.createAnimation({
			duration: 1000, //动画持续时间
			timingFunction: "ease",
			delay: 0
		});
		this.animation = animation;
		// console.log(e);
		// idx = e.currentTarget.dataset.index;

		//元素在页面的位置
		var top = e.touches[0].pageY;
		var left = e.touches[0].pageX;
		console.log("E", e);
		console.log(left);

		if (left > 180) {
			animation.translate(0, 0).opacity(1).step({
				duration: 0
			});
			setTimeout(function () {
				animation.translate(-40, 100).opacity(0).step();
				this.setData({
					animationData: animation.export()
				});
			}.bind(this), 100);
		} else {
			animation.translate(0, 0).opacity(1).step({
				duration: 0
			});
			setTimeout(function () {
				animation.translate(100, 100).opacity(0).step();
				this.setData({
					animationData: animation.export()
				});
			}.bind(this), 100);
		}

		this.setData({
			foods: foods,
			animationData: animation.export()
			// cart:cart,
			// clicknum:clicknum
		});
	},
	//减少商品
	sub: function (e) {
		var idx = e.currentTarget.dataset.index;
		var foods = this.data.foods;
		var num = this.data.foods[idx].num;
		if (num > 0) {
			num--;
		} else {
			num = 0;
		}

		//购物车圆点数量就是减商品的次数
		clicknum--;

		//到购物车减少商品
		for (var j = 0; j < cart.length; j++) {
			if (cart[j].name == foods[idx].name) {
				cart[j].num--;
				if (cart[j].num == 0) {
					cart.splice(j, 1);
				}
			}
		}
		console.log("foods", foods);
		console.log("cart", cart);

		this.data.foods[idx].num = num;
		this.setData({
			clicknum: clicknum,
			foods: foods,
			cart: cart
		});
	},

	//查看商品详情
	showdetails: function (e) {
		var idx = e.currentTarget.dataset.index;
		image = this.data.foods[idx].image;
		this.setData({
			image: image,
			flag: false
		});
	},
	//隐藏商品详情
	hidedetails: function () {
		this.setData({
			flag: true
		});
	},

	navbarbottomtap: function () {
		this.masktap();
		wx.setStorage({
			key: 'cart',
			data: cart,
			success: function (res) {
				wx.navigateTo({
					url: '../cart/cart?cart=' + cart
				});
			}
		});
	},
	//扇形动画效果
	navbarbottomtap2: function (e) {
		var idx = e.currentTarget.dataset.index;

		if (secindex == 1) {
			idx = -1;
		}
		secindex = idx;
		if (secindex == 1) {
			//呼叫服务员打开部分动画
			var ani = wx.createAnimation({
				duration: 300, //动画持续时间
				timingFunction: "ease",
				delay: 0,
				transformOrigin: "bottom center"
			});
			this.animation = ani;
			ani.scale(0, 0).step();
			setTimeout(function () {
				ani.scale(1, 1).step();
				this.setData({
					myani: ani.export()
				});
			}.bind(this), 30);
		} else {
			//呼叫服务员关闭部分动画
			var ani = wx.createAnimation({
				duration: 300, //动画持续时间
				timingFunction: "ease",
				delay: 0,
				transformOrigin: "bottom center"
			});
			this.animation = ani;
			ani.scale(1, 1).step();
			setTimeout(function () {
				ani.scale(0, 0).step();
				this.setData({
					myani: ani.export()
				});
			}.bind(this), 30);
		}

		this.setData({
			bottomTab: idx,
			myani: ani.export()
		});
	},
	navbarbottomtap1: function (e) {
		var idx = e.currentTarget.dataset.index;
		if (secindex == 0) {
			idx = -1;
		}
		secindex = idx;
		if (secindex == 0) {
			//选项栏打开动画
			var ani1 = wx.createAnimation({
				duration: 500,
				timingFunction: "ease",
				delay: 0
			});
			this.animation = ani1;
			ani1.bottom("-300rpx").step();
			setTimeout(function () {
				ani1.bottom("95rpx").step();
				this.setData({
					anima: ani1.export()
				});
			}.bind(this), 30);
		} else {
			//选项栏消失动画
			var ani1 = wx.createAnimation({
				duration: 500,
				timingFunction: "ease",
				delay: 0
			});
			this.animation = ani1;
			ani1.bottom("95rpx").step();
			setTimeout(function () {
				ani1.bottom("-300rpx").step();
				this.setData({
					anima: ani1.export()
				});
			}.bind(this), 30);
		}

		this.setData({
			bottomTab: idx,
			anima: ani1.export(),
			makeBox: false
		});
	},
	//遮罩层的点击事件
	masktap: function () {
		if (secindex != -1) {
			secindex = -1;
		}

		this.setData({
			bottomTab: -1,
			makeBox: false
		});
	},
	//封装数组点击事件初始化
	clicktrue: function () {
		var foods = this.data.foods;
		for (var i = 0; i < foods.length; i++) {
			foods[i].click = true;
		}
	},
	//做法框关闭
	makeClose: function () {
		this.setData({
			makeBox: false,
			chooseTap: false
		});
	},
	//做法框几选几
	choose: function () {
		this.setData({
			chooseTap: true
		});
	},
	//做法确认加入购物车
	makeconfirm: function () {
		//查询商品做法
		this.addcart(makeidx);
	},
	//封装加入购物车
	addcart: function (idx) {
		//发送加入购物车请求
		// wx.request({
		//   url: 'http://51emm.cc/twdrp/spcart/addShoppingCart',
		//   method:'POST',
		//   data:{
		//     goodsInfoId:'',
		//     goodsDemand:'',
		//     goodsQuantity:'',
		//     practiceName:''
		//   },
		//   success:function (res){
		//     console.log(res.data);
		//   }
		// })
		var that = this;
		console.log(this);
		var foods = this.data.foods;
		var num = this.data.foods[idx].num;
		//初始化数组点击状态
		this.clicktrue();
		num++;
		foods[idx].click = false;
		this.data.foods[idx].num = num;
		//到购物车显示商品
		if (cart.length == 0) {
			cart.push(foods[idx]);
		} else {
			for (var j = 0; j < cart.length; j++) {
				if (cart[j].name == foods[idx].name) {
					console.log(cart);
					cart.splice(j, 1);
					cart.push(foods[idx]);
				} else if (j == cart.length - 1 && cart[j].name != foods[idx].name) {
					cart.push(foods[idx]);
				}
			}
		}
		//购物车圆点数量就是加商品的次数
		clicknum++;
		this.setData({
			foods: foods,
			cart: cart,
			makeBox: false,
			clicknum: clicknum
		});
	}
});