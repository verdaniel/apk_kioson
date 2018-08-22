import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Transforms/Scaling'
import { Fonts, Colors, Metrics } from '../../Themes/index'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: ratioHeight(-Metrics.navBarHeight)
  },
  image: {
    height: ratioHeight(175),
    width: ratioWidth(188),
    marginBottom: ratioHeight(30)
  },
  textState: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginBottom: ratioHeight(5)
  },
  textDesc: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.greyish,
    textAlign: 'center',
    paddingHorizontal: ratioWidth(30)
  }
})
