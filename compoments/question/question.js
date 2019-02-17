var core = require("../../utils/core.js")
var store = require("../../utils/store.js")



// compoments/question/question.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_vip: { type: Boolean, value: true },
    course: { type: String, value: "大学心理学" },
    exam_no: { type: Number, value: 0 },
    mode: { type: String, value: "practice" },//practice,exam,exam_show,memory_normal,memory_vip
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
        "大学心理学",//数据中为空，按课程加载数据，此行不在需要
        "素质教育",
        /*
        "",//确定按钮颜色 
        false,//是否显示确认按钮
        false//是否已答题
        */
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function () {

    var that = this
    if (this.properties.mode == "practice") {
      // console.log("---------------------------------------")
      let key1 = `${this.properties.course}_${this.properties.mode}`
      let key2 = this.properties.idata[0]
      let selected_idxs = store.get_selected_idxs(key1, key2)
      // console.log("-----------------",selected_idxs)
      let is_practiced = store.is_practiced(this.data.course,this.properties.idata[0])//practiced
      var r = []
      if (is_practiced) {
        console.log("AEAAAA", r)
        r = core.parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(this.properties.course,this.properties.idata, this.properties.mode, selected_idxs)
        r[9] = true
        //console.log("is_practiced")
      }
      else {
        r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idxs)
        r[9] = false
      }
      that.setData({ data: r })
    }
    else if (this.properties.mode == "exam") {
      let key1 = `${this.properties.course}_${this.properties.mode}_${this.properties.exam_no}`
      let key2 = this.properties.idata[0]
      let selected_idxs = store.get_selected_idxs(key1,key2)
      let r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idxs)
      r[9] = false//not examed
      //console.log(r)
      that.setData({ data: r })
    }
    else if (this.properties.mode == "exam_show") {
      let key1 = `${this.properties.course}_exam_${this.properties.exam_no}`
      let key2 = this.properties.idata[0]     
      let selected_idxs = store.get_selected_idxs(key1,key2)
      //console.log("exam_show",selected_idx)
      let r = core.parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(this.properties.course,this.properties.idata, this.properties.mode, selected_idxs)
      //r[9] = true //examed =>该句代码省力量是因为上一条函数中包含该行代码
      //exam模式整体提交的时候，执行add_examed每道题
      //console.log(r)
      that.setData({ data: r })
    }
    else {//memory_normal or memory_vip
      let r = core.data_state_change(this.properties.idata, this.properties.mode, [])
      that.setData({ data: r })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap_confirm: function (e) {//确认多选提交出结果
      var that = this;
      /*
      if (((mode == "practice") && (_fulldata[4] == "M")) || (mode == "exam_show"))//出结果
      {
      */
      let key1 = `${this.properties.course}_${this.properties.mode}_${this.properties.exam_no}`
      let key2 = this.properties.idata[0]
      let selected_idxs = store.get_selected_idxs(key1,key2)
      let r = core.parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(this.properties.course,this.properties.idata, this.properties.mode, selected_idxs)
      // if (this.properties.mode == "practice") {
      //   store.add_practiced(this.properties.idata[0])
      //   r[9] = true //practiced
      // }
      that.setData({ data: r })

      //console.log("tap_confirm:",r)
      /*
      } 
      */
    },


    tap_select: function (e) {
      let key1,key2,r
      if (this.properties.mode == "memory_normal" || this.properties.mode == "memory_vip" || this.properties.mode == "exam_show" || (store.is_practiced(this.properties.course,this.properties.idata[0]) == true && this.properties.mode == "practice")) {
        return
      }
      var that = this;
      var idx = e.currentTarget.dataset.idx;

      //practice or exam mode 选中变灰色，已选中的变不选中
      if (this.properties.idata[4] == 'M')//多选
      {
        if (this.properties.mode == "practice")
        {
          key1 = `${this.properties.course}_${this.properties.mode}`
          key2 = this.properties.idata[0]      
        }
        else//exam mode
        {
          key1 = `${this.properties.course}_${this.properties.mode}_${this.properties.exam_no}`
          key2 = this.properties.idata[0]
        }
        let selected_idxs = store.get_selected_idxs(key1,key2)
        selected_idxs = store.process_multiple_selected_logic(selected_idxs,idx)
        store._hset(key1,key2,selected_idxs)
        r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idxs)
        r[9] = false//exam
        that.setData({ data: r })
        return      
      }
      else {//mode=practice单选，直接给结果,标记为practiced//mode=exam,单选，只能选中一个，选中其中一个，原先选中的取消
        {
          if (this.data.mode == "practice") {
            key1 = `${this.properties.course}_${this.properties.mode}`
            key2 = this.properties.idata[0]
            let selected_idxs = store.get_selected_idxs(key1,key2)
            selected_idxs = store.process_single_selected_logic(selected_idxs,idx)
            store._hset(key1,key2,selected_idxs)
            r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idxs)//虽是单选，但使用同样的list结构
            store.add_practiced(this.properties.course,r[0])
            r[9] = true//practiced

          }
          else//mode=exam
          {
            key1 = `${this.properties.course}_${this.properties.mode}_${this.properties.exam_no}`
            key2 = this.properties.idata[0]
            let selected_idxs = store.get_selected_idxs(key1,key2)
            selected_idxs = store.process_single_selected_logic(selected_idxs,idx)
            store._hset(key1,key2,selected_idxs)
            r = core.data_state_change(this.properties.idata, this.properties.mode, selected_idxs)
            r[9] = false
          }
          console.log(r)
          that.setData({ data: r })
        }


      }
    }
  }
})
