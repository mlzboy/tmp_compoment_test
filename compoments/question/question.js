var _ = require('../../utils/underscore.js');
var db = require("../../utils/data.js");
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
    typ:{type:String,value:"mutiple"},
    question:{type:String,value:'aaaaa'},
    answers:{type:Array,value:["aaaa","bbb"]},
    data: {
      type: Array, value: [
        9091,
        [
          ["构建意义；", ""],
          ["构建程序；", ""],
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
    a:1
  },
ready:function(){
  console.log("zzzzdd")
  console.log(this.properties.typ.value)
  console.log(this.properties.typ)
  this.properties.typ="single"
  console.log(this.properties.typ)
var that = this
  this.data.a = 2
that.setData({a:2})

},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
