var store = require("../../utils/store.js")
var core = require("../../utils/core.js")

//获取应用实例
const app = getApp()


Page({
  
  data: {
    score:0,
    showDialog:false,
    course:"大学心理学",
    exam_no:0,
    category:'',
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
    // console.log("info---------------------------------",panel)
    store._set("panel", panel)
    
    if (this.data.category.length == 0){
      wx.redirectTo({
        url: `/pages/exam/index?course=${this.data.course}&exam_no=${this.data.exam_no}`,
      })      
    }
    else{
      wx.redirectTo({
        url: `/pages/exam/index?course=${this.data.course}&category=${this.data.category}`,
      }) 
    }

  },
  onLoad: function (params) {
    console.log(typeof params.exam_no)
    console.log(typeof params.course)
    console.log(typeof params.category)
    this.data.course = params.course
    this.data.exam_no = (params.exam_no == undefined) ? -1 : parseInt(params.exam_no)//考试页时有此项
    this.data.category = (params.category == undefined) ? "" : params.category//专项练习有此项
    console.log("course",this.data.course)
    console.log("exam_no",this.data.exam_no)
    console.log("category",this.data.category)
    //load require bussiness data
    let DATA = require("../../data/" + this.data.course + ".js")
    let current_x_idxs = []
    let title = this.data.course 
    this.data.mode = "practice"
    let panel = store.get_panel_from_localstoage(this.data.mode)
    if (panel != "exam_or_exam_show")
    {
      this.data.mode = panel
    }
    switch(this.data.category){
      case "single":
        current_x_idxs = DATA.single_idxs
        title += " 单选题"
        break
      case "mutiple":
        current_x_idxs = DATA.mutiple_idxs
        title += " 多选题"
        break
      case "judge":
        current_x_idxs = DATA.judge_idxs
        title += " 判断题"
        break
      case "star":
        current_x_idxs = store.star_idxs(this.data.course)
        title += " 收藏题"
        break
      case "wrong":
        current_x_idxs = store.wrong_idxs(this.data.course)
        title += " 错题"
        break
      default://exam
        current_x_idxs = DATA.exam_idxs[this.data.exam_no]
        title += " " + core.digital_number_to_chinese_number(this.data.exam_no,"卷")
        this.data.mode = "exam"
        if (store.is_examed(this.data.course,this.data.exam_no)){
          this.data.mode = "exam_show"
        }

        //count the score
        let key1 = `${this.properties.course}_exam_${this.properties.exam_no}`
        let user_selected_idxs = store._get(key1)
        console.warn("TTTTTTTTTTTTTTTTTTTTTTTT")
        this.data.score = core.count_the_score(user_selected_idxs,DATA.forward_idxs)
        this.setData({score:this.data.score})
        // store._hset(key1,key2,selected_idxs)
        // key1 = `${this.properties.course}_${this.properties.mode}`
        // key2 = this.properties.exam_no

        //from localstoage load selected panel data otherwise use mode status as selected panel
        panel = store.get_panel_from_localstoage(this.data.mode)
        console.log("data panel", panel)
        if (panel == "exam_or_exam_show") {
          if (store.is_examed(this.data.course, this.data.exam_no)) {
            this.data.mode = "exam_show"

          }
          else {
            this.data.mode = "exam"
          }
        }
        else if (panel == "practice"){
          this.data.mode = "exam"
        }
        else {
          this.data.mode = panel
        }
        console.log(panel,this.data.mode)
        break;
    }
    console.log("A111111111111111111111111111")
    // console.log(current_x_idxs)
    console.log("current_x_idx length:",current_x_idxs.length)
    
    wx.setNavigationBarTitle({
      title:title
    })
    this.data.list = []
    for(let idx of current_x_idxs)
    {
      this.data.list.push(DATA.forward_idxs[idx])
    }
    console.log("===",this.data.list.length)
    
    console.log("====>>>>mode:",this.data.mode)
    //list =[this.data.idata,this.data.idata]
    this.setData({
      list:this.data.list,
      targetTime2: new Date().getTime() + 30 * 60 * 1000,
      course:this.data.course,
      exam_no:this.data.exam_no,
      mode:this.data.mode,
      category:this.data.category
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
  }


})
