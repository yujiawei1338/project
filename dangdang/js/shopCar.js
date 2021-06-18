
$(function () {
    var username = getCookie('username');
    console.log(username);
    var login = document.querySelector('.come');
    if (username) {
        var num = localStorage.getItem('data');
        var huan = JSON.parse(num);
        var len;
        console.log(huan);
        if(huan==null){
          len = 0;
        }else{
          len = huan.length;
        }
        $('.jian').html(len);
        var str = `欢迎光临 ${username} 来到 <a href="index.html">当当</a>
      <a href="javascript:;" class="logout">退出</a>`;
        login.innerHTML = str;
        // 退出功能
        var logout = document.querySelector('.logout');
        logout.onclick = function () {
            layer.confirm('你确定要退出吗？',
                {
                    btn: ['确定', '取消']
                },
                function () {
                    // 删除cookie
 
                    login.innerHTML = `欢迎光临请 <a href="index.html">登录</a>
                    <a href="register.html">注册</a>`;
                    layer.msg('退出成功', { icon: 1, time: 500 })
                    delCookie('username');
                    localStorage.clear('data');
                    $('jian').text( 0 );
                    window.location.href="index.html";
                    
                },
                function () {
                    layer.msg('已取消', { icon: 1, time: 500 })
                    return false;
                    
                }
            )
        }
    } else {
        // 用户没有登录就让用户去登陆
        var msgindex = layer.msg("请先登录", {
            icon: 2,
        })
        setTimeout(function () {
            layer.close(msgindex)
            location.href = 'login.html';
        }, 1000)
    }

    // 请求购物车数据
    var data = localStorage.getItem('data');
    if (!data || JSON.parse(data).length == 0) {
        var str = `
            <div class="buy">
                <h1>购物车空空如也!</h1>
                <p>赶快去列表页挑选商品吧</p>
                <button class="list2"><a href="list.html">去列表页</a></button>
            </div>
            `
            $('.show_car').html(str)
    } else {
        var arr = JSON.parse(data);
        console.log(arr);
        if (!arr.length) {
            var str = `
            <div class="buy">
                <h1>购物车空空如也!</h1>
                <p>赶快去列表页挑选商品吧</p>
                <button class="list2"><a href="list.html">去列表页</a></button>
            </div>
            `
            $('.show_car').html(str)
            return false;
        }
        // 从本地存储中获取到所有当前用户的数据
        var brr = arr.map(v => {

            if (v.username === username) {
                return v.goodsid
            }
        });

        // 将所有数据的商品id拼接在一起
        var ids = brr.join(',')
        var loadindex = layer.load(0, { shade: true });
        $.ajax({
            url: './php/shopCar.php',
            data: { ids },
            dataType: "json",
            success(res) {
                var { data } = res;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    var number = arr.find(v => v.username === username && v.goodsid == data[i].id).number
                    str += `
                        <tr>
                            <td><input type="checkbox" name="selectOne"></td>
                            <td><img src="${data[i].imgpath}" width="50" height="50"></td>
                            <td>${data[i].name}</td>
                            <td class="price">￥<span>${data[i].price}</span></td>
                            <td class="number" data-stock="${data[i].stock}" data-id="${data[i].id}">
                                <button class="reduce">-</button>
                                <input type="number" name="number" value="${number}">
                                <button class="add">+</button>
                            </td>
                            <td class="subtotal">￥<span>${data[i].price * number}</span></td>
                            <td><button class="remove">移除</button></td>
                        </tr>
                    `
                }
                $('.table>tbody').html(str)
                layer.close(loadindex)
                // 全选单选事件
                select();
                // 数量加减
                addAndReduce()
                // 移除
                remove()
                // 计算总数和总价
                total()
            }
        })
        
    }
    var NUM = localStorage.getItem('data');
    var huan = JSON.parse(NUM);
    var len = huan.length;
    $('.jian').html(len);
    // 计算总数和总价
    function total() {
        var totalNum = 0;
        var totalPrice = 0
        $('[name="selectOne"]:checked').each(function (i, v) {
            totalNum += $(v).parent().siblings('.number').find('input[name="number"]').val() - 0
            totalPrice += $(v).parent().siblings('.subtotal').find('span').text() - 0
        })
        console.log(totalNum);
        $('.totalNum').text(totalNum)
        $('.totalPrice').text(totalPrice)
    }
    // 全选单选
    function select() {
        $('[name="selectAll"]').click(function () {
            $('[name="selectOne"]').prop('checked', $(this).prop('checked'))
            $('[name="selectAll"]').prop('checked', $(this).prop('checked'))
            total()
            // 必须勾选商品才能结算跳转
            $('.order').click(function(){
                window.location.href="order.html";
            })

        })
        $('[name="selectOne"]').click(function () {
            var selectArr = Array.prototype.slice.call($('[name="selectOne"]'))
            var selectStatus = selectArr.every(v => v.checked)
            $('[name="selectAll"]').prop('checked', selectStatus)
            total()

            $('.order').click(function(){
                window.location.href="order.html";
            })
        })
    }
    // 数量加减
    function addAndReduce() {
        $('table .number .add').click(function () {
            var num = $(this).prev().val() - 0;
            $('table .number .reduce').prop('disabled', false)
            num++;
            if (num >= $(this).parent().attr('data-stock')) {
                num = $(this).parent().attr('data-stock')
                $(this).prop('disabled', true)
            }
            $(this).prev().val(num)
            // 修改本地存储
            var data = JSON.parse(localStorage.getItem('data'))
            var goodsid = $(this).parent().attr('data-id');
            var arr = data.find(v => v.username === username && v.goodsid === goodsid)
            arr.number = num;
            localStorage.setItem('data', JSON.stringify(data))
            // 计算小计
            var price = $(this).parent().siblings(".price").find('span').text() - 0
            var subtotal = price * num;
            $(this).parent().siblings('.subtotal').find('span').text(subtotal)
            total()
        })
        $('.reduce').click(function () {
            var num = $(this).next().val() - 0;
            $('table .number .add').prop('disabled', false)
            num--;
            if (num <= 1) {
                num = 1
                $(this).prop('disabled', true)
            }
            $(this).next().val(num)
            // 修改本地存储
            var data = JSON.parse(localStorage.getItem('data'))
            var goodsid = $(this).parent().attr('data-id');
            var arr = data.find(v => v.username === username && v.goodsid === goodsid)
            arr.number = num;
            localStorage.setItem('data', JSON.stringify(data))
            // 计算小计
            var price = $(this).parent().siblings(".price").find('span').text() - 0;
            var subtotal = price * num;
            $(this).parent().siblings('.subtotal').find('span').text(subtotal)
            total()

 
        })
    }
    // 移除
    function remove() {
        $('.remove').click(function () {
            var that = $(this)
            layer.confirm('你确定要删除吗？',
                {
                    btn: ['确定', '取消'] //按钮
                },
                function () {
                    var data = JSON.parse(localStorage.getItem('data'))
                    var goodsid = that.parent().siblings('.number').attr('data-id');
                    var index = data.findIndex(v => v.username === username && v.goodsid === goodsid)
                    data.splice(index, 1)
                    that.parent().parent().remove()
                    total()
                    localStorage.setItem('data', JSON.stringify(data))
                    layer.msg("删除成功", {
                        icon: 1,
                        time: 500
                    })
                    data = JSON.parse(localStorage.getItem('data'))
                    if (!data.length) {
                        var str = `
                        <div class="buy">
                            <h1>购物车空空如也!</h1>
                            <p>赶快去列表页挑选商品吧</p>
                            <button class="list2"><a href="list.html">去列表页</a></button>
                        </div>
                        `
                        $('.show_car').html(str)
                    }

                    len -= 1;
                    $('.jian').html(len);  
                },
                function () {
                    layer.msg("已取消", {
                        icon: 1,
                        time: 500
                    })
                    len = huan.length;
                    $('.jian').html(len); 
                    return false;
                }

            );
   
        }) 

    }

})


$('.list').click(function(){
    window.location.href="list.html";
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


