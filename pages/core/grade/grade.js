var app = getApp();
var config = require('../../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
          url: `${config.service.host}/weapp/kbcxcjcx`,
          method: 'POST',
          dataType: 'json',
          data: {
              'uid': app.globalData.uid,
          },
          header: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {

              var ajaxData = res.data;
              console.log('获取成绩', ajaxData);

              if ('request:ok'== res.errMsg ) {
                  that.setData({                    
                      grade: ajaxData
                  });
             }
          


          },
          fail: function (res) {
              that.showErrorDialog('获取失败');
          },
          complete: function (res) {

          }
      })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})