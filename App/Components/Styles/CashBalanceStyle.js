import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexRow: {
    // flexDirection: 'row',
    backgroundColor: Colors.white_two,
    // paddingLeft: ratioWidth(15),
    // paddingRight: ratioWidth(15),
    // paddingTop: ratioHeight(13),
    // paddingBottom: ratioHeight(9),
    height: ratioHeight(43),
    marginBottom: ratioHeight(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnIsiSaldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textIsiSaldo: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.squash,
    textAlign: 'center'
  },
  textBoldMedium: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: ratioWidth(10)
  },
  textRegularMedium: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: ratioWidth(7)
  },
  icon: {
    height: ratioHeight(20.4),
    width: ratioWidth(24),
    resizeMode: 'contain'
  },
  textTop: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.squash
  },
  textBottom: {
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.nice_blue,
    width: ratioWidth(200),
    fontSize: moderateScale(14)
  },
  imageStyle: {
    width: ratioWidth(24),
    height: ratioHeight(20.8),
    marginTop: ratioHeight(5),
    marginHorizontal: ratioWidth(15)
  }
})
