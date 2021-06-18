$(function() {
    var loadindex = layer.load(1, {
        shade: [0.5, '#333']
    })
    $.ajax({
        url: './php/list.php',
        dataType: 'json',
        success(res) {
            var {
                data
            } = res;
            console.log(data);
            // data.reverse()

            var pageSize = 8;
            new Page('page', {
                language: {
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页'
                },
                pageData: {
                    pageSize,
                    total: data.length
                },
                show: function(currentPage) {
                    var tmp = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
                    var str = '';
                    tmp.forEach(v => {
                        str += `<div class="box">
                        <div class="tupian">
                            <img src="${v.imgpath}" alt="...">
                            <div class="caption">
                                <h3>${v.name}</h3>
                                <p class='introduce'>${v.introduce}</p>
                                <p>
                                    <button class="btn"><a href="detail.html?id=${v.id}">查看详情</a></button>
                                </p>
                            </div>
                        </div>
                      </div>` 
                    })
                    $('.all').html(str)
                }
            })
            layer.close(loadindex)
        }
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

  })





