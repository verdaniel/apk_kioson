import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  gradient: {
  },
  banner: {
    height: ratioHeight(225),
    width: Metrics.screenWidth,
    alignSelf: 'center'
  },
  logo: {
    height: ratioHeight(138.4),
    width: ratioWidth(145),
    marginLeft: ratioWidth(110),
    marginVertical: ratioHeight(45)
  },
  iconSquareLarge: {
    height: ratioHeight(24),
    width: ratioWidth(24)
  },
  iconSquareSmall: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  iconSquareMedium: {
    height: ratioHeight(35),
    width: ratioWidth(35)
  },
  flexEnd: {
    paddingBottom: ratioHeight(12),
    backgroundColor: Colors.red
  },
  statusBox: {
    paddingVertical: ratioHeight(9),
    marginTop: ratioHeight(10),
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black_15
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    paddingBottom: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  flexBigColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ratioHeight(15)
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    paddingVertical: ratioHeight(8),
    textAlign: 'center'
  },
  button: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    borderColor: Colors.nice_blue,
    borderWidth: 1
  },
  margin: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  iconAbsolute: {
    position: 'absolute',
    marginVertical: ratioHeight(15),
    right: ratioWidth(15),
    alignSelf: 'flex-end'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ratioWidth(10)
  },
  buttonClear: {
    borderColor: Colors.nice_blue,
    backgroundColor: Colors.white_two
  },
  flexOneMargin: {
    marginLeft: ratioWidth(20),
    marginRight: ratioWidth(20),
    marginTop: ratioHeight(20)
  },
  maskedLogo: {
    marginTop: ratioHeight(15),
    marginBottom: ratioHeight(15),
    padding: moderateScale(13),
    borderWidth: 1,
    borderColor: Colors.nice_blue,
    borderRadius: 3
  },
  productSansBoldMed: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginLeft: ratioWidth(10)
  },
  robotoMediumBlue: {
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoRegularSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  robotoBoldSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  robotoRegularMedCenter: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white_two,
    fontSize: moderateScale(24),
    textAlign: 'center'
  },
  robotoRegularMedSquas: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(24),
    color: Colors.squash
  },
  robotoRegularMedLeft: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.greyish,
    textAlign: 'left'
  },
  sparator: {
    width: ratioWidth(1),
    height: ratioHeight(35),
    backgroundColor: Colors.black_15,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  }
})
