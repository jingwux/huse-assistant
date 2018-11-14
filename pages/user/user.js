// pages/user/user.js
var app = getApp();
var config = require('../../config')
Page({

    /**
     * 页面的初始数据
     */
    data: {

        realname: '',  //姓名
        workNumber: '',  //工号
        info: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //  console.log(app.globalData.id, app.globalData.xtoken )

        var that = this;
        wx.request({
            url: `${config.service.host}/weapp/apisysuser`,
            method: 'POST',
            dataType: 'json',
            data: {
                'id': app.globalData.id,
                'xtoken': app.globalData.xtoken
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {

                var ajaxData = res.data;
                console.log('获取个人信息', ajaxData);

                var birthday = that.formatDateTime1(ajaxData.data.birthday/1000);
                var major = ajaxData.data.major + " [" + ajaxData.data.classname.substr(2,4) + "]";
                var mobileno = ajaxData.data.mobileno.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'); 

              

                if (undefined == ajaxData.meta.success || ajaxData.meta.success === true) {
                    that.setData({
                        workNumber:ajaxData.data.workNumber,
                        info: [
                            { 'title': '姓名', 'url': 'http://www.mcy520.cn/huse/ico/name.png', 'value': ajaxData.data.realname },
                            { 'title': '性别', 'url': 'http://www.mcy520.cn/huse/ico/sex.png', 'value': ajaxData.data.deptName },
                            { 'title': '班级', 'url': 'http://www.mcy520.cn/huse/ico/class.png', "value": major},
                            { 'title': '生日', 'url': 'http://www.mcy520.cn/huse/ico/birth.png', 'value': birthday},
                            { 'title': '电话', 'url': 'http://www.mcy520.cn/huse/ico/phone.png', 'value': mobileno }
                            ]

                    });
                }else{
                    that.showErrorDialog('信息获取失败');
                }


            },
            fail: function (res) {
                that.showErrorDialog('网络错误');
            },
            complete: function (res) {

            }
        })



    },
   

    //处理生日
    formatDateTime1: function (timeStamp) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d;
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

    },
    huseQuit: function () {
        //清除缓存
        wx.removeStorage({
            key: 'huseData',
            success: function (res) {
                console.log("清除缓存", res)
            },
        })

        //执行解绑函数

        //执行logout函数

        //返回登录页面
        wx.redirectTo({
            url: '../login/login',
        })

    }
})