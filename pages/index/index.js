var core = require("../../utils/core.js")
var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    list:["有理想信念有道德情操有扎实学识有仁爱之心","做学生锤炼品格引路人做学生学习知识引路人","做学生创新思维引路人做学生奉献祖国引路人","坚持教书和育人相统一坚持言传和身教相统一"],
    list2:[],
    courses:["大学心理学","高等教育法规","大学教育学","教师伦理学"]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    for (let i = 0; i <= 19; ++i){
      this.data.list2.push(core.digital_number_to_chinese_number(i,"卷"))
    }
    this.setData({list2:this.data.list2})




  }
})