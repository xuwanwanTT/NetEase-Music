$(function(){
  $.get('./sources/index.json').then(function(response){
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
      $.get('./sources/index2.json').then(response=>{
        $('.loading').eq(index).addClass('active')
        $li.attr('data-download','yes')
        HotData(response,index)
      })
    }else if(index === 2){
      $.get('./sources/index3.json').then(response=>{
        $('.loading').eq(index).addClass('active')
        $li.attr('data-download','yes')
        searchData(response)
      })
    }
  })

  function searchData(data){
    let html = ``
  }

  function HotData(data,index){
    let {hotCover, hotText, date, song} = data[0]
    let html = `<img class="hotCover" src="${hotCover}" alt="热歌榜封面">
      <img class="hotText" src="${hotText}" alt="热歌榜文字">
      <p class="hotDate">${date}</p>`
    song.map(s=>{
      let songList = '<li><a href="./song.html?id=' + (song.indexOf(s) + 1) + '"' + '><h3>' + s.name + '</h3><p>' + (parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':'') + s.singer + '-' + s.name + '</p><svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg></a></li>'
      $('.tabContent > li > ol').append($(songList))
    })
    $('.intro').append($(html))
  }

})