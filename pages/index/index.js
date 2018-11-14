Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [

      'http://yun.huse.cn/cloud/img/hnkjzyxy-banner-1.jpg',
      'http://yun.huse.cn/cloud/img/hnkjzyxy-banner-2.jpg',
      'http://yun.huse.cn/cloud/img/hnkjzyxy-banner-3.jpg'

    ]
    ,
    optionUrls: [
      { tap: "selectGrade", url: "http://www.mcy520.cn/huse/ico/成绩2.png", title: "成绩查询" },
      { tap: "selectCourse", url: "http://www.mcy520.cn/huse/ico/课表2.png", title: "课表查询" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/图书馆2.png", title: "图书查询" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/日历.png", title: "作息日历" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/english1.png", title: "四六级查询" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/学情反馈.png", title: "学情反馈" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/维修2.png", title: "物业报修" },
      { tap: "selectBook", url: "http://www.mcy520.cn/huse/ico/more.png", title: "更多" }
    ]
    ,
    toggles: [
      { id: 0, val: true, },
      { id: 1, val: true, },
      { id: 2, val: true, },
      { id: 3, val: true, }
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '数字校园',
      desc: '湖南科技学院 一体化校园移动门户',
      path: '/pages/index/index'
    };
  },
  selectGrade: function () {
    wx.navigateTo({
      url: '../core/grade/grade',
    })
  },
  selectCourse: function () {
    wx.navigateTo({
      url: '../core/course/course',
    })
  },
  selectBook: function () {
    wx.navigateTo({
      url: '../core/book/book',
    })
  },
  toggle: function (e) {


    var list = this.data.toggles;
    var id = e.currentTarget.id;

    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i].val = !list[i].val;
      }
      else {
        list[i].val = true;
      }
      this.setData({
        toggles: list
      });
    }

    // console.log(list)


  }
})