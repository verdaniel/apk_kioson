import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling';
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    flex: 1,
    marginTop: -Metrics.navBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  robotoMed: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  whiteBox: {
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    marginTop: ratioHeight(10)
  },
  robotoBig: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(24),
    color: Colors.greyish,
    paddingVertical: ratioHeight(11),
    marginHorizontal: ratioWidth(130)
  },
})
