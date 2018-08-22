import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash,
    flexDirection: 'column'
  },
  registerContainer: {
    position: 'relative',
    borderTopColor: Colors.black_15,
    borderTopWidth: ratioHeight(1),
    bottom: 0,
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
  titleContainer: {
    marginTop: ratioHeight(56),
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  logo: {
    width: moderateScale(125),
    height: moderateScale(31.6),
    marginBottom: ratioHeight(50)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.snow
  },
  formContainer: {
    alignSelf: 'center',
    marginTop: ratioHeight(20),
    marginBottom: ratioHeight(20),
    padding: moderateScale(15),
    paddingBottom: moderateScale(10),
    width: ratioWidth(330),
    borderRadius: moderateScale(6),
    backgroundColor: Colors.white_two
  },
  inputContainer: {
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  buttonOTP: {
    height: ratioHeight(50),
    marginTop: ratioHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6)
  },
  textOTP: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  inputTextOTP: {
    width: ratioWidth(30),
    height: ratioHeight(65),
    marginRight: ratioWidth(5),
    marginLeft: ratioWidth(5),
    marginBottom: ratioHeight(20),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(30),
    color: Colors.slate_grey,
    letterSpacing: moderateScale(20),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15
  },
  buttonSignIn: {
    height: ratioHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.greyish
  },
  textSignIn: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.nice_blue
  },
  textHelp: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    marginTop: ratioHeight(20),
    color: Colors.nice_blue
  },
  textLabel: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    marginTop: ratioHeight(-5),
    color: Colors.nice_blue
  },
  textRequest: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    marginTop: ratioHeight(5),
    marginBottom: ratioHeight(-10),
    alignSelf: 'center',
    color: Colors.greyish
  },
  buttonSignOff: {
    height: ratioHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.nice_blue
  },
  buttonSignOff2: {
    height: ratioHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    backgroundColor: Colors.greyish
  }
})
