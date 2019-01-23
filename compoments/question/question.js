var _ = require('../../utils/underscore.js');
var db = require("../../utils/data.js");
var utils = require("../../utils/util.js")
var core = require("../../utils/core.js")

var r;
var id = 2;
var is_selected = [false, false, false, false, false];
//var answers = [];


// compoments/question/question.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode:{type:String,value:"practice"},//practice,exam,memory_normal,memory_vip
    typ:{type:String,value:"mutiple"},
    question:{type:String,value:'aaaaa'},
    answers:{type:Array,value:["aaaa","bbb"]},
    idata: {
      type: Array, value: [
        9091,
        [
          ["构建意义；", "2,3"],
          ["构建程序；", "1,2;3,4"],
          ["构建原则；", ""],
          ["构建的具体指标", ""]
        ],
        "大学生品德评价指标体系一般包括（    ）。",
        "ACD",
        "mutiple",
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
  console.log("zzzzdd")
  console.log(this.properties.typ.value)
  console.log(this.properties.typ)
  this.properties.typ="single"
  console.log(this.properties.typ)
var that = this
  this.data.a = 3
//根据输入的外部数据转换为需要的格式

  let r = this.transform(this.properties.idata, this.properties.mode);
  console.log("r=>",r)
  console.log("====")
that.setData({data:r})
that.setData({a:5})
console.log(this.properties.idata);
//that.setData({data:this.properties.idata});
},

  /**
   * 组件的方法列表
   */
  methods: {
    tap_select: function (e) {
      console.log("ttt,", this.data);
      if(this.data.mode == "normal")
      {

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
