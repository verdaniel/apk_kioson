import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10)
  },
  header: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    marginBottom: ratioHeight(16)
  },
  item: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7)
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  backView: {
    flex: 1,
    position: 'absolute',
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  }
})
