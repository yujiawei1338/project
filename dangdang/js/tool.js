/**
 * 封装js操作cookie 的党方法 
 * 
 */

// 封装设置cookie的方法
/**
 * @description: 设置cookie
 * @param {name}  cookie的名字
 * @param {value} cookie的值
 * @param {expires} cookie的有效时间
 * @return {string} 设置cookie成功
 */
 function setCookie(name,value,expires){
  let time = new Date();  
  time.setTime(time.getTime()-8*60*60*1000 + expires*1000)
  document.cookie = `${name}=${value};expires=${time}`
}

// 封装读取cookie的方法
/**
 * @description: 读取cookie的方法
 * @param {key} 读取的cookie的名字
 * @return {string}  返回对应key的cookie值
 */
function getCookie(key){
  // console.log(document.cookie) 
  // age=18; hobby=code; like=ctrl; love=life
  // 将字符串转为数组，通过炸裂的方式
  let arr =  document.cookie.split(";")
  // console.log(document.cookie.split(";"));
  // ["age=18", " hobby=code", " like=ctrl", " love=life"]
  // 通过循环遍历每一个元素，然后进行比较
  var str = "";
  for(let i = 0;i<arr.length;i++){
      // console.log(arr[i].indexOf(key))
      if(arr[i].indexOf(key) != -1){
        str = arr[i];
      }
  }
  // 如果str还是空字符串，这在cookie对应的key找不到
  if(!str){
    return '';
  }
  // 通过炸裂的方式, = 则后一部分就是我们要获取的值
  // console.log(str.split("="));
  return str.split("=")[1];
}

// 封装删除cookie
/**
 * @description: 删除cookie中key的值
 * @param {*} key 需要删除的键名
 * @return {*}
 */
function delCookie(key){
  // 调用设置cookie将 对应的cookie设置失效
  setCookie(key,1,-1);
}


















/**
 * @description: ajax 函数 
 * @param {}  options 
 *  {url,type,data,async,dataType,function(){}}
 * @return {*}
 */
 function ajax(options){
  // 判断url
  if(!options.url){
    // url必须传入
    // 手动抛出错误
    throw new Error("url必须传入");
  }
  // 定义一默认值
  const defInfo = {
    data:{},
    type:'get',
    async:true,
    dataType:'string',
    success:function(res){}
  }

  // 通过循环将传入的option替换到defIno中的值
  for(var key in options){
    defInfo[key] = options[key];
  }
  // 将data对象转换
  var str = '';
  if(defInfo.data){
    // 将defInfo.data循环遍历 拼接到str
    for(var key in defInfo.data){
      str += `${key}=${defInfo.data[key]}&`;      
    }
    str = str.slice(0,-1);
  }

  // 创建ajax对象
  let xhr = new XMLHttpRequest();
  // 此处只考虑 post 和get请求
  if(defInfo.type.toUpperCase() === "GET"){
    defInfo.url += "?"+str;
    xhr.open("get",defInfo.url,defInfo.async);
    xhr.send();
  }else{
    xhr.open("post",defInfo.url,defInfo.async);
    // 设置请求头
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(str);
  }

  // 接收响应
  xhr.onreadystatechange = function(){
    // 判断http和ajax状态码
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
      // 判断dataType
      var res = xhr.responseText;
      if(defInfo.dataType.toUpperCase() === "JSON"){
        res = JSON.parse(res);
      }
      // 调用成功函数，将结果传回
      defInfo.success(res);
    }
  }



}

// promise封装ajax
function pAjax(options){
  var p = new Promise(function(reslove,reject){
    ajax({
      url:options.url,
      type:options.type || "GET",
      data:options.data || {},
      async:options.async || true,
      dataType:options.dataType || "json",
      success:function(res){
        reslove(res)
      }
    })
  })
  // 将promise对象返回
  return p;
}

// 封装通过id获取标签的方法
// function $(id){
//   return document.getElementById(id);
// }