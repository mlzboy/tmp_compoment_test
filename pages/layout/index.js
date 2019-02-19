// pages/layout/index.js



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 微信用户登录小程序
    wx.BaaS.login(false).then(res => {
      // 登录成功
      console.log("aaaaa",res.openid,res.id)
    }, err => {
      // 登录失败
    })

    let MyUser = new wx.BaaS.User()
    let currentUser = MyUser.getCurrentUserWithoutData()

    // age 为自定义字段
    currentUser.set('account_type', 1).update().then(res => {
      // success
      console.log("111111")
    }, err => {
      // err
    })

    // let tableName = '_userprofile'
    // let recordID = '71437442'

    // let Product = new wx.BaaS.TableObject(tableName)
    // Product.delete(recordID).then(res => {
    //   console.log("success")
    // }, err => {
    //   // err
    // })

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