import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  listContainer: {
    height: Metrics.screenHeight / 3
  },
  button: {
    position: 'absolute',
    bottom: ratioHeight(15),
    // top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(175),
    width: Metrics.screenWidth - ratioWidth(50),
    marginLeft: ratioWidth(25),
    marginRight: ratioWidth(25),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.greyish
  },
  buttonActive: {
    position: 'absolute',
    bottom: ratioHeight(15),
    // top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(175),
    width: Metrics.screenWidth - ratioWidth(50),
    marginLeft: ratioWidth(25),
    marginRight: ratioWidth(25),
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
  },
  menuRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white_two,
    alignItems: 'center',
    paddingVertical: ratioHeight(15),
    paddingHorizontal: ratioWidth(15)
  },
  textList: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  titleForm: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.greyish,
    paddingVertical: ratioHeight(8),
    paddingHorizontal: ratioWidth(15)
  },
  imageArrow: {
    width: ratioWidth(7),
    height: ratioHeight(12),
    alignItems: 'center'
  },
  textListActive: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.greyish,
    marginRight: ratioWidth(15)
  }
})
