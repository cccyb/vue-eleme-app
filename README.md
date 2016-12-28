# Vue高仿饿了么APP
> 使用vue@1.0开发的高仿饿了么APP（用户端）

## 主要依赖
- 基于vue@1.0
- 使用vue-cli@1.0搭建项目框架
- 使用vue-router@0.7.13进行页面路由切换
- 使用vue-resource@1.0.1进行http请求获取数据
- mock假数据存储在本地
- 使用Stylus编写样式
- 使用Eslint进行js代码的规范

## 功能包括
- ......

## Demo
[LiveDemo]()

## Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/cccyb/vue-eleme-app.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build

```
## Todo
- ......

## 说明
暂时使用vue@1.0实现，后续会将vue@1.0迁移至vue@2.0，敬请期待！

- Mac下安装基于vue@1.x的vue-cli脚手架时报错`not matches webpack#1.0`
	
	答：因为"#"在zsh中是特殊字符，所以需要在webpack#1.0外加双引号，即使用`vue init "webpack#1.0" <project-name>`。
	
- 手机端1像素边框的实现

	答：先给需要添加1像素边框的元素设置一个1像素的伪类，然后根据手机屏幕的dpi大小对伪类进行相应的缩减，从而达到手机端1像素边框的实现。

- CSS Sticky footer

	答：[CSS秘密花园： Sticky footers](http://www.w3cplus.com/css3/css-secrets/sticky-footers.html)

- Flex布局

	答：.
