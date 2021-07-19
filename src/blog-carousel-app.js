const BlogCarouselApp = (() => {
  const ui = BlogCarouselUI.getSelectors()
  const loadEventListeners = () => {  
    window.addEventListener('DOMContentLoaded', e => {
      const data = CarouselData.getData()
      for(let i = 0; i < ui.tracks.length; i++) {
        console.log(data[i])
        BlogCarouselUI.populateCarousel(data[i], ui.tracks[i])
      }
    })

    ui.prevBtns.forEach(i =>{
      i.addEventListener('click', BlogCarouselUI.slidePrevious)
    })
    ui.nextBtns.forEach(i =>{
      i.addEventListener('click', BlogCarouselUI.slideNext)
    })
    ui.filters.forEach(i =>{
      i.addEventListener('keyup', BlogCarouselUI.filterSlides)
    })
  }

  return {
    init: () => {
      CarouselData.produceData(BlogCarouselUI.getSelectors().tracks)
      loadEventListeners() 
    }
  }
})(CarouselData)

BlogCarouselApp.init()