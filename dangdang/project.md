# 项目介绍 
- github项目仓库地址：
- https://github.com/yujiawei1338/project.git
### 一、主页(index.html)
1.轮播图:主图轮播，鼠标移入停止轮播出现左右点击按钮，鼠标移出，开始轮播隐藏左右翻页按钮，也可点击右下角小圆圈切换轮播图的图片

2.下拉列表:主页上方导航栏鼠标划入出现下拉列表，划出收起列表

3.tab切换:轮播图右边、下边全是tab切换点击或划入即可

### 二、注册(register.html)
1.不能为空或不勾选协议

2.输入不正确会出现提示

3.输入已注册的用户名进行注册出现错误提示

4.需要符合条件注册成功出现提示并跳转login.html

### 三、登录(login.html)
1.输入错误时会提示

2.输入正确后提示并跳转index.html

3.7天免登录效果

### 四、列表(list.html)
1.通过ajax请求数据库商品信息动态创建数据并进行分页效果

### 五、详情(detail.html)
1.未登录禁止添加商品并进入购物车订单页面

2.商品放大镜效果

3.增加减少商品数量
### 六、购物车(shopCar.html)
1.未登录禁止访问

2.未添加商品或移除最后一件商品显示空空如也

3.全选/单选效果后进行商品总数、商品总价自动计算

4.也可在购物车中增加减少商品数量/移除效果

###  七、共同点(除注册登录外)
1.状态判断:通过checkLogin.js中代码判断cookie是否存在判断状态

2.如果是已登录状态导航栏则会发生改变，同时有登出按钮

3.登出会删除cookie信息，还会删除Local Storage数据

4.购物车后数字会实时发生改变(添加 删除 登出)

5.每个页面都有一个小导航栏或点击跳转效果方便跳转

6.每个页面退出后自动返回主页



