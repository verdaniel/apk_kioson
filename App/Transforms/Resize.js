import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

function ratioWidth (size) {
  var newSize = (width / 360) * size
  return newSize
}

function ratioHeight (size) {
  var newSize = (height / 640) * size
  return newSize
}

function getRegionForCoordinates (latitude, longitude) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY

  // init first point
  minX = latitude
  maxX = latitude
  minY = longitude
  maxY = longitude

  // calculate rect
  minX = Math.min(minX, latitude)
  maxX = Math.max(maxX, latitude)
  minY = Math.min(minY, longitude)
  maxY = Math.max(maxY, longitude)

  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  const deltaX = (maxX - minX)
  const deltaY = (maxY - minY)

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  }
}

export {
  ratioWidth,
  ratioHeight,
  getRegionForCoordinates
}
