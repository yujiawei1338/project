$('.goShop').click(function () {
    window.location.href = "shopCar.html";
})

// 根据url获取数据id的值  
var urlParams = location.search.match(/id=(\d+)/);
// console.log(urlParams)
if (!urlParams) {
    var paramindex = layer.msg('非法访问！', {
        icon: 2,
    })
    setTimeout(() => {
        layer.close(paramindex)
        location.href = './list.html';
        return false;
    }, 800)
}
// 拿到商品id
var id = urlParams[1];
var loadindex = layer.load(1, {
    shade: [0.5, '#333']
})

async function temp() {
    // 查询详情数据
    var res = await $.ajax({
        url: './php/detail.php',
        data: { id },
        dataType: 'json'
    })
    var { data } = res;
    console.log(data);
    $('.right>h5').text(data.introduce)
    $('.right>h4').text(data.name)
    $('.price_666').text(data.price)
    // 将商品的库存数量,通过属性添加到 标签中
    $('.number').attr('data-stock', data.stock)
    var imgs = data.imgpath.split('==========')
    for (var i = 0; i < imgs.length; i++) {
        $('.left_small').append($(`<li><img src="${imgs[i]}"></li>`))
    }
    $('.middle>img').attr('src', imgs[0])
    $('.big>img').attr('src', imgs[0])
    enlarge()
    layer.close(loadindex)
}
temp()

// 数量 加和减
$('.add').click(function () {
    var num = $(this).prev().val() - 0;
    $(this).next().prop('disabled', false)
    num++;
    if (num >= $(this).parent().attr('data-stock')) {
        num = $(this).parent().attr('data-stock')
        $(this).prop('disabled', true)
    }
    $(this).prev().val(num)
})
$('.reduce').click(function () {
    var num = $(this).prev().prev().val() - 0;
    $(this).prev().prop('disabled', false)
    num--;
    if (num <= 1) {
        num = 1
        $(this).prop('disabled', true)
    }
    $(this).prev().prev().val(num)
})

// 加入购物车
$('.addShop').click(function () {
    // // 判断是否登录
    var username = getCookie('username')
    if (!username) {
        var tipindex = layer.msg('请先登录！')
        setTimeout(function () {
            layer.close(tipindex)
            localStorage.setItem('url', location.href)
            location.href = 'login.html';
        }, 2000)
        return false;
    }
    // 判断本地存储中是否有数据
    var data = localStorage.getItem('data');
    if (data) {
        data = JSON.parse(data);
        
        var obj = data.filter(v => v.username === username && v.goodsid === id)
        if (obj.length) {
           
            obj[0].number = obj[0].number + ($('.add').prev().val() - 0)
        } else {
            
            data.push({
                username,
                goodsid: id,
                number: $('.add').prev().val() - 0
            })
        }
        localStorage.setItem('data', JSON.stringify(data))

    } else {
        // 没有数据，就将当前这一条数据存储起来
        localStorage.setItem('data', JSON.stringify([
            {
                username,
                goodsid: id,
                number: $('.add').prev().val() - 0
            }
        ]));
       
    } 
    layer.msg('加入购物车成功', {
        icon: 1,
        time: 1000
    })
    var num = localStorage.getItem('data');
    var huan = JSON.parse(num);
    var len = huan.length;
    $('.jian').html(len);
})



//下拉列表
$('#down_01').mouseenter(function(){
    console.log($(this));
    $(this).find('.list_001').stop().slideDown(300)
})
$('#down_01').mouseleave(function(){
    $(this).find('.list_001').stop().slideUp(300)
})


$('#down_02').mouseenter(function(){
    console.log($(this));
    $(this).find('.list_002').stop().slideDown(300)
})
$('#down_02').mouseleave(function(){
    $(this).find('.list_002').stop().slideUp(300)
})


$('#down_03').mouseenter(function(){
    console.log($(this));
    $(this).find('.list_003').stop().slideDown(300)
})
$('#down_03').mouseleave(function(){
    $(this).find('.list_003').stop().slideUp(300)
})


//放大镜

function enlarge(){
    $('.middle').hover(function(){
        $('.mask').css('display','block')
        $('.big').css('display','block')
        $('.middle').on('mousemove',function(e){
            var x = e.pageX;
            var y = e.pageY;
            var l = x - $('.middle').offset().left - $('.mask').width()/2
            var t = y - $('.middle').offset().top - $('.mask').height()/2
            if(l<=0){
                l=0
            }
            if(t<=0){
                t=0
            }
            if(l>=$('.middle').width()-$('.mask').width()){
                l = $('.middle').width()-$('.mask').width()
            }
            if(t>=$('.middle').height()-$('.mask').height()){ 
                t = $('.middle').height()-$('.mask').height()
            }
            $('.mask').css({
                left:l+"px",
                top:t+"px"
            })
            var xPercent = l/$('.middle').width()
            var yPercent = t/$('.middle').height()
            var bigl = xPercent * $('.big>img').width()
            var bigt = yPercent * $('.big>img').height()
            $('.big>img').css({
                left:-bigl + "px",
                top:-bigt + "px"
            })
        })
    },function(){
        $('.mask').css('display','none')
        $('.big').css('display','none')
    })
    return false;  
}