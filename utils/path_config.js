//公共的
let constsService = 'consts.js',
	requestService = 'request_service.js',
	optionWarnService = 'option_warn_service.js',
	utilService = 'util.js',
	wxPublicService = 'wx_public.js',
	mainSer = 'main_service.js';
let utils = '../../utils/';
let moddelUtilConstsSer = utils+constsService,
	moddelUtilwxPublicSer = utils + wxPublicService,
	moddelUtilOptionWarnSer = utils + optionWarnService,
	moddelUtilMainSer = utils + mainSer;
//服务
let indexSer = '../../modules/index/index_service.js',
	indexCrl = '../../modules/index/index_controller.js',
	diningSer = '../../modules/dining/dining_service.js',
	testpageSer = '../modules/testpage/testpage_service.js',
	testpageCrl ='../modules/testpage/testpage_controller.js';
//	diningCtl = require('../controllers/dining_controller.js');

module.exports = {
	//公共的
	constsService: constsService,          //接口地址
	requestService: requestService,		   //http的请求服务
	optionWarnService: optionWarnService,  //公共操作方法（提示）
	utilService: utilService,			   //公共数据等的处理方法
	wxPublicService: wxPublicService,	   //微信公共方法的封装
	mainSer:mainSer,					   //所有的公共
	
	//
	moddelUtilwxPublicSer:moddelUtilwxPublicSer,
	moddelUtilMainSer:moddelUtilMainSer,
	moddelUtilOptionWarnSer:moddelUtilOptionWarnSer,
	//服务
	indexSer:indexSer,				   	   //index主页面的服务
	indexCrl:indexCrl,
	diningSer:diningSer,				   //dining
	testpageSer:testpageSer,			   //testpage
	testpageCrl:testpageCrl
//	diningCtl:diningCtl,
};
