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
    mode:{type:String,value:"practice"},//practice,exam,memory_normal,memory_vip
     /*typ:{type:String,value:"mutiple"},
    question:{type:String,value:'aaaaa'},
    answers:{type:Array,value:["aaaa","bbb"]},*/
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
        "ABC",
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
  let selected_idx = store.get(this.properties.idata[0])

  let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx,this.properties.is_show_answer)
  console.log(r)
  that.setData({data:r})

},

  /**
   * 组件的方法列表
   */
  methods: {
    tap_confirm:function(e){
      var that = this;
      let selected_idx = store.get(this.properties.idata[0])
      let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idx, true)
      that.setData({ data: r })  
    },
    tap_select: function (e) {
      if (this.properties.mode == "memory_normal" || this.properties.mode == "memory_vip")
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
        console.log("==================")
        console.log(r)
        that.setData({ data: r })    
        return 
      }


      if(this.data.mode == "practice" || this.data.mode == "exam")
      {
        console.log("ttt,", this.data);

        var idx = e.currentTarget.dataset.idx;
        let r = core.data_state_change(this.properties.idata, this.properties.mode, [idx])
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
