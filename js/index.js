$(function(){
  $.get('./sources/song.json').then(function(response){
    let data = response
    let arr = data.map(s=>{
      let html = '<li><a href="./song.html?id=' + (data.indexOf(s) + 1) + '"' + '><h3>' + s.name + '</h3><p>' + (parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':'') + s.singer + '-' + s.name + '</p><svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg></a></li>'
      $('.lastestMusic ol').append($(html))
    })
  })

  $('.siteNav > ol').on('click','li',function(e){
    $(e.currentTarget).addClass('active').siblings().removeClass('active')
  })
})