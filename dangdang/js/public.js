function rand(min, max) {
   var result = min + parseInt(Math.random() * (max - min + 1));
   return result;
}


function getColor(){
   var str = "#"
   for(var i=0;i<6;i++){
         str = str + rand(0,15).toString(16);
   }
   return str;
}

// 封装一个方法，用于获取指定元素的指定属性
function getStyle(dom,attr){
   if(window.getComputedStyle){
         return window.getComputedStyle(dom,null)[attr]
   }else{
         return dom.currentStyle[attr]
   }
}
// move函数可以实现把执行的dom节点的attr属性缓动到具体的target值
function move(dom,attr,target,fn){
// dom:表示运动的元素节点
// attr:表示要缓动的属性
// target:表示该属性要到达的目标值，如果属性是透明度，target要*100
// fn:是一个可选参数，必须是函数，这个函数会在定时器清除以后调用
// 如何实参是一个函数，那么我们叫这个函数是move函数的回调函数

// function fn(){
//     console.log(attr+"运动完成了");
// }
// 要用定时器，先清定时器
clearInterval(dom.timer);
// 定义定时器
dom.timer = setInterval(function(){
      // 1 获取元素当前位置
      if(attr=='opacity'){
            // opacity:0.1;
            var current = getStyle(dom,attr)*100;
      }else{
            // width:200px; z-index:10
            var current = parseInt(getStyle(dom,attr))
      }
      // 2 计算速度
      var speed = (target - current)/10;
      speed = speed>0?Math.ceil(speed):Math.floor(speed);
      // 3 计算下一个位置
      var next = current + speed
      // 4 定位元素
      if(attr=="zIndex"){
            // 无需缓动
            dom.style.zIndex = target;
      }else if(attr=="opacity"){
            // 标准浏览器
            dom.style.opacity = next/100;
            // IE低版本
            dom.style.filter = "alpha(opacity="+next+")";
      }else{
            dom.style[attr] = next+"px";
      }
      // 清除定时器
      if(next==target){
            clearInterval(dom.timer);
            if(fn){
            fn()
            }
      }
},20)
}

// 多属性缓动函数封装
function animate(dom,target,fn,interval){
      // dom:要运动的元素节点
      // target:运动目标的集合对象,如: {
      //     width:400,
      //     left:600,
      //     opacity:100,
      //     zIndex:999
      // }
      // fn:回调函数，可选参数
      // interval:定时器的间隔时间，可选参数，默认20ms
interval = interval||20;
// 一个元素节点上同时只能有一个定时
clearInterval(dom.timer);
dom.timer = setInterval(function(){
      // 每次运动开始都假设本次全部会到达目标
      var flag = true;
      // 每个属性都要运动一段距离
      for(var attr in target){
            // 第一：获取当前位置
            if(attr == "opacity"){
            var current = parseInt(getStyle(dom,attr)*100)
            }else{
            var current = parseInt(getStyle(dom,attr))
            }
            // 第二：计算速度
            var speed = (target[attr] - current)/10;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            // 第三：计算下一个位置
            var next = current + speed;
            // 第四：定位元素
            if(attr=='opacity'){
            dom.style.opacity = next/100;
            dom.style.filter = "alpha(opacity="+next+")"
            }else if(attr=='zIndex'){
            dom.style.zIndex = target.zIndex;
            next = target.zIndex;
            }else{
            dom.style[attr] = next+"px";
            }
            // 是否到达目标
            if(next!=target[attr]){
            flag = false;
            }
      }


      // 所有属性本此运动完毕，判断是否都到达了
      if(flag){
            clearInterval(dom.timer);
            if(fn){
            fn()
            }
            // fn&&fn();
      }

},interval)
}