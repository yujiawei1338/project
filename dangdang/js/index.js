//新书上架
$('.qiehuan>span').on('click', function () {
    // console.log(1);
    var index = $(this).index();
    console.log(index);
    $(this).parent().prev().find('.center_buttom').eq(index).show().siblings().hide();

    console.log($(this).parent().prev().find('.center_buttom'));
})

//新书预售
$('.yushou_qiehuan>span').click(function () {
    $(this).parent().prev().find('.yushou3').eq($(this).index()).show().siblings().hide();

})


//独家特供
$('.main5_top>ul>li').mouseover(function () {
    $(this).css({
        'border':' 2px solid #487a6f',
        'border-bottom':'2px solid #fff',
        'border-radius':'8px 8px 0 0'
    }).siblings().css({
        'border':'none',
        'border-radius':'0px',
        
    }).end().parent().parent().next().find('.left_con').eq($(this).index()).show().siblings().hide();
})



//排行
$('.paihang_head>ul>li').mouseover(function(){
    $(this).css({
        'border-bottom':'none',
        'border-top':'1px solid #487a6f',
        'color':'#487a6f;',
    }).siblings().css({
        'border':'1px solid #eaeaea',
        'color':'#000',
    }).end().parent().parent().next().find('ul').eq($(this).index()).show().siblings().hide();
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

