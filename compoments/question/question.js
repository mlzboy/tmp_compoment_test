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
    mode:{type:String,value:"exam"},//practice,exam,exam_show,memory_normal,memory_vip
     /*typ:{type:String,value:"mutiple"},
    question:{type:String,value:'aaaaa'},
    answers:{type:Array,value:["aaaa","bbb"]},*/
    idata: {
      type: Array, value: [
        9091,
        [
          ["aaaaaaaaa", "1,3;4,7"],
          ["bbbbbbbbbb", "2,4;5,8"],
          ["cccccccccc", ""],
          ["ddddddddddd", ""],
        ],
        "大学生品德评价指标体系一般包括（    ）。",
        "BC",
        "M",
        "大学心理学",
        "memory tips"
      ]}
  },

  /**
   * 组件的初始数据
   */
  data: {
    a:1,
    mode:"exam"
  },

ready:function(){

  var that = this
  this.data.a = 3
  if (this.properties.mode == "practiced")
  {
    let selected_idx = store.get(this.properties.idata[0])
    let is_show_answer = this.properties.is_show_answer
    let is_practiced = store.is_practiced(this.properties.idata[0])//practiced
    if (is_practiced)
    {
      is_show_answer = true
    }
    let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx,is_show_answer)
    r.push(store.is_practiced(r[0]))//practiced
    console.log(r)
    that.setData({data:r})
  }
  else if (this.properties.mode == "exam")
  {
    let selected_idx = store.get(this.properties.idata[0])
    let is_show_answer = this.properties.is_show_answer

    let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx, is_show_answer)
    r.push(store.is_practiced(r[0]))//practiced
    console.log(r)
    that.setData({ data: r })   
  }
},

  /**
   * 组件的方法列表
   */
  methods: {
    tap_confirm:function(e){
      var that = this;
      let selected_idx = store.get(this.properties.idata[0])
      let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx, true)
      store.add_practiced(r[0])
      r.push(true)//practiced
      that.setData({ data: r })  
    },
    tap_select: function (e) {
      if (this.properties.mode == "memory_normal" || this.properties.mode == "memory_vip" || store.is_practiced(this.properties.idata[0])==true)
      {
        return
      }
      var that = this;
      var idx = e.currentTarget.dataset.idx;
      
      if (this.properties.idata[4] == 'M')
      {
        store.set(this.properties.idata[0],idx)
        let selected_idx = store.get(this.properties.idata[0])
        let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx,false)
        r.push(false)//practiced
        console.log("==================")
        console.log(r)
        that.setData({ data: r })    
        return 
      }


      if(this.data.mode == "practice" || this.data.mode == "exam")
      {
        console.log("ttt,", this.data);
        var idx = e.currentTarget.dataset.idx;
        store.set(this.properties.idata[0], idx)
        let r = core.data_state_change(this.properties.idata, this.properties.mode, [idx])
        store.add_practiced(r[0])
        r.push(true)//practiced
        console.log(r)
        that.setData({ data: r })
        console.log(idx)
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
