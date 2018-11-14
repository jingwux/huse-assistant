// pages/course/course.js
var app = getApp();
var config = require('../../../config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
        mycourse: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: `${config.service.host}/weapp/kbcxgetkbxxbyxh`,
            method: 'POST',
            dataType: 'json',
            data: {
                'uid': app.globalData.uid,
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                console.log('获取课表', res);
                var ajaxData = res.data;


                if ('request:ok' == res.errMsg) {
                  
                    var mycourse = [];

                    for (var i = 0; i < ajaxData.length;i++){
                       // console.log(ajaxData[i].kcsj);
                        var kcsj = ajaxData[i].kcsj;
                        var colstr = kcsj.substr(0, 1);
                  
                        var rowstr = kcsj.substr(2, 1);
                        var rowint = parseInt(rowstr - 1)/2 ;
                        var jsint = (kcsj.length - 1) / 2;
                        
                        var content = ajaxData[i].kcmc + "\n" + ajaxData[i].kkzc + "周 " + ajaxData[i].jsxm + "\n" + ajaxData[i].jiaosmc ;
                      
                        mycourse.push({xqj:colstr,sksj:rowstr, kcmc:content});
                     
                     

                        /*
                        switch (colstr){
                            case "1": mycourse[rowint].yi = content; break;
                            case "2": mycourse[rowint].er = content; break;
                            case "3": mycourse[rowint].san = content; break;
                            case "4": mycourse[rowint].si = content; break;
                            case "5": mycourse[rowint].wu = content; break;
                            default:break;
                        }
                        */
                        
                    }
                  
                    
               
                     that.setData({
                         mycourse: mycourse
                      });
                  
                     console.log(that.data.mycourse);
           
                    

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