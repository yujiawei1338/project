$(function(){
    var username = getCookie('username');
    var login = document.querySelector('.come');
    if(username){
      var str = `欢迎光临 ${username} 来到 <a href="index.html">当当</a>
      <a href="javascript:;" class="logout">退出</a>`;
      login.innerHTML = str;

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

      // 退出功能
        var logout = document.querySelector('.logout');
        logout.onclick = function(){
        layer.confirm('你确定要退出吗？',
        {
          btn:['确定','取消']
        },
        function(){
          // 删除cookie
          delCookie('username');
          //清空localStirage
          localStorage.clear('data');
          $('.jian').html(0);
          login.innerHTML = `欢迎光临请 <a href="index.html">登录</a>
          <a href="register.html">注册</a>`;
          layer.msg('退出成功',{icon:1,time:500})
          window.location.href="index.html";
          
        },
        function(){
          layer.msg('已取消',{icon:1,time:500})
          return false;
        }   
        )
      }
    }
 
  })