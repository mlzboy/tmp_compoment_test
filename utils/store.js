
var add_wronged = (course,id) => _add_Xed(course + "_wronged",id)
var remove_wronged = (course,id) => _remove_Xed(course+"_wronged",id)
var is_wronged = (course,id) => _is_Xed(course + "_wronged",id)

//var get_stared 
var add_stared = (course,id) => _add_Xed(course + "_stared",id)
var remove_stared = (course,id) => _remove_Xed(course + "_stared",id)
var is_stared = (course,id) => _is_Xed(course + "_stared",id)
var is_practiced = (course,category,id) => _is_Xed(course + "_" + category + "_practiced",id)
var add_practiced = (course,category,id) => _add_Xed(course + "_" + category + "_practiced",id)
var is_examed = (course,id) => _is_Xed(course + "_examed",id)
var add_examed = (course,id) => _add_Xed(course + "_examed",id)
var add_answered = (key,id) => _add_Xed(key,id)

/*
删除examed key中对应的考试的值，
同时删除以exam_course_exam_no命名的上次考试选择的键
同时删除以exam_course_exam_no_answered命名的上次考试选择的键
*/
function re_exam(course,exam_no)
{
  let ret = []
  if (_has_key(course + "_examed")) {
    ret = _get(course + "_examed")
    let idx = ret.indexOf(exam_no)
    if (idx > -1) {
      //删除list中存在的idx
      ret.splice(idx, 1)
      _set(course + "_examed", ret)
    }
  }

  let key = `${course}_exam_${exam_no}`
  console.log(key)
  if (_has_key(key)){
    _del_key(key)
    console.log("delete")
  }
  
  key = `${course}_exam_${exam_no}_answered`
  console.log(key)
  if (_has_key(key)){
    _del_key(key)
    console.log("delete")
  }  
}

function _del_key(key){
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.log("delete",e)
  }
  wx.removeStorageSync(key)
}

function _is_Xed(key,id)
{
  let list = []
  if (_has_key(key)) {
    list = _get(key)
    let ret = list.indexOf(id)  
    return (ret > -1) ? true : false
  }
  return false;
}

function _add_Xed(key,id)
{
  let list = []
  if (_has_key(key))
  {
    list = _get(key)
    let ret = list.indexOf(id)
    if (ret > -1) {
      return false
    }
  }
  list.push(id)
  _set(key,list)
  return true
}

function _remove_Xed(key,id){
  let list = []
  if (_has_key(key)){
    list = _get(key)
    let ret = list.indexOf(id)
    if (ret > -1){
        //删除list中存在的idx
        list.splice(ret,1)
        _set(key,list)
        return true
    }
  }
  return false
}


/*
selected_idxs,此前选中的数据，一般为[],[0],[1],[2],[3]
返回的结果为[current_idx]或是[],为空是因为原selected_idxs中即包含该值
*/
function process_single_selected_logic(selected_idxs,current_idx){
  let ret = selected_idxs.indexOf(current_idx)
  if (ret > -1)
  {
    return []
  }
  return [current_idx]

}
/*
selected_idxs,此前选中的数据，一般为[0,1,2,3],[0,1,2,3,4],[],[0,1]...
返回的结果为：如果current_idx此前在selected_idxs中，则删除该项返回，
             如果没有则加入些项返回
selected_idx + or - current_idx
*/
function process_multiple_selected_logic(selected_idxs,current_idx){
  let ret = selected_idxs.indexOf(current_idx)
  if (ret > -1)
  {
    //删除list中存在的idx
    selected_idxs.splice(ret,1)
  }
  else
  {
    selected_idxs.push(current_idx)
  }
  return selected_idxs
}

function _set(key,value)
{
  wx.setStorageSync(key.toString(), value)
  //dict[key]= value
}

function get_star_idxs(course){
  let key = course + "_stared"
  if (_has_key(key))
  {
      return _get(key)
  }
  else
  {
    return []
  }
}

function get_wrong_idxs(course){
  let key = course + "_wronged"
  if (_has_key(key))
  {
      return _get(key)
  }
  else
  {
    return []
  }  
}

/*
example1:
let key1 = `${this.properties.course}_${this.properties.mode}`
let key2 = this.properties.idata[0]
example2:
let key1 = `${this.properties.course}_${this.properties.mode}_${this.properties.exam_no}`
let key2 = this.properties.idata[0]
id为正排索引id
*/
function get_selected_idxs(key1,key2){
  let dict = {}
  if (_hhas_key(key1,key2)){
    return _hget(key1,key2)
  }
  //_hset(key1,key2,[])
  return []
}

function _hhas_key(key1,key2){
  if (_has_key(key1)){
    let dict = _get(key1)
    if (dict.hasOwnProperty(key2)){
      return true
    }
  }
  return false
}

function _hget(key1,key2){
  return _get(key1)[key2]
}

function _hset(key1,key2,key2_val){
  if (_has_key(key1)){
    let dict = _get(key1)
    dict[key2] = key2_val
    _set(key1,dict)
  }
  else{
    let dict = {}
    dict[key2]= key2_val
    _set(key1,dict)
  }
}

function _get(key)
{
  return wx.getStorageSync(key.toString());
  //return dict[key]
}

function _has_key(key)
{
  var r = wx.getStorageSync(key.toString());
  return r == '' ? false : true
  //return dict.hasOwnProperty(key)==true ? true:false
}

function _get_panel_from_localstorage(init_panel){
  let _panel 
  if (_has_key("panel")){
    _panel = _get("panel")
  }
  else{
    _panel = init_panel
  }
  return _panel
}


module.exports = {
  add_answered:add_answered,
  get_wrong_idxs:get_wrong_idxs,
  get_star_idxs:get_star_idxs,
  is_stared:is_stared,
  add_stared:add_stared,
  remove_stared:remove_stared,
  is_wronged:is_wronged,
  add_wronged:add_wronged,
  remove_wronged:remove_wronged,
  get_panel_from_localstoage:_get_panel_from_localstorage,
  _set:_set,
  _get:_get,
  _hset:_hset,
  is_practiced:is_practiced,
  add_practiced:add_practiced,
  is_examed:is_examed,
  add_examed:add_examed,
  re_exam:re_exam,
  get_selected_idxs:get_selected_idxs,
  process_multiple_selected_logic:process_multiple_selected_logic,
  process_single_selected_logic:process_single_selected_logic,
}


