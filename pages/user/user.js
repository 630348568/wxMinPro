var app = getApp();
var secindex = null;
Page({
  data: {
    images: [{
      url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'
    }, {
      url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'
    }, {
      url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'
    }, {
      url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
    }],
    bottomTab: -1
  },

  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        });
        switch (res.userInfo.gender) {
          case 0:
            that.setData({
              sex: '未知'
            });
            break;
          case 1:
            that.setData({
              sex: '男'
            });
            break;
          case 2:
            that.setData({
              sex: '女'
            });
            break;
        }
      },
      fail: function () {
        // fail
        console.log("获取失败！");
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！");
      }
    });
  },
  //底部导航栏事件
  navbarbottomtap: function (e) {

    var idx = e.currentTarget.dataset.index;
    if (secindex == 2) {
      idx = -1;
    }
    secindex = idx;
    this.setData({
      bottomTab: idx
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
      anima: ani1.export()
    });
  },
  //跳转到开票信息页面
  toticket: function () {
    wx.navigateTo({
      url: '../ticket/ticket'
    });
  },
  //遮罩层的点击事件
  masktap: function () {
    if (secindex != -1) {
      secindex = -1;
    }

    this.setData({
      bottomTab: -1
    });
  }
});