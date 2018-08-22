import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewLeft: {
    flex: 1
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
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two
  },
  viewRight: {
    flex: 1
  },
  amountContainer: {
    marginTop: moderateScale(10),
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(13),
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  amountBalance: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  amountBalanceData: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  detailPayment: {
    borderTopWidth: ratioWidth(1),
    borderTopColor: Colors.black_15,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15,
    marginTop: ratioHeight(10),
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(5),
    marginBottom: ratioHeight(10),
    flexDirection: 'column'
  },
  pinContainer: {
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    paddingBottom: ratioHeight(5)
  },
  inputContainer: {
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row'
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  errorMessage: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: ratioHeight(43),
    margin: moderateScale(25),
    marginBottom: ratioHeight(15),
    borderRadius: moderateScale(4),
    backgroundColor: Colors.nice_blue
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.snow
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black_35
  },
  modal: {
    width: ratioWidth(320),
    flexDirection: 'column',
    backgroundColor: Colors.white_two,
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(15)
  },
  modalTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.nice_blue
  },
  modalContent: {
    marginTop: ratioHeight(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey,
    marginBottom: ratioHeight(25)
  },
  labelOTP: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.greyish
  },
  inputContainerOTP: {
    borderBottomWidth: moderateScale(0.5),
    marginTop: ratioHeight(20),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputTextOTP: {
    width: ratioWidth(30),
    height: ratioHeight(50),
    marginRight: ratioWidth(5),
    marginLeft: ratioWidth(5),
    marginBottom: ratioHeight(20),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(24),
    color: Colors.slate_grey,
    letterSpacing: moderateScale(20),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15
  },
  otpButton: {
    flex: 1,
    height: ratioHeight(43),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.squash,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ratioHeight(30)
  },
  otpButtonBorder: {
    flex: 1,
    height: ratioHeight(43),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderColor: Colors.squash,
    marginTop: ratioHeight(30)
  },
  installment: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.squash,
    marginBottom: moderateScale(5)
  },
  buttonPassword: {
    justifyContent: 'center'
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16),
    marginLeft: 10
  }
})
