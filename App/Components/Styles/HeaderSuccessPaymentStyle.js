import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  banner: {
    height: ratioHeight(225),
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconAbsolute: {
    position: 'absolute',
    top: ratioHeight(15),
    right: ratioWidth(15),
    alignSelf: 'flex-end'
  },
  iconSquareLarge: {
    height: ratioHeight(24),
    width: ratioWidth(24)
  },
  logo: {
    height: ratioHeight(134),
    width: ratioWidth(147)
  }
})
