const CarouselData = (() => {
  const data = [];

  return {
    produceData: (track) => {
      for(let i = 0; i < track.length; i++) {
        track[i].parentElement.parentElement.dataset.trackId = i
        track[i].dataset.trackId = i
        data.push([])
        let slideHeadingArr = []
        let slideImgArr = []       
        slideHeadingArr = Array.from(track[i].querySelectorAll('.slide__heading'));
        slideImgArr = Array.from(track[i].querySelectorAll('.slide__inner-img'));
        for(let j = 0; j < slideHeadingArr.length; j++) {
          data[i].push({slideText: slideHeadingArr[j].textContent, slideImgSrc: slideImgArr[j].src})
        }
      }        
    },
    getData: () => {
      return data
    }
  }
})()

