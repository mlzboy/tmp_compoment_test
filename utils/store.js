var is_practiced = id => _is_Xed("practiced",id)
var add_practiced = id => _add_Xed("practiced",id)
//var is_examed = id => _is_Xed("examed",id)
//var add_examed = id => _add_Xed("examed",id)

function is_examed(course,exam_no){
  let ret = []
  if (_has_key("examed")){
    ret = _get("examed")
  }
  if (ret.includes(course+"_"+exam_no)){
    return true;
  }
  return false;
}

function add_examed(course,exam_no)
{
  let key = course+"_"+exam_no
  let ret = []
  if (_has_key("examed")){
    ret = _get("examed") 
  }
  if (ret.includes(key) == false)
  {
    ret.push(key)
    _set("examed", ret)
    return 1;
  }
  return 0;
}
/*
删除examed key中对应的考试的值，
同时删除以exam_course_exam_no命名的上次考试选择的键
 */
function re_exam(course,exam_no)
{
  let ret = []
  if (_has_key("examed")) {
    ret = _get("examed")
    let idx = ret.indexOf(course+"_"+exam_no)
    if (idx > -1) {
      //删除list中存在的idx
      ret.splice(idx, 1)
      _set("examed", ret)
    }
  }

  let key = "exam" + "_" + course + "_" + exam_no
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

function sget2(mode,course,exam_no,id){
  let key = mode + "_" + course + "_" + exam_no
  let dict = {}
  if (_has_key(key)){
    dict = _get(key)
    console.log("uuuuuuuuuuu",dict)
    if (dict.hasOwnProperty(id)){
      console.log("dict[id]=",dict[id])
      return dict[id]
    }
  }
  return []
}
function sset2(mode,course,exam_no,id,idx){
  let key = mode + "_" + course + "_" + exam_no
  let dict = {}
  if (_has_key(key)){
    dict = _get(key)
  }
  dict[id] = [idx] //考虑了和多选一样的list结构
  _set(key,dict)
}

/*
存在，则删除，
不存在则添加，同时加原先的所有去除
针对单选
*/
function sset(key_prefix,id,idx)
{
  //判断localstorage是否有id的key,有的话取其值
  if (_has_key(key_prefix+id))
  {
    let list = _get(key_prefix+id)
    let ret = list.indexOf(idx)
    if (ret > -1)
    {
      let list = []
      _set(key_prefix+id, list)
      return list
    }
  }
  let list = [idx]
  _set(key_prefix+id, list)
  return list
}

function mset2(mode,course,exam_no,id,idx)
{
  let key = mode + "_" + course + "_" + exam_no
  let dict = {}
  if (_has_key(key)){
    dict = _get(key)
  }
  let list = []
  if (dict.hasOwnProperty(id)){
    list = dict[id]
    let ret = list.indexOf(idx)
    if (ret > -1)
    {
      //删除list中存在的idx
      list.splice(ret,1)
    }
    else
    {
      list.push(idx)
    }
  }
  else{
    list.push(idx)
  }
  dict[id] = list
  _set(key,dict)
  return list

}

/*
反向操作，存在则删除，不存在则添加
针对多选，建议改名为mset
*/
function mset(key_prefix,id,idx)
{
  var list = [];
  //判断localstorage是否有id的key,有的话取其值
  if (_has_key(key_prefix+id))
  {
    list = _get(key_prefix+id)
    let ret = list.indexOf(idx)
    if (ret > -1)
    {
      //删除list中存在的idx
      list.splice(ret,1)
    }
    else
    {
      list.push(idx)
    }
  }
  else
  {
    list.push(idx)
  }
  _set(key_prefix+id, list)
  return list
}




function _set(key,value)
{
  wx.setStorageSync(key.toString(), value)
  //dict[key]= value
}



/*
以后改为get
*/
function sget(key,id)
{
  return _get(key+id)
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
  get_panel_from_localstoage:_get_panel_from_localstorage,
  _set:_set,
  sset2:sset2,
  sset:sset,
  mset2:mset2,
  mset:mset,
  sget: sget,//以后改为get
  get:_get,
  is_practiced:is_practiced,
  add_practiced:add_practiced,
  is_examed:is_examed,
  add_examed:add_examed,
  re_exam:re_exam,
  sget2:sget2,
  mget2:sget2

}
/*
console.log(set(1,1))
console.log(set(1,2))

console.log(set(1,1))
*/

