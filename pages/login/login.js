var app = getApp();
// pages/login/login.js
var Core = require('../../utils/des/core.js')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
    /**
     * 页面的初始数据
     */
    data: {

        clear1: true,     //动态显示X
        clear2: true,     //动态显示X
        key: '1234bx5678zh8765fw4321pt',
        username: null,
        password: null,
        savePwd: true,

        //缓存数据
        huseData: {
            US_NAME: null,   //用户名
            US_PWD: null,    //密码
            token: null,
            cookie: null,
            mobileno: null,
            fcode: null,
            id: null,
            userType: null,
            sfzjh: null,
            weChatOpenID: null,
            autologin: null    //是否保存密码自动登录
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
        var that = this
        //获取缓存中的内容
        wx.getStorage({
            key: 'huseData',
            success: function (res) {
                that.setData({ huseData: res.data })
                console.log(that.data.huseData)
            },
            fail: function () {
                console.log("缓存获取失败")
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this
        var HD = that.data.huseData;
        if (HD.autologin) {
            
            app.globalData.id = HD.id;
            app.globalData.uid = HD.sfzjh;
            app.globalData.xtoken = HD.token;
            
            wx.switchTab({
                url: '../index/index',
            })
            
/*
            that.setData({
                username: HD.US_NAME,
                password: HD.US_PWD,
                savePwd: HD.autologin
                
            })
            //自动登录
            that.btnLogin()
  */          
        }
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

    /*
    * 用户输入操作  
    */
    clearUsername: function () {
        this.setData({ username: null })
    },
    clearPassword: function () {
        this.setData({ password: null })
    },
    showClear1: function () {
        this.setData({ clear1: false })
    },
    showClear2: function () {
        this.setData({ clear2: false })
    },
    //失去焦点的时候保存值
    hiddenClear1: function () {
        this.setData({ clear1: true })
    },
    hiddenClear2: function () {
        this.setData({ clear2: true })
    },
    //获取用户输入的用户名
    userNameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    passWdInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    checkboxChange: function (e) {
        if (e.detail.value[0] != undefined) {
            this.setData({ savePwd: true })
        } else {
            this.setData({ savePwd: false })
        }
    },



    //DES加密
    encryptByDES: function (message, key) {
        var C = Core.CryptoJS;
        if (message == '' || message == null) {
        } else {
            var keyHex = C.enc.Utf8.parse(key);
            var encrypted = C.DES.encrypt(message, keyHex, {
                mode: C.mode.ECB,
                padding: C.pad.Pkcs7
            });
            return encrypted.toString();
        }
    },

    //DES  ECB模式解密
    decryptByDES: function (ciphertext, key) {
        var C = Core.CryptoJS;
        if (ciphertext == '' || ciphertext == null) {

        } else {
            //把私钥转换成16进制的字符串
            var keyHex = C.enc.Utf8.parse(key);
            //把需要解密的数据从16进制字符串转换成字符byte数组
            var decrypted = C.DES.decrypt({
                ciphertext: C.enc.Hex.parse(ciphertext)
            }, keyHex, {
                    mode: C.mode.ECB,
                    padding: C.pad.Pkcs7
                });
            //以utf-8的形式输出解密过后内容
            var result_value = decrypted.toString(C.enc.Utf8);
            return result_value;
        }
    },

    // des 加密 用户 密码  然后post登录 
    btnLogin: function () {
        //加解密匙7c40ea27e401ef0b3e3547c4d829e76e
        util.showBusy('正在登录...')

        var that = this;
        var keyValue = that.data.key;
        var username = that.data.username;
        var password = that.data.password;       
        
        if (password == "" || password == null || username == "" || username == null) {
             util.showModel("登录失败", "账号或密码不能为空")
            return;
        }

        //  console.log(that.encryptByDES(username, keyValue));
        // console.log(that.encryptByDES(password, keyValue));
        wx.request({
            url: `${config.service.host}/weapp/apidologin`,//'http://yun.huse.cn/api/dologin',
            method: 'POST',
            dataType: 'json',
            data: {
                'userName': that.encryptByDES(username, keyValue),
                'passWord': that.encryptByDES(password, keyValue)
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                console.log('第一次请求', res.data);
                that.clData(res.data, keyValue);

            },
            fail: function (res) {
                util.showModel("服务异常", "请链接网络后再试");
                
            },
            complete: function (res) {

            }
        })
    },

    //根据第一次返回的数据进行解密 第二次登录  如果登录成功 记得存入缓存  
    clData: function (ajaxData, keyValue) {
        var that = this;
        if (ajaxData.meta.success === false) {
            util.showModel("登录失败", "账号或密码错误")
            this.setData({ password: null })
        } else {
            // console.log('登录成功')

            var id = that.decryptByDES(ajaxData.data.id, keyValue);
            var xtoken = that.decryptByDES(ajaxData.data.xtoken, keyValue)
            var mobileno = that.decryptByDES(ajaxData.data.mobileno, keyValue)
            var fcode = that.decryptByDES(ajaxData.data.fcode, keyValue)
            var userType = that.decryptByDES(ajaxData.data.userType, keyValue)
            var sfzjh = ajaxData.data.sfzjh //身份证 没有加密
            var realname = that.decryptByDES(ajaxData.data.realname, keyValue)
            
            app.globalData.id = id;
            app.globalData.uid = sfzjh;
            app.globalData.xtoken = xtoken;
            
            console.log(id, xtoken)
            wx.request({
                url: `${config.service.host}/weapp/apibindalias`,
                method: 'POST',
                dataType: 'json',
                data: {
                    'id': id,
                    'cid': 'undefined',
                    'xtoken': xtoken
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    //  'X-Requested-With': 'XMLHttpRequest',
                    // "X-Token": xtoken
                },
                success: function (res) {
                    util.showSuccess('登录成功');

                    console.log('第二次请求', res);
                    var ajaxData = res.data;
                    if (undefined == ajaxData.meta.success || ajaxData.meta.success === true) {
                        console.log("完成登录,如果勾选记住密码，缓存数据！！")

                        //不管是否勾选 都缓存         
                        that.setData({
                            huseData: {
                                US_NAME: that.data.username,
                                US_PWD: that.data.password,
                                autologin: that.data.savePwd,
                                cookie: ajaxData.data,
                                token: xtoken,
                                id: id,                                
                                mobileno: mobileno,
                                fcode: fcode,
                                userType: userType,
                                sfzjh: sfzjh,
                                realname: realname,
                                weChatOpenID: ''  //这个以后就绑定Openid吧
                            }
                        })/
                        console.log(that.data.huseData)
                        /*    wx.setStorage({
                              key: 'huseData',
                              data: that.data.huseData
                            })
                            */
                        //调用同步接口
                        wx.setStorageSync('huseData', that.data.huseData)
                        //跳转页面                      
                        wx.switchTab({
                            url: '../index/index',
                        })

                    } else {
                        console.log(ajaxData.meta.message);
                    }
                },
                fail: function (res) {
                    util.showModel("服务异常", "若多次登录异常，请联系管理员解决");
                },
                complete: function (res) {

                }
            })
        }

    },

    //帮助提示
    tapHelp: function (e) {
        if (e.target.id == 'help') {
            this.hideHelp();
        }
    },
    showHelp: function (e) {
        this.setData({
            'help_status': true
        });
    },
    hideHelp: function (e) {
        this.setData({
            'help_status': false
        });
    }


})