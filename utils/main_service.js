let getCookicFn = function(cookicInfo) { //获取cookic
	let cookieData = cookicInfo.header['Set-Cookie'];
	let cookieDataList = cookieData.split(';');
	for (let i = 0;i<cookieDataList.length;i++) {
		if(cookieDataList[i].indexOf('token=')!=-1){
			return cookieDataList[i];
			break;
		}
	}
};
let deepCopyFn= function (obj) {
	return Object.assign({}, obj);
//  let copy;
//  // Handle the 3 simple types, and null or undefined
//  if (null == obj || "object" != typeof obj) return obj;
//  // Handle Date
//  if (obj instanceof Date) {
//      copy = new Date();
//      copy.setTime(obj.getTime());
//      return copy;
//  }
//  // Handle Array
//  if (obj instanceof Array) {
//      copy = [];
//      for (let i = 0, len = obj.length; i < len; i++) {
//          copy[i] = clone(obj[i]);
//      }
//      return copy;
//  }
//
//  // Handle Object
//  if (obj instanceof Object) {
//      copy = {};
//      for (let attr_ in obj) {
//          if (obj.hasOwnProperty(attr_)) copy[attr_] = deepCoyp(obj[attr_]);
//      }
//      return copy;
//  }
//
//  throw new Error("Unable to copy obj! Its type isn't supported.");
}
module.exports = {
	getCookicFn: getCookicFn, //获取cookic
	deepCopyFn:deepCopyFn,
}