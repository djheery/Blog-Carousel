const BlogCarouselUI = (() => {
  const selectors = {
    tracks: Array.from(document.querySelectorAll('.blog-carousel__track')),
    nextBtns: Array.from(document.querySelectorAll('.next-btn')),
    prevBtns: Array.from(document.querySelectorAll('.prev-btn')),
    filters: Array.from(document.querySelectorAll('.blog-filter__input')),
  }
  

  return {
    getSelectors: () => {
      return selectors
    },
    populateCarousel: (data) => {
      selectors.track.innerHTML = " "
      for(let i = 0; i < data.length; i++) {
        selectors.track.innerHTML += `
          <div class="blog-carousel__slide">
          <div class="slide__wrapper">
            <div class="slide__img">
              <img src="${data[i].slideImgSrc}" class="slide__inner-img" alt="${data[i].slideText}">
            </div>
            <div>
              <p class="slide__heading">${data[i].slideText}</p>
            </div>
            <div class="slide__seperator"></div>
          </div>
        </div>
        `
      }
      const slides = Array.from(selectors.track.children);
      if(slides[0]) slides[0].classList.add('current-slide');
      slides.forEach(BlogCarouselUI.setSlidePosition);
    },
    getSlideWidth: (slideArr) => {
      let slideWidth = slideArr[0].getBoundingClientRect().width;
      return slideWidth
    },
    setSlidePosition: (slides, index) => {
      const slideArr = Array.from(selectors.track.children);
      let slideWidth = BlogCarouselUI.getSlideWidth(slideArr)
      slides.style.left = slideWidth * index + 'px'
    },
    moveToSlide: (track, currentSlide, targetSlide) => {
      track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
    },
    hideShowArrows: (slides, prevBtn, nextBtn, targetIndex) => {
      if(targetIndex === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
      } else if(targetIndex === slides.length - 1) {
        prevBtn.classList.remove('is-hidden')
        nextBtn.classList.add('is-hidden')
      } else {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
      }    
    },
    slidePrevious: () => {
      const slides = Array.from(selectors.track.children);
      const currentSlide = document.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling;
      const prevIndex = slides.findIndex(slide => slide === prevSlide)
    
      BlogCarouselUI.moveToSlide(selectors.track, currentSlide, prevSlide)
      BlogCarouselUI.hideShowArrows(slides, selectors.prevBtn, selectors.nextBtn, prevIndex)
    },
    slideNext: () => {
      const slides = Array.from(selectors.track.children);
      const currentSlide = document.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling;
      const nextIndex = slides.findIndex(slide => slide === nextSlide)
    
      BlogCarouselUI.moveToSlide(selectors.track, currentSlide, nextSlide)
      BlogCarouselUI.hideShowArrows(slides, selectors.prevBtn, selectors.nextBtn, nextIndex)
    },
    filterSlides: (e) => {
      const input = document.querySelector('.blog-filter__search-bar');
      input.classList.remove('input-error')
      const data = CarouselData.getData();
      const v = e.target.value.toLowerCase();
      if(v.length < 5 || v === '') {
        BlogCarouselUI.populateCarousel(data);
        return
      }
      const slidesToDisplay = []
      data.filter(d => {
        if(d.slideText.toLowerCase().indexOf(v) !== -1) {
          if(slidesToDisplay.indexOf(d) === -1) {
            slidesToDisplay.push(d);
          }
        }
      })
      if(slidesToDisplay.length > 0) {
        BlogCarouselUI.populateCarousel(slidesToDisplay);
      }
      if(slidesToDisplay.length === 0) {
        BlogCarouselUI.populateCarousel(data);
        BlogCarouselUI.inputError(input)
        return
      }
    },
    inputError: (input) => {
      input.classList.add('input-error');
    }
  }
})()



