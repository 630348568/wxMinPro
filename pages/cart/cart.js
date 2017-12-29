var app = getApp();
var cart = [];
var secindex = null;
Page({
  data: {
    optionPubData: { 'isNotCurrentPageRote': false }, //stt
    bottomTab: -1
  },
  onLoad: function (res) {
    //----stt （更改公共主题信息）
    var this_ = this;
    var optionWarnModel_ = app.globalData.optionWarnService.optionWarnModel;
    optionWarnModel_.thePubData({ this_: this_, app_: app, rote: 'car' });
    //stt----


    var that = this;

    //取购物车的值
    wx.getStorage({
      key: 'cart',
      success: function (res) {
        cart = res.data;
        console.log(res.data);
        that.setData({
          cart: res.data
        });
      }
    });

    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl
        });
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
  //购物车加数量
  addcartnum: function (e) {
    var idx = e.currentTarget.dataset.index;
    cart[idx].num++;
    console.log(cart);
    this.setData({
      cart: cart
    });
  },
  //购物车减数量
  subcartnum: function (e) {
    var idx = e.currentTarget.dataset.index;
    cart[idx].num--;
    console.log(cart);
    if (cart[idx].num == 0) {
      cart.splice(idx, 1);
    }
    this.setData({
      cart: cart
    });
  },
  //我做东
  toOrder: function () {

    this.masktap();
    wx.setStorage({
      key: 'order',
      data: cart,
      success: function (res) {
        wx.navigateTo({
          url: '../order/order?order=' + cart
        });
      }
    });
  },
  //确认给东家
  ToOwner: function () {},
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
      //idx = -1
      // tabflag = false
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
  //遮罩层的点击事件
  masktap: function () {
    if (secindex != -1) {
      secindex = -1;
    }

    this.setData({
      bottomTab: -1
    });
  },
  //input失焦事件
  numinput: function (e) {
    console.log(e);
    console.log(e.detail.value);
    var value = parseInt(e.detail.value);
    var index = e.currentTarget.dataset.index;

    //判断输入数量
    if (value <= 0 || value == '' || value != e.detail.value) {
      wx.showToast({
        title: '请输入合理的数字', //提示信息
        image: '../../images/error.png',
        duration: 1000 //时间
      });
    } else {
      cart[index].num = value;
    }
    this.setData({
      cart: cart
    });
    console.log("cart", cart);
  }
});