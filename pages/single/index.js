var forward_idxs = require("./forward_idxs.js")
var exam_idxs = require("./exam_idxs.js")
var store = require("../../utils/store.js")
var current_exam_idx = []
//index.js
//获取应用实例
const app = getApp()


Page({
  
  data: {
    showDialog:false,
    grids: [0, 1, 2, 3, 4, 5],
    course:"大学心理学",
    exam_no:0,
    current_page:0,
    list:[],
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
  submit_exam:function(){
    console.log("submit_exam")
    store.add_examed(this.data.course,this.data.exam_no)
    console.log("TTTT")
    this.setData({mode:"exam_show",list:this.data.list})
    wx.redirectTo({
      url: `/pages/exam/index?course=${this.data.course}&exam_no=${this.data.exam_no}`,
    })
  },
  re_exam:function(){
    console.log("re_exam")
    //清除examed中的项
    //删除exam_course_exam_no 选中项配置键
    //重新考
    store.re_exam(this.data.course,this.data.exam_no)
    wx.redirectTo({
      url: `/pages/exam/index?course=${this.data.course}&exam_no=${this.data.exam_no}`,
    })
    /*
    let current_exam_idx = exam_idxs.exam_idxs[this.data.course][parseInt(this.data.exam_no)]
    console.log(current_exam_idx)

    let list = []
    for (let i = 3; i < current_exam_idx.length; ++i) {
      list.push(forward_idxs.forward_idxs[current_exam_idx[i]])
    }

    console.log("===", list.length)
    //list =[this.data.idata,this.data.idata]
    this.setData({
      list: list, is_vip: false,
      targetTime2: new Date().getTime() + 10 * 60 * 1000,
      mode: "exam"
    })
    */
  },
  change_mode:function(e){
    console.log("change_mode")
    
    var panel = e.currentTarget.dataset.info;
    console.log("info---------------------------------",panel)
    if (panel == "exam_or_exam_show"){
      store._set("panel", panel)
    }
    else if (panel == "memory_normal"){
      store._set("panel", panel)
    }
    else{//memory_vip
      store._set("panel", panel)
      //TODO:fetch from server user is vip if yes return memory_vip status else naviage to vip loading page
    }
    wx.redirectTo({
      url: `/pages/exam/index?course=${this.data.course}&exam_no=${this.data.exam_no}`,
    })
  },
  onLoad: function (params) {

    console.log(typeof params.exam_no)
    console.log(typeof params.course)
    this.data.course = params.course
    this.data.exam_no = parseInt(params.exam_no)
    console.log("course",this.data.course)
    console.log("exam_no",this.data.exam_no)
    //this.data.mode = "exam"

    if ((this.data.mode == "exam") && (store.is_examed(this.data.course,this.data.exam_no) == true)){
      this.data.mode = "exam_show"
    }

    console.log("onLoad panel", this.data.panel)
    let panel = store.get_panel_from_localstoage(this.data.mode)
    console.log("data panel", panel)
    if (panel == "exam_or_exam_show") {
      if (store.is_examed(this.data.course, this.data.exam_no)) {
        this.data.mode = "exam_show"
      }
      else {
        this.data.mode = "exam"
      }
    }
    else {
      this.data.mode = panel
    }
    console.log(panel)


    current_exam_idx = exam_idxs.exam_idxs[params.course][parseInt(params.exam_no)]
    console.log(current_exam_idx)
    wx.setNavigationBarTitle({
      title: params.course+params.exam_no
    })
    this.data.list = []
    for(let i = 0 ; i < current_exam_idx.length; ++i)
    {
      this.data.list.push(forward_idxs.forward_idxs[current_exam_idx[i]])
    }
   
    console.log("===",this.data.list.length)
    console.log("====>>>>mode:",this.data.mode)
    //list =[this.data.idata,this.data.idata]
    this.setData({list:this.data.list,is_vip:false,
      targetTime2: new Date().getTime() + 30 * 60 * 1000,
      course:this.data.course,
      exam_no:this.data.exam_no,
      mode:this.data.mode
    })
 


  },
  jump:function(e){
    var tid = e.currentTarget.dataset.tid;
    console.log("zzz", tid)
    this.setData({toview:tid,showDialog:!this.data.showDialog})
  },
  anchor:function(){
    console.log("zzz")
    this.setData({toview:"t20",showDialog:!this.data.showDialog})


  },
  myLinsterner(e) {
   console.log("icountdown finished")
   },
  loadmore: function(){
    var that = this;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb")
    console.log(current_exam_idx)
    current_exam_idx = exam_idxs.exam_idxs[course][exam_no]
    console.log(course)
    console.log("current_exam_idx",current_exam_idx)
    console.log("page",page)
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

})
