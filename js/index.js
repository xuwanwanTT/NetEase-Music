$(function(){
  $.get('./sources/index.json').then(function(response){
    let data = response
    let arr = data.map(s=>{
      let html = '<li><a href="./song.html?id=' + (data.indexOf(s) + 1) + '"' + '><h3 class="hiddWord">' + s.name + '</h3><p class="hiddWord">' + (parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':'') + s.singer + '-' + s.name + '</p><svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg></a></li>'
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

  let timer = undefined
  $('.search input').on('input',function(e){
    if(!e.target.value){$('.result').addClass('active').siblings().removeClass('active')}
    else{
      $('.resultInput').addClass('active').siblings().removeClass('active')
      let keyword = e.target.value
      $('.status h3').text(`搜索“${keyword}”`)
      clearTimeout(timer)
      timer = setTimeout(function(){
        search(keyword).then(s=>{
          console.log(s)
          $('.resultInput .resulted').html('')
          s.map(k=>{
            let html = `<li><a href="#">
            <svg class="icon-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path fill-rule="evenodd" fill="#c9c9ca" d="M25.181,23.535l-1.414,1.414l-7.315-7.314   C14.709,19.107,12.46,20,10,20C4.477,20,0,15.523,0,10C0,4.477,4.477,0,10,0c5.523,0,10,4.477,10,10c0,2.342-0.811,4.49-2.16,6.195   L25.181,23.535z M10,2c-4.418,0-8,3.582-8,8s3.582,8,8,8c4.418,0,8-3.582,8-8S14.418,2,10,2z"/></svg>
            <h3>${k}</h3></a></li>`
            $('.resultInput .resulted').append($(html))
          })
        })
      },500)
      
    }
  })

  function search(keyword){
    return new Promise((resolve,reject)=>{
      let arr = ["小半","我们不一样","我的天空","偶像","青春住了谁","带你去旅行","全部都是你"]
      let result = arr.filter(function(s){
        return s.indexOf(keyword) >= 0
      })
      setTimeout(function(){
        resolve(result)
      },(Math.random()*1000 + 300))
    })
  }

  function searchData(data){
    let $recommend = $('.recommend')
    data.map(s=>{
      let html = `<li><a href="#">${s.name}</a></li>`
      $recommend.append($(html))
    })
  }

  function HotData(data,index){
    let {hotCover, hotText, date, song} = data[0]
    let html = `<img class="hotCover" src="${hotCover}" alt="热歌榜封面">
      <img class="hotText" src="${hotText}" alt="热歌榜文字">
      <p class="hotDate">${date}</p>`
    song.map(s=>{
      let songList = `<li><a href="./song.html?id=${song.indexOf(s)+1}">
        <span class="rank">${'0' + (song.indexOf(s)+1)}</span>
        <h3 class="hiddWord">${s.name}</h3>
        <p class="hiddWord">${parseInt(s.sq) === 1?'<svg class="icon icon-sq" aria-hidden="true"><use xlink:href="#icon-sq"></use></svg>':''}${s.singer}-${s.name}</p>
        <svg class="icon icon-play" aria-hidden="true"><use xlink:href="#icon-play1"></use></svg>
        </a></li>`
      $('.tabContent > li > ol').append($(songList))
    })
    $('.intro').append($(html))
  }

})