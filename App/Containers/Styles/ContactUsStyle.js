import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bgColor: {
    backgroundColor: Colors.nice_blue,
    borderWidth: 0.5,
    borderColor: Colors.black_15
  },
  maskedImage: {
    height: ratioHeight(85),
    width: ratioWidth(83)
  },
  robotoMedium: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'left'
  },
  robotoRegular: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two,
    textAlign: 'left'
  },
  viewBottom: {
    marginTop: ratioHeight(15),
    marginBottom: ratioHeight(15),
    backgroundColor: Colors.white_two,
    paddingLeft: ratioWidth(17)
  }
})
