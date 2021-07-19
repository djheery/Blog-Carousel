const BlogCarouselApp = (() => {
  const ui = BlogCarouselUI.getSelectors()
  const loadEventListeners = () => {  
    window.addEventListener('DOMContentLoaded', e => {
      const data = CarouselData.getData()
      BlogCarouselUI.populateCarousel(data)
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
      CarouselData.produceData()
      loadEventListeners() 
    }
  }
})(CarouselData)

BlogCarouselApp.init()