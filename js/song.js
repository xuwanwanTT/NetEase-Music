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
    
    $('.icon-play').on('click',function(){
      audio.play()
      $disC.addClass('playing')
    })
    
    $('.icon-pause').on('click',function(){
      audio.pause()
      let siteImg = $('.cover').css('transform')
      let siteWp = $('.circleWp').css('transform')
      $('.circleWp').css('transform',siteWp === 'none'?siteImg:siteImg.concat(' ',siteWp))
      $disC.removeClass('playing')
    })

    let playSong = setInterval(()=>{
      let munites = ~~(audio.currentTime/60)
      let seconds = audio.currentTime - munites*60
      let time = `${pad(munites)}:${pad(seconds)}`
      let $pTime = $('.lyric p')
      let $lyric = $('.lyric')
      for(var i = 0; i < $pTime.length; i++){
        if($pTime[i+1] !== undefined && $pTime.eq(i).attr('data-time') < time && time < $pTime.eq(i+1).attr('data-time')){
          $pTime.eq(i).addClass('active').siblings().removeClass('active')
          let pTop = $pTime.eq(i).offset().top -$('.lyric').offset().top - $pTime.innerHeight()
          $lyric.css('transform',`translateY(-${pTop}px)`)
          break
        }
      }
    },500)

    function pad(number){
      return number >= 10 ? '' + number : '0' + number
    }
  }

})