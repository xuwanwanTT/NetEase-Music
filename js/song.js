$(function(){
  let $disC = $('.disc-container')
  let id = location.search.match(/\bid=([^&]*)/)[1]
  
  $.ajax({
    url: './sources/song.json',
    method: 'get'
  }).done(function(response){
    let data = response.filter(s=>s.id === id)[0]
    let {name, url, singer, img, lrc, bg} = data
    initPlayer(url)
    initText(name, singer, lrc)
    initImg(img, bg)
  })
    .fail(function(){
      alert('error')
    })

  function initImg(img, bg){
    $('.cover').attr('src',img)
    $('.page').css('background-image','url('+ bg + ')')
  }

  function initText(name, singer, lrc){
    let html = '<h2><span>' + name + '</span><span>-</span><span>' + singer + '</span></h2>'
    $('.song-container').prepend($(html))
    parseLrc(lrc)
  }

  function parseLrc(lrc){
    let arr = lrc.split('\n')
    let reg = /^\[(.+)\](.*)$/
    let $lyric = $('.lyric')
    var arr1 = arr.map(s=>s.match(reg))
    arr1.map(s=>{
      if(!s){return}
      let $p = $('<p></p>')
      $p.attr('data-time',s[1]).text(s[2])
      $lyric.append($p)
    })
  }

  function initPlayer(url){
    let audio = document.createElement('audio')

    audio.src = url

    audio.oncanplay = function(){
      audio.play()
      $disC.addClass('playing')
    }
    
    $('.icon-play').on('click',function(){
      audio.play()
      $disC.addClass('playing')
    })
    
    $('.icon-pause').on('click',function(){
      audio.pause()
      $disC.removeClass('playing')
    }) 
  }

})