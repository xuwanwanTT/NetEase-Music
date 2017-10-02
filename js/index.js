$(function(){
  $.get('./sources/song.json').then(function(response){
    let data = response
    let arr = data.map(s=>{
      let html = '<li><a href="./song.html?id=' + (data.indexOf(s) + 1) + '"' + '><h3>' + s.name + '</h3><p>' + (parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':'') + s.singer + '-' + s.name + '</p><svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg></a></li>'
      $('.lastestMusic ol .loading').addClass('active')
      $('.lastestMusic ol').append($(html))
    })
  })

  $('.siteNav > ol').on('click','li',function(e){
    let $li = $(e.currentTarget)
    let index = $li.index()
    $li.addClass('active').siblings().removeClass('active')
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
    $li.trigger('tabChange',index)
  })

  $('.siteNav > ol').on('tabChange',function(e,index){
    let $li = $('.tabContent > li').eq(index)
    if($li.attr('data-download') === 'yes'){return}
    if(index === 1){
      $.get('./sources/page2.json').then(response=>{
        $('.loading').eq(index).addClass('active')
        $li.attr('data-download','yes')
        $li.append($(`<div>${response}<div>`))
      })
    }else if(index === 2){
      $.get('./sources/page3.json').then(response=>{
        $('.loading').eq(index).addClass('active')
        $li.attr('data-download','yes')
        $li.append($(`<div>${response}<div>`))
      })
    }
  })

})