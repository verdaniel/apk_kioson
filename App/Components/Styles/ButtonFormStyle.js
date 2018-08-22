import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  button: {
    marginBottom: ratioHeight(15),
    // position: 'absolute',
    // top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(175),
    // width: Metrics.screenWidth - ratioWidth(50),
    // marginLeft: ratioWidth(25),
    // marginRight: ratioWidth(25),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.greyish
  },
  buttonActive: {
    marginBottom: ratioHeight(15),
    // position: 'absolute',
    // top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(175),
    // width: Metrics.screenWidth - ratioWidth(50),
    // marginLeft: ratioWidth(25),
    // marginRight: ratioWidth(25),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    paddingTop: ratioHeight(12),
    paddingBottom: ratioHeight(12),
    textAlign: 'center'
  }
})
