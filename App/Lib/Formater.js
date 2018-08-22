function RupiahFormat (price, fixed = 2) {
    var string = 'string'
    if (price === 0 || price === null || price === undefined || price === '0' || typeof price === string) {
      return price
    }
    const priceSplit = String(price.toFixed(fixed)).split('.')
    const firstPrice = priceSplit[0]
    const secondPrice = priceSplit[1]
    const priceReal = String(firstPrice).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    if (Number(secondPrice) > 0) {
      return 'Rp ' + `${priceReal},${secondPrice}`
    } else {
      return 'Rp ' + `${priceReal}`
    }
  }
  
  function ReadAbleText (param) {
    // remove double space
    param = param.replace(/-/g, ' ')
    param = param.toLowerCase().replace(/\b[a-z]/g, (letter) => {
      return letter.toUpperCase()
    })
    return param
  }
  
  export {
    RupiahFormat,
    ReadAbleText
  }
  