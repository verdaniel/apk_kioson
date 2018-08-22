import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ratioWidth(10),
    paddingTop: ratioHeight(10),
    paddingRight: ratioWidth(10)
  },
  viewImage: {
    width: ratioWidth(36),
    height: ratioHeight(36),
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSeparator: {
    height: ratioHeight(0.5),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  textLabel: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  textInput: {
    height: ratioHeight(39),
    padding: moderateScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16)
  },
  textAlert: {
    marginLeft: ratioWidth(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
  textInfo: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    marginLeft: ratioWidth(10)
  },
  btnBuy: {
    position: 'absolute',
    bottom: ratioHeight(15),
    alignSelf: 'center',
    height: ratioHeight(43),
    width: ratioWidth(310),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBuy: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  }
})
