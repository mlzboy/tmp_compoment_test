var touchDot = 0;//触摸时的原点
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理时间记录
var app = getApp();

Page({
  data: {
    offset: 108,
    current_idx: 1,
    width: 30,
    cls:"a",
    doing:false
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tabClick: function (e) {
    var that = this;
    var _idx = e.target.id;
    var _offset = 0;
    var _width = 0;
    var _cls = "a";
    switch (_idx) {
      case "1":
        _width = 30;
        _offset = 108;
        _cls = "a";
        break;
      case "2":
        _width = 30;
        _offset = 230 + 38*3;
        _cls = "b";
        break;
      case "3":
        _width = 30;
        _offset = 240 * 2 + 38*2+24+5;
        _cls = "c";
        break;
      case "4":
        _width = 30;
        _offset = 240 * 3 + 38*3-9;
        _cls = "d";
        break;
    }

    this.setData({
      offset: _offset,
      current_idx: _idx,
      width: _width,
      cls:_cls
    });
    console.log("current_idx", _idx);
    console.log("offset", _offset);
  },
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function (e) {
    var that =this;
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    var that = this;
    var id = parseInt(e.currentTarget.id);
        // 向左滑动  
    if (touchMove - touchDot <= -50) {
      that.data.doing=true;
      console.log("left...");
      if(id== 1)
      {
        console.log("已经最左");
        that.data.doing=false;
        return;
      }
      var _idx = (id-1).toString();
      var _offset = 0;
      var _width = 0;
      var _cls = "a";
      switch (_idx) {
        case "1":
          _width = 30;
          _offset = 108;
          _cls = "a";
          break;
        case "2":
          _width = 30;
          _offset = 230 + 38 * 3;
          _cls = "b";
          break;
        case "3":
          _width = 30;
          _offset = 240 * 2 + 38 * 2 + 24 + 5;
          _cls = "c";
          break;
        case "4":
          _width = 30;
          _offset = 240 * 3 + 38 * 3 - 9;
          _cls = "d";
          break;
      }
      
      this.setData({
        offset: _offset,
        current_idx: _idx,
        width: _width,
        cls: _cls
      });
      that.data.doing = false;
    }
    // 向右滑动
    if (touchMove - touchDot >= 50) {
      data.doing = true;
        console.log('向右滑动');

        console.log("id:",id);
      if (id == 4) {
        console.log("已经最右");
        that.data.doing=false;
        return;
      }
      var _idx = (id + 1).toString();
      var _offset = 0;
      var _width = 0;
      var _cls = "a";
      switch (_idx) {
        case "1":
          _width = 30;
          _offset = 108;
          _cls = "a";
          break;
        case "2":
          _width = 30;
          _offset = 230 + 38 * 3;
          _cls = "b";
          break;
        case "3":
          _width = 30;
          _offset = 240 * 2 + 38 * 2 + 24 + 5;
          _cls = "c";
          break;
        case "4":
          _width = 30;
          _offset = 240 * 3 + 38 * 3 - 9;
          _cls = "d";
          break;
      }

      this.setData({
        offset: _offset,
        current_idx: _idx,
        width: _width,
        cls: _cls
      });
      that.data.doing=false;
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
  },

})
