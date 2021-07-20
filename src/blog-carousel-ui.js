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
    populateCarousel: (data, track) => {
      track.innerHTML = " "
      for(let i = 0; i < data.length; i++) {
        track.innerHTML += `
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
      const slides = Array.from(track.children);
      let count = 0;
      if(slides[0]) slides[0].classList.add('current-slide');
      slides.forEach(s => {
        BlogCarouselUI.setSlidePosition(s, count, track)
        count ++
      });
    },
    getSlideWidth: (slideArr) => {
      let slideWidth = slideArr[0].getBoundingClientRect().width;
      return slideWidth
    },
    setSlidePosition: (slides, index, track) => {
      const slideArr = Array.from(track.children);
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
    slidePrevious: (track, e) => {
      const slides = Array.from(track.children);
      const currentSlide = track.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling;
      const prevIndex = slides.findIndex(slide => slide === prevSlide)

      if(prevIndex !== -1) {
        BlogCarouselUI.moveToSlide(track, currentSlide, prevSlide)
        BlogCarouselUI.hideShowArrows(slides, e.target.parentElement, e.target.parentElement.nextElementSibling, prevIndex)
      }      
    },
    slideNext: (track, e) => {
      const slides = Array.from(track.children);
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling;
      const nextIndex = slides.findIndex(slide => slide === nextSlide)
      
      if(nextIndex !== -1) {
        console.log(e.target)
        BlogCarouselUI.moveToSlide(track, currentSlide, nextSlide)
        BlogCarouselUI.hideShowArrows(slides, e.target.parentElement.previousElementSibling, e.target.parentElement, nextIndex)
      }
    },
    filterSlides: (input, e, id, track) => {
      input.classList.remove('input-error')
      const data = CarouselData.getData();
      console.log(data[id])
      const v = e.target.value.toLowerCase();
      if(v.length < 5 || v === '') {
        BlogCarouselUI.populateCarousel(data[id], track);
        return
      }
      const slidesToDisplay = []
      data[id].filter(d => {
        if(d.slideText.toLowerCase().indexOf(v) !== -1) {
          if(slidesToDisplay.indexOf(d) === -1) {
            slidesToDisplay.push(d);
          }
        }
      })
      if(slidesToDisplay.length > 0) {
        BlogCarouselUI.populateCarousel(slidesToDisplay, track);
      }
      if(slidesToDisplay.length === 0) {
        BlogCarouselUI.populateCarousel(data[id], track);
        BlogCarouselUI.inputError(input)
        return
      }
    },
    inputError: (input) => {
      input.classList.add('input-error');
    }
  }
})()



