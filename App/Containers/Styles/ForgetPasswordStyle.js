import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash
  },
  boxContainer: {
    margin: moderateScale(15),
    marginTop: moderateScale(15),
    padding: moderateScale(15),
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(5)
  },
  passwordContainer: {
    flexDirection: 'row',
    marginTop: ratioHeight(10),
    flex: 1
  },
  showPasswordContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16),
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: ratioHeight(30)
  },
  buttonOTP: {
    flex: 1,
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5)
  },
  textOTP: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16)
  },
  inputContainer: {
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'center',
    margin: moderateScale(5),
    marginTop: 0,
    flex: 1
  },
  inputTextOTP: {
    width: ratioWidth(30),
    height: ratioHeight(65),
    marginRight: ratioWidth(5),
    marginLeft: ratioWidth(5),
    marginBottom: ratioWidth(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(30),
    color: Colors.slate_grey,
    letterSpacing: moderateScale(20),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15
  },
  textHelp: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: 12,
    letterSpacing: 0,
    color: Colors.nice_blue
  },
  registerContainer: {
    position: 'relative',
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    height: ratioHeight(36),
    width: Metrics.screenWidth,
    flexDirection: 'row',
    borderTopColor: Colors.greyish,
    borderTopWidth: moderateScale(1)
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
  }
})
