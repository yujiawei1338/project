// 页面一刷新/打开，就应该给用户名的文本框放上以前记住的用户名

var rememberusername = getCookie('rememberusername');
var user = document.querySelector("[name='username']")
if(rememberusername){
    user.value = rememberusername;
}

$('.form_login').validate({
    rules:{
        username:'required',
        password:'required',
    },
    messages:{
        username:'<p style="color:red;">用户名不能为空</p>',
        password:'<p style="color:red;margin-bottom:10px;">密码不能为空</p>'
    },
    submitHandler:function(form){
        var loadindex = layer.load(1, {
            shade: [0.5,'#333'] //0.1透明度的白色背景
        });
        $('#login').prop('disabled',true)
        $.ajax({
            url:'./php/login.php',
            data:$('form').serialize(), 
            dataType:'json',
            method:'post',
            success:res=>{
                // 解构赋值
                var {meta:{status,msg}} = res;                
                layer.close(loadindex)
                var msgindex = layer.msg(msg)
                if(status===0){
                    // 设置cookie
                    setCookie('username',$('[name="username"]').val())
                    if($("[name='remember']").prop('checked')){
                        setCookie('rememberusername',$('[name="username"]').val(),7*24*3600)
                    }
                    // 跳转
                    setTimeout(()=>{
                        layer.close(msgindex)
                        $('#login').prop('disabled',false)
                        window.location.href = 'index.html';   
                    },2000)
                    
                }else{
                    $('#login').prop('disabled',false)
                    return false;
                }
            }
        })
        return false;
    }
})

$('#register').click(function(){
    window.location.href="register.html";
})