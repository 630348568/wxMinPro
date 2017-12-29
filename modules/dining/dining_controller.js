//获取应用实例
let resouse_ = require('../../utils/path_config.js');
let optionWarnService = require(resouse_.moddelUtilOptionWarnSer);
let diningSer = require(resouse_.diningSer).diningService;
let wxPublicService = require(resouse_.moddelUtilwxPublicSer);
let mainSer = require(resouse_.moddelUtilMainSer);
let opGetPlatGoodsTypeListFn = function(this_,myData){//查询店铺商品分类--操作
		let serGetPlatGoodsTypeListFn = function(acceptData){  //查询店铺商品分类--数据获取
			let this_ = acceptData.this_;
			diningSer.get_plat_goods_type_list({},acceptData.myData,function(res){
				this_.data.platGoodsTypeList = res.data;
				this_.setData({
					platGoodsTypeList: this_.data.platGoodsTypeList,
				});
			});
		};
		let myData_ = mainSer.deepCopyFn(myData);
		myData_.whatOption = '获取openid:';
		serGetPlatGoodsTypeListFn({'this_':this_,'myData':myData_});
	};
let opGetThisTypeListFn = function(this_,myData){  //商品信息列表(二级)
		let serGetPlatBusinessGoodsListFn = function(acceptData){
			let this_ = acceptData.this_;
			let postData = {
				'goodsCategoryId' : '',
				'typeName':'',
				'offset':1,
				'limit':10000,
			};
			diningSer.get_plat_business_goods_list(postData, myData,function(res){
				this_.data.goodsInfoList = res.data.goodsInfoList;
				this_.setData({
					goodsInfoList: this_.data.goodsInfoList,
				});
			});
		}
		let myData_ = mainSer.deepCopyFn(myData);
		myData_.whatOption = '获取所有商品信息:';
		serGetPlatBusinessGoodsListFn({'this_':this_,'myData':myData_});
	};
module.exports = {
	resouse_: resouse_,
	optionWarnService:optionWarnService,
	diningSer:diningSer,
	wxPublicService:wxPublicService,
	opGetPlatGoodsTypeListFn:opGetPlatGoodsTypeListFn,//操作--查询店铺商品分类
	opGetThisTypeListFn:opGetThisTypeListFn,//操作查找所有的商品
};