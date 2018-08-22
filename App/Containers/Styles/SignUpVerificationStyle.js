import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash
  },
  titleContainer: {
    marginTop: ratioHeight(56),
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  logo: {
    width: ratioWidth(125),
    height: ratioHeight(31.6),
    marginBottom: ratioHeight(100),
    resizeMode: 'contain'
  },
  textHelp: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.snow
  },
  buttonHelp: {
    margin: moderateScale(25),
    marginTop: moderateScale(0)
  },
  textPhone: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.white_two
  },
  textTrial: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    marginTop: ratioHeight(25),
    textAlign: 'center',
    color: Colors.white_two
  },
  inputContainer: {
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: ratioHeight(10)
  },
  inputTextOTP: {
    width: ratioWidth(30),
    height: ratioHeight(65),
    marginRight: ratioWidth(5),
    marginLeft: ratioWidth(5),
    marginBottom: ratioHeight(20),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(30),
    color: Colors.snow,
    letterSpacing: moderateScale(20),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.snow
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: ratioHeight(20),
    paddingLeft: ratioWidth(30),
    paddingRight: ratioWidth(30)
  },
  buttonConfirmation: {
    flex: 1,
    borderRadius: moderateScale(6),
    height: ratioHeight(50),
    backgroundColor: Colors.greyish,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonConfirmationOn: {
    flex: 1,
    borderRadius: moderateScale(6),
    height: ratioHeight(50),
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  statusOTPContainer: {
    flexDirection: 'row',
    marginTop: ratioHeight(20),
    justifyContent: 'center'
  },
  statusOTP: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white_two
  },
  renderInputContainer: {
    flexDirection: 'column',
    margin: moderateScale(25),
    marginBottom: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    margin: moderateScale(5),
    alignItems: 'center'
  },
  round: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10)
  },
  textRound: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.squash
  },
  textRoundError: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: Colors.white_two
  },
  buttonNext: {
    flex: 1,
    height: ratioHeight(50),
    marginTop: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6)
  },
  registerContainer: {
    position: 'absolute',
    borderTopColor: Colors.greyish,
    borderTopWidth: moderateScale(0.5),
    bottom: 0,
    marginTop: ratioHeight(10),
    height: ratioHeight(36),
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    flexDirection: 'row'
  },
  textRegister: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.nice_blue
  },
  textRegisterButton: {
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(12),
    color: Colors.nice_blue
  }
})
