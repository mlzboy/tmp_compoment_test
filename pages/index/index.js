var forward_idxs = require("../exam/forward_idxs.js")
var exam_idxs = require("../exam/exam_idxs.js")
var current_exam_idx = []
//index.js
//获取应用实例
const app = getApp()
var exam_no = -1
var course = ""
var page = 0
var list = []
Page({

  data: {
    showDialog: false,
    grids: [0, 1, 2, 3, 4, 5],
    showView: false,
    downAni: false,

    current_page: 0,
    mode: 'exam',
    idata: [
      9091,
      [
        ["大家好才是真的好啊", "1,3;4,7"],
        ["bbbbbbbbbb", "2,4;5,8"],
        ["cccccccccc", ""],
        ["bbbb", ""],
      ],
      "大学生品德评价指标体系一般包括（    ）。",
      "BD",
      "M",
      "大学心理学",
      "素质教育",
      /*
      "",//确定按钮颜色 
      false,//是否显示确认按钮
      false//是否已答题
      */
    ],
    is_vip: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (params) {
    console.log(typeof params.exam_no)
    console.log(typeof params.course)
    course = params.course
    exam_no = parseInt(params.exam_no)
    current_exam_idx = exam_idxs.exam_idxs[params.course][parseInt(params.exam_no)]
    console.log(current_exam_idx)
    wx.setNavigationBarTitle({
      title: params.course + params.exam_no
    })
    page += 1
    list = []
    for (let i = 0; i < current_exam_idx.length; ++i) {
      list.push(forward_idxs.forward_idxs[current_exam_idx[i]])
    }

    console.log("===", list.length)
    //list =[this.data.idata,this.data.idata]
    this.setData({
      list: list, is_vip: false, mode: this.data.mode,
      targetTime2: new Date().getTime() + 30 * 60 * 1000
    })



  },
  jump: function (e) {
    var tid = e.currentTarget.dataset.tid;
    console.log("zzz", tid)
    this.setData({ toview: tid })
  },
  anchor() {
    console.log("zzz")
    this.setData({ toview: "t20", showDialog: !this.data.showDialog })

    //展开隐藏菜单
    this.setData({
      showView: true,
      downAni: false
    });
  },
  myLinsterner(e) {
    console.log("icountdown finished")
  },
  loadmore: function () {
    var that = this;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
    console.log(current_exam_idx)
    current_exam_idx = exam_idxs.exam_idxs[course][exam_no]
    console.log(course)
    console.log("current_exam_idx", current_exam_idx)
    console.log("page", page)
    console.log("-------", forward_idxs.forward_idxs)
    let current_page = that.data.current_page + 1
    console.log(current_page)
    let idata = forward_idxs.forward_idxs[current_exam_idx[current_page]]
    console.log(idata)
    list = list.concat(list)
    this.setData({ list: list })

  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },

  tabClickQxup: function (e) {
    this.setData({
      showView: true,
      downAni: false
    });
  },
  tabClickQxdown: function (e) {
    console.log(e);

    var types = e.currentTarget.dataset.hef;
    if (types) {
      var states = false;
      var downAni = true;
    } else {
      var states = true;
      var downAni = false;
    }
    this.setData({
      downAni: downAni
    });
    var qthis = this;
    setTimeout(function () {
      qthis.setData({
        showView: states,
      });
    }, 250);
  },
})
