const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function deepCopy(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone
} 



/*
invoke:highlight_answer(["abcdefgh","2,4;5,6"])
output:["ab<span class='red'>cd</span>e<span class='red'>f<…", "2,4;5,6"]
*/
function highlight_answer(answer){
    let [elem,ret] = answer
    console.log(elem,ret)
    if (ret.length != 0)
    {
        list = []
        hightlight_start_idxs = []
        if (ret.includes(";"))
        {
            let arr = ret.split(";")
            arr.forEach(element => {
                _do(element);
            });
        }
        else
        {
           _do(ret)          
        }
        if (list[0] != 0)
        {
            list.unshift(0)
        }
        if (list[list.length - 1] != elem.length)
        {
            list.push(elem.length)
        }
        console.log(list)
        console.log(hightlight_start_idxs)
        //基于以上两个变量，进行标红
        var tokens = []
        list.reduce(_is_highlight)
        console.log("tokens:",tokens)
        answer[0] = tokens.join("")
    }
    console.log(answer)
    return answer


    function _is_highlight(start_idx,end_idx,current_idx,array)
    {
        let token = elem.slice(start_idx,end_idx)
        console.log("----",token)
        if (hightlight_start_idxs.includes(start_idx))
        {
            token = `<span class='red'>${token}</span>`
        }
        tokens.push(token)

        console.log(start_idx,end_idx)
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
function add_answers_char(answers)
{
    for(let i = 0; i < answers.length; ++i)
    {
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
function hightlight_answers(answers)
{
    for(let i = 0; i < answers.length; ++i)
    {
      answers[i] = highlight_answer(answers[i])
      console.log("dd==",answers[i])
    }
    return answers
}

module.exports = {
  formatTime: formatTime,
  deepCopy:deepCopy
}
