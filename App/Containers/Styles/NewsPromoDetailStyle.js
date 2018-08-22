import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  viewDesc: {
    paddingVertical: ratioHeight(10),
    paddingHorizontal: ratioWidth(15)
  },
  textDate: {
    marginLeft: ratioWidth(5),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  textTitle: {
    // marginTop: ratioHeight(10),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(20),
    color: Colors.slate_grey,
    marginBottom: moderateScale(10)
  },
  textContent: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  viewCoupon: {
    marginTop: ratioHeight(10),
    height: ratioHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(3)
  },
  textCoupon: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(24),
    color: Colors.greyish
  },
  viewButton: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    height: ratioHeight(62),
    backgroundColor: Colors.white_two,
    width: Metrics.screenWidth,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: moderateScale(1),
    borderColor: Colors.black_15
  },
  button: {
    width: ratioWidth(160),
    height: ratioHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    borderColor: 'transparent'
  },
  textBtn: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14)
  }
})
