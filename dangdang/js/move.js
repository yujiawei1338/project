/**
 * move 用于多属性缓动
 * @param {element} E 要缓动节点
 * @param {object} obj 要缓动的样式的集合，对象格式
 * @param {function} cb 回调函数，动画完成后执行的函数
 */
function move(E,obj,cb){
    for(let i in obj){
        let objTimer=obj[i];
        objTimer=setInterval(function(){
            let curStyle;
            if(i=='opacity'){
                curStyle=parseInt(getStyle(E,i)*100);
            }else{
                curStyle=parseInt(getStyle(E,i));
            }


            let speed=(obj[i]-curStyle)/5;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            speed=Math.ceil(speed);
            if(curStyle==obj[i]){
                clearInterval(objTimer);
                if(cb){
                    cb();
                }
                delete obj[i];
                if(count(obj)==0){
                    console.log('动画全部执行完毕');
                }
            }else{
                if(i=='opacity'){
                    E.style[i]=(curStyle+speed)/100;
                }else{
                    E.style[i]=curStyle+speed+'px';
                } 
            }
        },30);
    }
}


//统计定时器的个数
function count(obj){
    let n=0;
    for(let dir in obj){
        n++;
    }
    return n;
}



/**
 * getStyle 用于获取非行内样式
 * @param {Element} E 要缓动的样式的集合，对象格式
 * @param {attribute} dir 是个属性
 */

//非行内样式获取元素的偏移量
function getStyle(E,dir){
    if(window.getComputedStyle){
        return window.getComputedStyle(E)[dir];
    }else{
        return E.currentStyle[dir];
    }
}


    // 1.获取元素
    const bannerBox=document.querySelector('.banner');
    const imgBox=document.querySelector('#UL');//document=>bannerBox
    const pointBox=document.querySelector('ol');
    const goBackTabs=document.querySelector('#zuoyou');
    const AA=document.querySelectorAll('#zuoyou>a')
    //获取可视窗口宽度
    const bannerWidth=bannerBox.clientWidth;//offsetWidth(包含边框)
  
    //防止点击左右太快卡住
    let flag =true; 
    //设置初始值  代表的是第几张图
    let index=1;
    let time;
    
    bannerBox.onmouseover=function(){
        for(var i=0;i<AA.length;i++){
            AA[i].style.display='block';
        }    
    }
    bannerBox.onmouseout=function(){
        for(var i=0;i<AA.length;i++){
            AA[i].style.display='none';
        }    
    }

    // 2.设置焦点
    setPoint();
    function setPoint(){
        let pointNum=imgBox.children.length;
        for(let i=0;i<pointNum;i++){  
            let li=document.createElement('li');//创建节点
            pointBox.appendChild(li);//向ol末尾追加节点
            //默认原点被选中样式
            if(i==0){
                li.className='active';
            }
            li.setAttribute('point-index',i+1)
        }
        pointBox.style.width=pointNum*20+'px';
    }
    //3.复制元素 给ul中的li前后各添加一个
    copyE();
    function copyE(){
        //cloneNode() 复制节点 
        let firstE=imgBox.children[0].cloneNode(true);
        let lastE=imgBox.children[imgBox.children.length-1].cloneNode(true);
        
        imgBox.appendChild(firstE);
        imgBox.insertBefore(lastE,imgBox.children[0]);
        //重写ul宽度 默认显示为第一张红色
        imgBox.style.width=imgBox.children.length*bannerWidth+'px';
        imgBox.style.left=-index*bannerWidth+'px';
    }
    //4.自动轮播
    autoPlay();
    function autoPlay(){
        clearInterval(time)
        time=setInterval(function(){
            index++;
            move(imgBox,{left:-index*bannerWidth},moveEnd);
        },2000)
    }
    // 5.移入移除
    overOut();
    function overOut(){
        bannerBox.addEventListener('mousemove',function(){
            clearInterval(time);
        });
        bannerBox.addEventListener('mouseout',function(){
            autoPlay();
        });
    }
    //6.绑定一个事件做边界判断
    function moveEnd(){
        if(index==imgBox.children.length-1){
            index=1;
            imgBox.style.left=-index*bannerWidth+'px';
        }
        if(index==0){
            index=imgBox.children.length-2;
            imgBox.style.left=-index*bannerWidth+'px';
        }
        // 添加类名---tab切换 
        for(let i=0;i<pointBox.children.length;i++){
            pointBox.children[i].className='';
        }
        pointBox.children[index-1].className='active';
        flag = true;
    }
    // 7.点击左右切换
    goBackEvent();
    function goBackEvent(){
        goBackTabs.addEventListener('click',function(e){
            e=e||window.event;
            if(flag==false){
                return;
            }
            flag=false;
            if(e.target.className=='left'){
                index--;
                move(imgBox,{left:-index*bannerWidth},moveEnd);
            }
            if(e.target.className=='right'){
                index++;
                move(imgBox,{left:-index*bannerWidth},moveEnd);
            }
        });
    }
    //焦点
    pointEvent();
    function pointEvent(){
        pointBox.addEventListener('click',function(e){
            e=e||window.event;
            if(flag==false){
                return;
            }
            flag=false;
            if(e.target.nodeName=='LI'){//指向的节点名为li标签
                index=e.target.getAttribute('point-index');
                console.log(index);
                move(imgBox,{left:-index*bannerWidth},moveEnd);
            }
        });
    }

    document.onvisibilitychange = function () { 
        if(document.visibilityState =='hidden'){
            clearInterval(time)
        }else{
            autoPlay()
        }
    }