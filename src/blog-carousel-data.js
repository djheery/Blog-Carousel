const CarouselData = (() => {
  const data = [];

  return {
    produceData: () => {
      const slideHeadingArr = Array.from(document.querySelectorAll('.slide__heading'));
      const slideImgArr = Array.from(document.querySelectorAll('.slide__inner-img'));
      for(let i = 0; i < slideHeadingArr.length; i++) {
        data.push({slideText: slideHeadingArr[i].textContent, slideImgSrc: slideImgArr[i].src})
      }
    },
    getData: () => {
      return data
    }
  }
})()

