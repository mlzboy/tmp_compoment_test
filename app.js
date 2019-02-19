//app.js
App({
  onLaunch: function () {


    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    let clientID = '504ecd2f96cd3d5fa69b'//'知晓云管理后台获取到的 ClientID'
    wx.BaaS.init(clientID)
    


    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })



  },
  globalData: {
    userInfo: null
  }
})