import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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
  flexButton: {
    padding: moderateScale(15),
    elevation: 1,
    backgroundColor: Colors.white_two
  },
  flexRow: {
    flexDirection: 'row',
    paddingBottom: ratioHeight(15),
    borderBottomColor: Colors.black_15,
    borderBottomWidth: 0.5
  },
  flexOne: {
    flex: 1
  },
  textMedium: {
    textAlign: 'right',
    color: Colors.squash,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12)
  },
  textBold: {
    textAlign: 'left',
    color: Colors.nice_blue,
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14)
  },
  textRegular: {
    textAlign: 'left',
    color: Colors.greyish,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    textDecorationLine: 'line-through'
  },
  textRegularFlat: {
    color: Colors.greyish,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14)
  },
  imageDiscount: {
    width: ratioWidth(42.8),
    height: ratioHeight(24),
    justifyContent: 'center'
  },
  textDiscount: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.white_two,
    textAlign: 'right',
    paddingRight: ratioWidth(5.5),
    paddingBottom: ratioHeight(2.5)
  },
  flexRowPaddingTop: {
    flexDirection: 'row',
    paddingTop: ratioHeight(15)
  },
  flexRowFlat: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonCart: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    borderRadius: 3,
    paddingVertical: ratioHeight(12)
  },
  textButtonCart: {
    textAlign: 'center',
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  flexList: {
    marginHorizontal: ratioWidth(10)
  },
  listProduct: {
    flexDirection: 'row',
    marginHorizontal: ratioWidth(15),
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    borderBottomColor: Colors.black_15,
    borderBottomWidth: 0.5
  },
  threeRow: {
    flexDirection: 'row',
    borderRadius: 3,
    padding: moderateScale(4),
    borderColor: Colors.black_15,
    borderWidth: 0.5
  },
  flexRowEnd: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
