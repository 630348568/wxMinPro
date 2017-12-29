/**
 * 常量
 */
var RESULTSTATUS = {
  /* 成功*/
  "SUCCESS": "200",
  /*失败*/
  "FAILURE": "-1",
  "FORMFAILURE": "-2",
  /*没权限*/
  "NO_AUTHORITY": "401",
  /*找不到界面*/
  "NOT_FOUND": "404",
  /*服务器内部异常*/
  "SERVER_INTERNAL_ANOMSLIES": "500",
  /*服务器内部异常*/
  "BAD_GATEWAY": "502"
};
var THEROUTE = {
  index: "pages/index/index",
  logs: "pages/logs/logs",
  dining: "pages/dining/dining",
  cart: "pages/cart/cart",
  order: "pages/order/order",
  user: "pages/user/user",
  allorder: "pages/allorder/allorder",
  ticket: "pages/ticket/ticket"
};
//	var basePath = 'http://chief-info.com/customer/';   
var basePath = 'http://51emm.cc' + '/customer/';
var URL = {
  //首页
  'imitate_login': basePath + 'home/loginwarrant/login', //http://192.168.99.162/customer/home/loginwarrant/login?openId=o-O7Owb68TzwMrKhG8qfNym5ecNs&storeId=121&seatId=669&s=chief
  'get_js_config': basePath + 'home/loginwarrant/getJsConfig', //获取JS注入配置
  'give_right_to_login': basePath + 'home/loginwarrant/in', //授权登录
  'get_parentid_info': basePath + 'totalorder/getParentid', //获取总单ID
  //充电宝
  'get_smcc_dining_table_info': basePath + 'smcc/getSmccDiningTableInfo', //wx获取餐台充电宝信息接口
  'sure_smcc_pay': basePath + 'smcc/confirmCharging', //确认充电支付接口
  'get_websocket_info': '/busplat/usermanager/smccLogin', //获取websocket推送的信息
  // 商品信息
  'get_goods_type_info': basePath + 'home/dining/findStoreGoodsCategory', //获取商品类别
  'get_goods_list_info': basePath + 'home/dining/pagingFindGoodsInfoByCategory', //商品信息列表
  'get_must_select_list': basePath + 'home/dining/pagingFindGoodsRequired', //查询必选菜列表
  'post_goods_info_to_cart': basePath + 'spcart/addShoppingCart', //提交菜品信息到购物车
  'update_goods_info_to_cart': basePath + 'spcart/updateShoppingCartDetail', //修改购物车
  'get_goods_method_parent': basePath + "home/dining/getPractice", //获取做法父类
  'get_goods_method_child': basePath + "home/dining/getGoodsMake", //获取做法子类
  
  
  'get_plat_goods_type_list': basePath + 'home/dining/findStoreGoodsTypeName', //获取商品类别(本平台)
  'get_business_goods_type_list': basePath + 'home/dining/findStoreGoodsCategoryByTypeName', //获取商品类别(商家的)
  'get_plat_business_goods_list': basePath + 'home/dining/pagingFindGoodsInfoByCategoryAndTypeName', //商品信息列表(商家的+平台)
  // 购物车
  'my_shopping_cart': basePath + 'spcart/searchMyShoppingCart', //我的购物车
  'post_i_am_boss': basePath + 'spcart/iamOwner', //我做东
  'post_dinner_num': basePath + 'totalorder/submitPeopleNumber', //东家提交用餐人数
  'get_unsubmit_num': basePath + 'totalorder/getUnsubmittedUserNumber', //获取未提交用餐的人数
  'get_shopping_car_mark': basePath + 'spcart/getCartIdentity', //获取购物车标识
  'check_shopping_cart_info': basePath + 'spcart/searchShoppingCart', //查看购物车
  // 订单页
  // 东家
  'get_unsubmit_goods_info': basePath + 'totalorder/findWaitConfirmGoods', //获取待确认商品(东家)
  'get_unpaid_goods_info': basePath + 'totalorder/findUnpaidGoods', //获取未支付商品(东家)
  'get_paid_goods_info': basePath + 'totalorder/findPaidGoods', //获取已支付商品(东家)
  'post_dinner_order': basePath + 'totalorder/submitPlaceOrder', //东家提交下单
  'post_add_dishes_info': basePath + 'spcart/confirmSubmitToMe', //东家二次加菜提交  
  'get_dinner_num': basePath + 'totalorder/getPeopleNumber', //获取用餐人数
  // 客人
  'get_my_order_for_dinner': basePath + 'meorder/getMeorder', //获取我的订单（客人）
  'get_my_order_for_other': basePath + 'meorder/getOtherOrder', //获取其他人的订单（客人）
  'post_order_to_boss': basePath + 'spcart/confirmSubmitToOwner', //确认给东家（客人）

  // 准备支付页
  'get_unpaid_order_for_dinner': basePath + 'payorder/getUnPaidOrder', //获取待付订单
  'get_order_total_pay': basePath + 'payorder/getSettleAccounts', //获取总计
  'get_discounts_info': basePath + 'payorder/getDiscountStrategy', //获取优惠方式
  // 支付接口
  'post_wechat_pay_info': basePath + 'payorder/wxJsPay', //微信支付
  'post_ali_pay_info': basePath + 'payorder/aliJsPay', //支付宝支付

  // 呼叫服务员
  'call_waiter_info': basePath + 'home/dining/callWaiter', //呼叫服务员
  'get_message_list_info': basePath + 'home/dining/searchDtCallMessage', //餐台呼叫消息列表

  // 查看我的信息
  'get_myself_info': basePath + 'mine/getMineInfo', //查看我的信息
  'get_identify_code': basePath + "mine/verification", //获取验证码
  'get_existence_vip_info': basePath + 'mine/selectMember', //商家会员办理查询
  'post_vip_info': basePath + 'mine/createMember', //录入商家会员
  'get_my_vip_list': basePath + 'mine/getMemberInfo', //我的会员卡列表
  //会员
  'get_is_bsiness_vip': basePath + 'mine/getBusinessMemberInfo', //绑定---是否是商铺的会员
  'get_vip_bind_info': basePath + 'mine/getMemberBindInfo', //绑定---获取会员绑定信息
  'bind_vip': basePath + 'mine/bindMember', //绑定---实现商户会员绑定
  // 获取餐台信息
  'get_table_info': basePath + 'home/dining/getSeatInfo' //获取餐台信息
};
module.exports = {
  RESULTSTATUS: RESULTSTATUS,
  URL: URL,
  THEROUTE: THEROUTE
};