const RupiahFormat = (price, fixed = 2) => {
  var string = 'string'
  if (price === 0 || price === null || price === undefined || price === '0' || typeof price === string) {
    return price
  }
  const priceSplit = String(price.toFixed(fixed)).split('.')
  const firstPrice = priceSplit[0]
  const secondPrice = priceSplit[1]
  const priceReal = String(firstPrice).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  if (Number(secondPrice) > 0) {
    return `${priceReal},${secondPrice}`
  } else {
    return `${priceReal}`
  }
}
export default RupiahFormat
