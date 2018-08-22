import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash
  },
  titleContainer: {
    marginTop: moderateScale(50),
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  logo: {
    width: ratioWidth(155),
    height: ratioHeight(35),
    resizeMode: 'contain'
  },
  textHelp: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    marginTop: moderateScale(20),
    color: Colors.nice_blue
  },
  formContainer: {
    alignSelf: 'center',
    marginTop: moderateScale(55),
    marginBottom: moderateScale(10),
    padding: moderateScale(15),
    width: ratioWidth(330),
    borderRadius: moderateScale(6),
    backgroundColor: Colors.white_two
  },
  label: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(11),
    color: Colors.slate_grey
  },
  inputContainer: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.slate_grey,
    flexDirection: 'row',
    marginBottom: moderateScale(10)
  },
  inputText: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
    marginTop: moderateScale(22),
    paddingTop: moderateScale(-10),
    paddingBottom: moderateScale(-10)
  },
  notificationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notification: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  textTerm: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.squash
  },
  registerContainer: {
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
  },
  buttonSignInOff: {
    height: ratioHeight(50),
    marginTop: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.greyish
  },
  buttonSignIn: {
    height: ratioHeight(50),
    marginTop: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.nice_blue
  },
  textButton: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.snow
  },
  textError: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16),
    marginLeft: 10
  },
  passwordContainer: {
    flexDirection: 'row',
    marginTop: ratioHeight(10),
    flex: 1
  },
  buttonPassword: {
    position: 'absolute',
    height: ratioHeight(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: -15,
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  buttonDate: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    padding: moderateScale(10),
    alignItems: 'center',
    marginBottom: ratioHeight(10)
  },
  buttonTextInput: {
    position: 'absolute',
    height: ratioHeight(30),
    bottom: ratioHeight(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: Metrics.screenWidth - ratioWidth(75),
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  imgRight: {
    height: ratioWidth(16),
    width: ratioWidth(16),
    resizeMode: 'contain'
  },
  buttonRefContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10)
  },
  referalContainer: {
    flex: 1,
    marginBottom: moderateScale(10),
    paddingLeft: moderateScale(10),
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Colors.black_15,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  }
})
