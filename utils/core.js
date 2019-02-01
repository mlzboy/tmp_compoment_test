var store = require("./store.js")

function deepCopy(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone
} 

/*
invoke:highlight_answer(["abcdefgh","2,4;5,6"])
output:["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"]
*/
function highlight_answer(answer) {
  let [elem, ret] = answer
  //console.log(elem, ret)
  if (ret.length != 0) {
    var list = []
    var hightlight_start_idxs = []
    if (ret.includes(";")) {
      let arr = ret.split(";")
      arr.forEach(element => {
        _do(element);
      });
    }
    else {
      _do(ret)
    }
    if (list[0] != 0) {
      list.unshift(0)
    }
    if (list[list.length - 1] != elem.length) {
      list.push(elem.length)
    }
    /*
    console.log(list)
    console.log(hightlight_start_idxs)
    */
    //基于以上两个变量，进行标红
    var tokens = []
    list.reduce(_is_highlight)
    //console.log("tokens:", tokens)
    answer[0] = tokens.join("")
  }
  //console.log(answer)
  return answer


  function _is_highlight(start_idx, end_idx, current_idx, array) {
    let token = elem.slice(start_idx, end_idx)
    //console.log("----", token)
    if (hightlight_start_idxs.includes(start_idx)) {
      token = `<span class='red'>${token}</span>`
    }
    tokens.push(token)

    //console.log(start_idx, end_idx)
    return end_idx;
  }

  function _do(element) {
    let [start_idx, end_idx] = element.split(",");
    start_idx = parseInt(start_idx);
    hightlight_start_idxs.push(start_idx);
    end_idx = parseInt(end_idx);
    list.push(start_idx);
    list.push(end_idx);
  }
}

/*
invoke:add_answers_char([["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"]])
output:[["abcdefgh", "2,4;5,6", "A"],
["abcdefgh", "2,4;5,6", "B"],
["abcdefgh", "2,4;5,6", "C"]]
*/
function add_answers_char(answers) {
  for (let i = 0; i < answers.length; ++i) {
    answers[i].push(String.fromCharCode(i + 65))
    //console.log(answers[i])
  }
  //console.log(answers)
  return answers;
}

/*
invoke:hightlight_answers([["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"]])
output:[["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"]]
*/
function hightlight_answers(answers) {
  for (let i = 0; i < answers.length; ++i) {
    answers[i] = highlight_answer(answers[i])
    //console.log("dd==", answers[i])
  }
  return answers
}

/*
invoke:hightlight_answers([["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"],["abcdefgh","2,4;5,6"]])
output:[["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"],
["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"]]
*/
function highlight_answers(answers) {
  for (let i = 0; i < answers.length; ++i) {
    answers[i] = highlight_answer(answers[i])
    //console.log("dd==", answers[i])
  }
  return answers
}
/*

[
        9091,
        [
          ["abcdefgh","2,4;5,6","A","正文颜色","选项A颜色","行背景色"],
          ["bbbbbbbbbb", "2,4;5,8"],
          ["cccccccccc", ""],
          ["ddddddddddd", ""],
        ],
        "大学生品德评价指标体系一般包括（    ）。",
        "BC",
        "M",
        "大学心理学",
        "memory tips",
        "green",//确定按钮颜色 
        false,//是否显示确认按钮
        false//是否已答题
      ]
fulldata为初始完成一道题的数据，fulldata[1]中每一个answer最初只包含[question,"2,3;4,5"]两项
当用记有点击等行为是，调用此函数，将返回值使用this.setData({})进行更新即可
*/

function parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit(fulldata, mode, selected_idxs)
{
  let { _fulldata, answers, right_answers } = _prepare_data(fulldata, selected_idxs, mode);//只有通过practiceu状态确定按钮提交,或是exam状态整体提交才变为true,表示该题已做
  /*
  if (((mode == "practice") && (_fulldata[4] == "M")) || (mode == "exam_show"))//立马出结果
  {
  */
    if (mode == "practiced")
    {
      store.add_practiced(_fulldata[0])
      _fulldata[9] = true;//practiced
    }
    //console.log("zzzzzzzzzzzzzzzzzzzzzz")
    _gave_answer_and_remaker_wrong_answer(answers, right_answers, selected_idxs);
    return _fulldata
    //console.log(answers)
  /*
  }
  */
}


function _gave_answer_and_remaker_wrong_answer(answers, right_answers, selected_idxs) {
  for (let i = 0; i < answers.length; ++i) {
    if (right_answers.includes(answers[i][2])) {
      answers[i].push(" green2"); //正文颜色 
      answers[i].push("green"); //选项A颜色
    }
    else {
      answers[i].push(""); //正文颜色
      answers[i].push(" white"); //选项A颜色
    }
    answers[i].push(""); //整行背景色
    //console.log(answers[i])
  }
  for (let i of selected_idxs) {
    if (right_answers.includes(answers[i][2])) {
      answers[i][2] = "√";
    }
    else {
      answers[i][2] = "×";
      answers[i][3] = " orange2"; //正文
      answers[i][4] = " orange"; //选项A
    }
    //if (_fulldata[4] == "M") {
    answers[i][5] = " grayb";
    //}
  }
}

function data_state_change(fulldata, mode, selected_idxs) {
  let { _fulldata, answers, right_answers } = _prepare_data(fulldata, selected_idxs, mode);//只有通过practiceu状态确定按钮提交,或是exam状态整体提交才变为true,表示该题已做
  
  //用记勾选了选项，变更其颜色状态，此项只会在多选题调用
  if (((mode == "exam") || (mode == "practice")) && (selected_idxs.length > 0) && (_fulldata[4] == 'M')) {
    _gave_selected_options_gray_backgroud(answers, selected_idxs);
    return _fulldata
  }


  if ((selected_idxs.length == 0) && ((mode == "practice") || (mode == "exam"))) {
    for (let i = 0; i < answers.length; ++i) {
      answers[i].push("")//正文颜色
      answers[i].push(" white")//选项A颜色
      answers[i].push("")//整行背景色
      //console.log(answers[i])
    }
    _fulldata[1] = answers
    return _fulldata
  }

  if ((selected_idxs.length == 1) && (mode == "practice") && (_fulldata[4] != "M"))
  {
    _gave_answer_and_remaker_wrong_answer(answers, right_answers, selected_idxs);
    return _fulldata
  }

  if ((selected_idxs.length == 1) && (mode == "exam") && (_fulldata[4] !="M"))
  {
    _gave_selected_options_gray_backgroud(answers, selected_idxs);
    return _fulldata
  }

  else if (mode == "memory_normal") {
    for (let i = 0; i < answers.length; ++i) {
      if (right_answers.includes(answers[i][2])) {
        answers[i].push(" green2")//正文颜色 
        answers[i].push("green")//选项A颜色
      }
      else {
        answers[i].push("")//正文颜色
        answers[i].push(" white")//选项A颜色
      }
      answers[i].push("")//整行背景色
      //console.log(answers[i])
    }
  }
  else if (mode == "memory_vip") {
    if (_fulldata[4] == "M") {
      //如果答案有4项，正确有3项，则标红错误项，
      //如果答案全部正确，则全部标绿
      //如果有二个正确选项，则标记正确项
      answers = highlight_answers(answers)
      if (answers.length == right_answers.length) {
        for (let i = 0; i < answers.length; ++i) {
          answers[i].push("")//正文颜色 
          answers[i].push("green")//选项A颜色       
          answers[i].push("")//整行背景色
        }
      }
      else if (answers.length == (right_answers.length + 1)) {
        for (let i = 0; i < answers.length; ++i) {
          if (!right_answers.includes(answers[i][2])) {
            answers[i].push("")//正文颜色 
            answers[i].push(" orange")//选项A颜色
          }
          else {
            answers[i].push("")//正文颜色 
            answers[i].push("green")//选项A颜色                        
          }
          answers[i].push("")//整行背景色
        }
      }
      else {
        for (let i = 0; i < answers.length; ++i) {
          if (right_answers.includes(answers[i][2])) {
            answers[i].push("")//正文颜色 
            answers[i].push("green")//选项A颜色
          }
          else {
            answers[i].push("")//正文颜色
            answers[i].push(" white")//选项A颜色
          }
          answers[i].push("")//整行背景色
        }
      }


    }
    else {
      for (let i = 0; i < answers.length; ++i) {
        if (right_answers.includes(answers[i][2])) {
          answers[i].push(" green2")//正文颜色 
          answers[i].push("green")//选项A颜色
        }
        else {
          answers[i].push("")//正文颜色
          answers[i].push(" white")//选项A颜色
        }
        answers[i].push("")//整行背景色
      }
    }

  }

  _fulldata[1] = answers
 // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  //for (let i = 0; i < answers.length; ++i) {
    //console.log(answers[i])

  //}


  return _fulldata
}

module.exports = {
  highlight_answer: highlight_answer,
  highlight_answers: hightlight_answers,
  add_answer_char:add_answers_char,
  data_state_change:data_state_change,
  parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit:parctice_tap_confirm_or_exam_show_mode_or_exam_full_submit
}

function _gave_selected_options_gray_backgroud(answers, selected_idxs) {
  for (let i = 0; i < answers.length; ++i) {
    answers[i].push(""); //正文颜色
    if (selected_idxs.includes(i)) {
      answers[i].push(" grayd"); //选项A颜色
      answers[i].push(" grayb"); //整行背景色
    }
    else {
      answers[i].push(" white"); //选项A颜色
      answers[i].push(""); //整行背景色
    }
    //console.log(answers[i]);
  }
}

function _prepare_data(fulldata, selected_idxs, mode) {
  let _fulldata = deepCopy(fulldata);
  let answers = _fulldata[1];
  answers = add_answers_char(answers); //每一个answer现在有三项[question,hightlight_idxs,'A']
  let right_answers = _fulldata[3];
  //判断多选的确定按钮为灰色还是绿色
  if (selected_idxs.length > 1) {
    _fulldata.push(" green");
  }
  else {
    _fulldata.push(" grayc");
  }
  //用于确定是否显示`确认`按钮
  if ((mode == "practice") && (_fulldata[4] == 'M')) {
    _fulldata.push(true);
  }
  else {
    _fulldata.push(false);
  }
  _fulldata.push(false); //只有通过practice状态确定按钮提交,或是exam状态整体提交才变为true,表示该题已做
  return { _fulldata, answers, right_answers };
}
