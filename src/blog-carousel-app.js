const BlogCarouselApp = (() => {
  const ui = BlogCarouselUI.getSelectors()
  const loadEventListeners = () => {  
    window.addEventListener('DOMContentLoaded', e => {
      const data = CarouselData.getData()
      for(let i = 0; i < ui.tracks.length; i++) {
        BlogCarouselUI.populateCarousel(data[i], ui.tracks[i])
      }
    })
    ui.prevBtns.forEach(i =>{
      const track = i.nextElementSibling.nextElementSibling.firstElementChild
      i.addEventListener('click', e => BlogCarouselUI.slidePrevious(track, e))
    })
    ui.nextBtns.forEach(i =>{
      const track = i.nextElementSibling.firstElementChild
      i.addEventListener('click', e => BlogCarouselUI.slideNext(track, e))
    })
    ui.filters.forEach(i =>{
      const input = i.parentElement
      const dataID = input.parentElement.nextElementSibling.dataset.trackId
      const track = input.parentElement.nextElementSibling.children[2].firstElementChild
      i.addEventListener('keyup', e => BlogCarouselUI.filterSlides(input, e, dataID, track))
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