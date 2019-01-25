//var dict={}
function is_practiced(id)
{
  let list = []
  if (_has_key("practiced")) {
    list = _get("practiced")
    let ret = list.indexOf(id)  
    return (ret > -1) ? true : false
  }
  return false;
}

function add_practiced(id)
{
  let list = []
  if (_has_key("practiced"))
  {
    list = _get("practiced")
    let ret = list.indexOf(id)
    if (ret > -1) {
      return false
    }
  }
  list.push(id)
  _set("practiced",list)
  return true
}

function set(id,idx)
{
  var list = [];
  //判断localstorage是否有id的key,有的话取其值
  if (_has_key(id))
  {
    list = _get(id)
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
  _set(id, list)
  return list
}


function _set(key,value)
{
  wx.setStorageSync(key.toString(), value)
  //dict[key]= value
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



module.exports = {
  set: set,
  get: _get,
  is_practiced:is_practiced,
  add_practiced:add_practiced
}
/*
console.log(set(1,1))
console.log(set(1,2))

console.log(set(1,1))
*/

