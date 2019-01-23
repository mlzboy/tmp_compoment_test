/*
invoke:highlight_answer(["abcdefgh","2,4;5,6"])
output:["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"]
*/
function highlight_answer(answer) {
  let [elem, ret] = answer
  console.log(elem, ret)
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
    console.log(list)
    console.log(hightlight_start_idxs)
    //基于以上两个变量，进行标红
    var tokens = []
    list.reduce(_is_highlight)
    console.log("tokens:", tokens)
    answer[0] = tokens.join("")
  }
  console.log(answer)
  return answer


  function _is_highlight(start_idx, end_idx, current_idx, array) {
    let token = elem.slice(start_idx, end_idx)
    console.log("----", token)
    if (hightlight_start_idxs.includes(start_idx)) {
      token = `<span class='red'>${token}</span>`
    }
    tokens.push(token)

    console.log(start_idx, end_idx)
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
    console.log(answers[i])
  }
  console.log(answers)
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
    console.log("dd==", answers[i])
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
    console.log("dd==", answers[i])
  }
  return answers
}
/*
["abcdefgh","2,4;5,6","A","正文颜色","选项A颜色"]
fulldata为初始完成一道题的数据，fulldata[1]中每一个answer只包含[question,"2,3;4,5"]两项
当用记有点击等行为是，调用此函数，将返回值使用this.setData({})进行更新即可
*/
function data_state_change(fulldata, mode, selected_idxs) {
  let answers = fulldata[1]
  answers = add_answers_char(answers)
  let right_answers = fulldata[3]
  if (mode == "practice")//立马出结果
  {
    for (let i = 0; i < answers.length; ++i) {


      if (right_answers.includes(answers[i][2])) {
        answers[i].push(" green2")//正文颜色 
        answers[i].push("green")//选项A颜色
      }
      else {
        answers[i].push("")//正文颜色
        answers[i].push(" white")//选项A颜色
      }
      console.log(answers[i])
    }

    for (let i of selected_idxs) {
      if (right_answers.includes(answers[i][2])) {
        answers[i][2] = "right"
      }
      else {
        answers[i][2] = "wrong"
        answers[i][3] = " orange2"//正文
        answers[i][4] = " orange"//选项A
      }
    }
    console.log(answers)

  }
  else if (mode == "exam")//最后汇总出结果
  {
    for (let i = 0; i < answers.length; ++i) {
      if (selected_idxs.includes(i)) {
        answers[i].push(" green2")//正文颜色 
        answers[i].push("green")//选项A颜色
      }
      else {
        answers[i].push("")//正文颜色
        answers[i].push(" white")//选项A颜色
      }
      console.log(answers[i])
    }
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
      console.log(answers[i])
    }
  }
  else if (mode == "memory_vip") {
    answers = highlight_answers(answers)
    for (let i = 0; i < answers.length; ++i) {
      if (right_answers.includes(answers[i][2])) {
        answers[i].push(" green2")//正文颜色 
        answers[i].push("green")//选项A颜色
      }
      else {
        answers[i].push("")//正文颜色
        answers[i].push(" white")//选项A颜色
      }
      console.log(answers[i])
    }
  }

  fulldata[1] = answers
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  for (let i = 0; i < answers.length; ++i) {
    console.log(answers[i])

  }


  return fulldata
}


module.exports = {
  highlight_answer: highlight_answer,
  highlight_answers: hightlight_answers,
  add_answer_char:add_answers_char,
  data_state_change:data_state_change
}