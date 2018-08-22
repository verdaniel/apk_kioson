import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  containers: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  icon: {
    height: ratioHeight(30),
    width: ratioWidth(26),
    resizeMode: 'contain'
  },
  btnIsiSaldo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ratioHeight(15)
  },
  textIsiSaldo: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.squash,
    textAlign: 'center'
  },
  imgLogo: {
    width: ratioWidth(95),
    height: ratioHeight(24)
  },
  btnTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  imgTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  maskedVerify: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageVerify: {
    height: ratioHeight(20),
    width: ratioWidth(96),
    marginLeft: ratioWidth(-5)
  },
  verify: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: moderateScale(12),
    marginTop: ratioHeight(10),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(11),
    paddingVertical: ratioHeight(3)
  },
  textRegularBlue: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.nice_blue
  },
  banner: {
    height: ratioHeight(108),
    width: Metrics.screenWidth
  },
  flexColumn: {
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15)
  },
  robotoBoldFF: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(18),
    color: Colors.white_two
  },
  separator: {
    backgroundColor: Colors.white_two,
    width: ratioWidth(34),
    height: 1,
    marginVertical: ratioHeight(5)
  },
  viewElvation: {
    // elevation: 2,
    marginVertical: ratioHeight(10),
    backgroundColor: Colors.white_two
  },
  viewShadow: {
    // elevation:3,
  },
  flexOneCol: {
    flexDirection: 'column',
    flex: 1
  },
  flexRowBorderBotttom: {
    flexDirection: 'row',
    marginHorizontal: ratioWidth(15),
    paddingVertical: ratioHeight(11),
    alignItems: 'center',
    justifyContent: 'center'
  },
  robotoBoldSquas: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.squash
  },
  robotoRegSlate: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoRegBigSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  robotoMedGrey: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(16),
    color: Colors.greyish
  },
  buttonSquas: {
    backgroundColor: Colors.squash,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ProductSansBold: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(10),
    color: Colors.white_two,
    paddingHorizontal: ratioWidth(16),
    paddingVertical: ratioHeight(6)
  },
  flexOneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imagMenu: {
    width: ratioWidth(20),
    height: ratioHeight(20)
  },
  flexColMenu: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    marginLeft: ratioWidth(17)
  },
  flexRowMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ratioHeight(18)
  },
  imageArrow: {
    width: ratioWidth(7),
    height: ratioHeight(12),
    marginRight: ratioWidth(15)
  },
  logo: {
    height: ratioHeight(16),
    width: ratioWidth(63)
  },
  footer: {
    marginVertical: ratioHeight(15),
    alignItems: 'center'
  },
  textFooter: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    paddingTop: ratioHeight(3),
    color: Colors.greyish
  },
  modalBackDrop: {
    flex: 1,
    backgroundColor: Colors.black_35
  },
  modal: {
    borderRadius: 3,
    height: ratioHeight(150),
    width: ratioWidth(320),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10)
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue,
    marginTop: ratioHeight(5)
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  ProductSansBoldFixed: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  containerBlueCol: {
    backgroundColor: Colors.black_60,
    padding: moderateScale(10),
    marginTop: ratioHeight(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Metrics.screenWidth
  },
  productSansRegular: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  productSansBold: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: ratioHeight(15),
    paddingBottom: ratioHeight(25),
    paddingHorizontal: ratioWidth(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  tabLabel: {
    marginBottom: ratioHeight(10),
    justifyContent: 'center'
  },
  tabIcon: {
    height: '100%',
    paddingHorizontal: ratioWidth(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: ratioHeight(5)
  }
})
