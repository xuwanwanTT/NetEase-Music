$(function(){
  $.get('./sources/playlist.json').then(response=>{
    $('.loading').addClass('active')
    $('.page').addClass('active')
    let data = response
    header(data)
    songList(data[0].song)
  })

  $('.playlist-intro').on('click',function(){
    $('.showtag-down').hasClass('active') ? showUp() : showDown()
  })

  function showDown(){
    $('.showtag-up').removeClass('active')
    $('.showtag-down').addClass('active')
    $('.intro-text').addClass('hidden')
  }

  function showUp(){
    $('.showtag-up').addClass('active')
    $('.showtag-down').removeClass('active')
    $('.intro-text').removeClass('hidden')
  }

  function header(data){
    let {discribtion, imger, lister, name, listcover, tags} = data[0]
    $('.cover-img img').attr('src',listcover)
    $('.lister img').attr('src',imger)
    $('.lister span').text(lister)
    $('.cover-text > h3').text(name)
    tags.map(s=>{
      let html = `<span>${s}</span>`
      $('.playlist-tag').append($(html))
    })
    let arr = discribtion.split('\n')
    arr.map(s=>{
      let html = `<span>${arr.indexOf(s) === 0 ? '简介：'+s : s}</span><br>`
      $('.intro-text').append($(html))
    })
  }

  function songList(data){
    data.map(s=>{
      let songList = `<li><a href="./song.html?id=${data.indexOf(s)+1}">
        <span class="rank">${data.indexOf(s)+1}</span>
        <h3 class="hiddWord">${s.name}</h3>
        <p class="hiddWord">${parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':''}${s.singer}-${s.name}</p>
        <svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg>
        </a></li>`
      $('.playlist ol').append($(songList))
    })
  }
})