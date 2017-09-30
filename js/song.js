var $disC = $('.disc-container')

$('.icon-play').on('click',function(){
  $disC.addClass('playing')
})

$('.icon-pause').on('click',function(){
  $disC.removeClass('playing')
})