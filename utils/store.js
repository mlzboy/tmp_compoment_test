var is_practiced = id => _is_Xed("practiced",id)
var add_practiced = id => _add_Xed("practiced",id)
var is_examed = id => _is_Xed("examed",id)
var add_examed = id => _add_Xed("examed",id)

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



module.exports = {
  sset:sset,
  mset:mset,
  sget: sget,//以后改为get
  get:_get,
  is_practiced:is_practiced,
  add_practiced:add_practiced,
  is_examed:is_examed,
  add_examed:add_examed

}
/*
console.log(set(1,1))
console.log(set(1,2))

console.log(set(1,1))
*/

