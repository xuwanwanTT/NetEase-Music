### 实现网易云音乐（移动端页面）

作者：肖丰

预览：https://xuwanwantt.github.io/NetEase-Music/index.html

### 功能实现

- 网易云移动端所有页面，包括主页面，播放界面，歌单界面
- 各个页面间的交互
- 在前端模拟后端数据交换，包括歌曲列表的获取，歌曲搜索
- 针对 414px 和 360px 以及 360px 以下的屏幕通过媒体查询进行适配

### 技术

- HTML 使用语义化的标签编写

- CSS 使用flex布局，固定定位，绝对定位，动画，阴影，媒体查询等属性，实现页面布局和样式

- JavaScript 使用 jQuery 编写，使用了 ES6 语法，实现点击事件，ajax请求，页面展现，歌曲搜索等功能

### 后记

移动端 Android 和 ios ，chrome ，safari ，微信，QQ ，对 HTML 5 和 CSS3 的兼容略有不同，实现过程中进行了兼容处理，移动端和 pc 端的页面展现也有不同，主要通过 mate 标签进行处理。

#### mate

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

#### ios 不支持 animation-play-state 属性

通过 js 获取当前元素的 transform 属性，通过添加、移除 class 实现 animation 动画。
由于移除 animation 后，改变的效果会还原，所以给当前元素添加一个和当前元素同等大小的父元素，让父元素得到改变值，此时子元素也会旋转，实现 animation-play-state 效果。

```
let siteImg = $('.cover').css('transform')
let siteWp = $('.circleWp').css('transform')
$('.circleWp').css('transform',siteWp === 'none' ? 
  siteImg :
  siteImg.concat(' ',siteWp)
)
```

#### 歌曲搜索

监听 input 事件，实时获取输入的 value ，当获取到值的时候就执行函数search ，对数组进行操作，并且在监听中使用 setTimeout 进行一个输入操作的优化，实现当用户停止输入的时候才进行搜索显示结果

```
var timer
$('.search input').on('input',function(e){
  clearTimeout(timer)
  timer = setTimeout(function(){
    search()
  },300)
}
```

#### 媒体查询

原本是使用 vw ，vh ，后来发现兼容性不好，然后就改为媒体查询，设置不同宽度下的元素的样式

```
...

@media screen and (min-width: 360px) {
  ...
}

@media screen and (min-width: 414px) {
  ...
}
```