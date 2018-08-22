import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bgColor: {
    backgroundColor: Colors.nice_blue,
    // paddingBottom: ratioHeight(50),
    paddingTop: ratioHeight(22)
    // borderWidth: 0.5,
    // borderColor: Colors.black_15
  },
  robotoMedium: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.white_two,
    textAlign: 'center',
    paddingBottom: ratioHeight(5)
  },
  robotoRegular: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two,
    textAlign: 'center',
    paddingBottom: ratioHeight(5)
  },
  flexOneMinus: {
    flex: 1
    // marginTop: ratioHeight(-15)
  },
  absoluteView: {
    backgroundColor: Colors.squash,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: ratioHeight(77)
  },
  viewBottom: {
    marginBottom: ratioHeight(15),
    backgroundColor: Colors.white_two,
    paddingLeft: ratioWidth(17)
  },
  notLoginContainer: {
    marginTop: ratioHeight(25),
    marginBottom: ratioHeight(10),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    height: ratioHeight(180),
    width: ratioWidth(180),
    resizeMode: 'contain',
    marginBottom: ratioHeight(40)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey
  },
  textDescription: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: Colors.greyish
  }
})
