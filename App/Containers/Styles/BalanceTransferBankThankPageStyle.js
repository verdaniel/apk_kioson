import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },
  navbarContainer: {
    height: ratioHeight(Metrics.navBarHeight),
    width: Metrics.screenWidth,
    backgroundColor: Colors.squash,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  imgBack: {
    width: ratioWidth(18),
    height: ratioHeight(20),
    resizeMode: 'contain'
  },
  help: {
    width: ratioWidth(24),
    height: ratioHeight(24),
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  },
  viewHeader: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  },
  textButton: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two
  },
  viewRight: {
    flex: 1
  },
  viewLeft: {
    flex: 1
  },
  dateContainer: {
    padding: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  date: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey
  },
  countDownContainer: {
    padding: moderateScale(5),
    marginBottom: ratioHeight(10),
    backgroundColor: Colors.snow,
    flexDirection: 'row'
  },
  countDownColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5)
  },
  textCountDown: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(26),
    fontWeight: '300',
    color: Colors.slate_grey
  },
  textLabelCountDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.slate_grey
  },
  body: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    padding: moderateScale(15)
  },
  accountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: moderateScale(10)
  },
  textTypeAccount: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    marginBottom: ratioHeight(2),
    color: Colors.nice_blue
  },
  logo: {
    marginTop: ratioHeight(20),
    marginBottom: ratioHeight(20),
    width: ratioWidth(85),
    height: ratioHeight(25),
    resizeMode: 'contain'
  },
  textAccount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(26),
    color: Colors.slate_grey
  },
  transferCode: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.greyish
  },
  amountContainer: {
    borderRadius: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: moderateScale(14),
    flex: 1
  },
  amountContainerBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(14),
    flex: 1,
    backgroundColor: Colors.snow,
    borderTopColor: Colors.black_15,
    borderTopWidth: moderateScale(0.5),
    marginTop: moderateScale(1)
  },
  transfer: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  transferBold: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    color: Colors.red
  },
  warningContainer: {
    padding: moderateScale(5),
    borderRadius: moderateScale(3),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow
  },
  paymentContainer: {
    borderRadius: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black_15,
    borderWidth: 1,
    padding: moderateScale(15),
    flex: 1
  },
  paymentContainerNoBorder: {
    borderRadius: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: ratioHeight(15),
    paddingBottom: ratioHeight(15),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    flex: 1
  },
  labelPayment: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  arrow: {
    width: ratioWidth(12),
    height: ratioWidth(7)
  },
  tutorialContainer: {
    marginTop: ratioHeight(-10),
    padding: moderateScale(15),
    paddingTop: ratioHeight(15),
    borderLeftWidth: moderateScale(1),
    borderLeftColor: Colors.black_15,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15,
    borderRightWidth: moderateScale(1),
    borderRightColor: Colors.black_15,
    flexDirection: 'column',
    zIndex: 2,
    backgroundColor: Colors.snow
  },
  tutorialContainerNoBorder: {
    marginTop: ratioHeight(-10),
    marginRight: ratioWidth(15),
    marginLeft: ratioWidth(15),
    paddingTop: ratioHeight(15),
    paddingBottom: ratioHeight(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15,
    flexDirection: 'column',
    zIndex: 2,
    backgroundColor: Colors.snow
  },
  row: {
    flexDirection: 'row',
    marginBottom: ratioHeight(2)
  },
  resiContainer: {
    marginTop: ratioHeight(15),
    padding: moderateScale(15),
    borderTopColor: Colors.black_15,
    borderTopWidth: moderateScale(1),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: ratioHeight(45),
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.nice_blue
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
  }
})
