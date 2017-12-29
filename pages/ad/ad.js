// pages/ad/ad.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 3
  },
  onLoad: function () {
    //广告
    var time = this.data.time;
    var that = this;
    var int = setInterval(function () {
      if (time == 0) {
        clearInterval(int);
        wx.redirectTo({
          url: '../index/index'
        });
      } else {
        time--;
      }
      that.setData({
        time: time
      });
    }, 1000);
  }

});