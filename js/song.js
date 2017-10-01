const $disC = $('.disc-container')
let audio = document.createElement('audio')

// $.ajax({
//   url: './sources/song.json',
//   method: 'get'
// }).done(function(data){
//   console.log(data)
// })
//   .fail(function(){
//     alert('error')
//   })

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