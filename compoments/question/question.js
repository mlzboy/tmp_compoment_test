var _ = require('../../utils/underscore.js');
var db = require("../../utils/data.js");
var utils = require("../../utils/util.js")
var core = require("../../utils/core.js")
var store = require("../../utils/store.js")

var r;
var id = 2;
// compoments/question/question.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_show_answer:{type:Boolean,value:false},
    is_vip:{type:Boolean,value:true},
    mode:{type:String,value:"memory_normal"},//practice,exam,exam_show,memory_normal,memory_vip
     /*typ:{type:String,value:"mutiple"},
    question:{type:String,value:'aaaaa'},
    answers:{type:Array,value:["aaaa","bbb"]},*/
    idata: {
      type: Array, value: [
        9091,
        [
          ["大家好才是真的好啊", "1,3;4,7"],
          ["bbbbbbbbbb", "2,4;5,8"],
          ["cccccccccc", ""],
          ["ddddddddddd", ""],
        ],
        "大学生品德评价指标体系一般包括（    ）。",
        "BC",
        "M",
        "大学心理学",
        "memory tips",
        /*
        "",//确定按钮颜色 
        false,//是否显示确认按钮
        false//是否已答题
        */
      ]}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

ready:function(){

  var that = this
  this.data.a = 3
  if (this.properties.mode == "practice")
  {
    let selected_idx = store.get(this.properties.idata[0])
    let is_show_answer = this.properties.is_show_answer
    let is_practiced = store.is_practiced(this.properties.idata[0])//practiced
    if (is_practiced)
    {
      is_show_answer = true
    }
    let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx)
    //console.log("dddddddddd",r)
    r[9] = store.is_practiced(r[0])//practiced
    //console.log(r)
    that.setData({data:r})
    //console.log("eeeeeeeeee",r)
  }
  else if (this.properties.mode == "exam")
  {
    let selected_idx = store.get(this.properties.idata[0])
    let is_show_answer = this.properties.is_show_answer

    let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx)
    r[9] = store.is_practiced(r[0])//practiced
    console.log(r)
    that.setData({ data: r })   
  }
  else if (this.properties.mode == "exam_show")
  {
    let selected_idx = store.sget("exam",this.properties.idata[0])
    console.log("exam_show",selected_idx)
    let r = core.parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(this.properties.idata, this.properties.mode, selected_idx)
    //r[9] = true //examed
    //exam模式整体提交的时候，执行add_examed每道题
    console.log(r)
    that.setData({ data: r })   
  }
  else
  {
    let r = core.data_state_change(this.properties.idata,this.properties.mode,[])
    that.setData({ data: r }) 
  }
},

  /**
   * 组件的方法列表
   */
  methods: {
    tap_confirm:function(e){//确认多选提交出结果
      var that = this;
      /*
      if (((mode == "practice") && (_fulldata[4] == "M")) || (mode == "exam_show"))//出结果
      {
      */
        let selected_idx = store.get(this.properties.idata[0])
        let r = core.parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(this.properties.idata, this.properties.mode, selected_idx)
        that.setData({ data: r }) 
        
        console.log("tap_confirm:",r)
      /*
      } 
      */
    },


    tap_select: function (e) {
      if (this.properties.mode == "memory_normal" || this.properties.mode == "memory_vip" || this.properties.mode =="exam_show" || store.is_practiced(this.properties.idata[0])==true)
      {
        return
      }
      var that = this;
      var idx = e.currentTarget.dataset.idx;
      
      //practice or exam mode 选中变灰色，已选中的变不选中
      if (this.properties.idata[4] == 'M')//多选
      {
        console.log("tttttttttttt")
        store.set(this.properties.idata[0],idx)
        let selected_idx = store.get(this.properties.idata[0])
        console.log(selected_idx)
        let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx)
        r[9] = false//practiced
        console.log("==================>>>")
        console.log(r)
        that.setData({ data: r })    
        console.log("ttttttttttttttttt")
        return 
      }

      else
      {//mode=practice单选，直接给结果,标记为practiced//mode=exam,单选，只能选中一个，选中其中一个，原先选中的取消
        {
          store.sset(this.properties.mode,this.properties.idata[0], idx)
          let selected_idx = store.sget(this.properties.mode,this.properties.idata[0])
          console.log("zzz",selected_idx)
          let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx)

          if (this.data.mode == "practice")
          {
            store.add_practiced(r[0])
            r[9] = true//practiced
          }
          else//mode=exam
          {
            r[9] = false
          }
          that.setData({ data: r })
        }
        

      }
    },
    transform(data,mode) {
      console.log(data)
      //return data;
      var answers = data[1]
      if (mode == "highlight")
      {
        console.log("------------------")
        let _answers = core.highlight_answers(answers)
        data[1] = core.add_answer_char(_answers)
        console.log(data);      
        return data;
      }
      data[1] = core.add_answer_char(answers)
      return data;
    }
  }
})
