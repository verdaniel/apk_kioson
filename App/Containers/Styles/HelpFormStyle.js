import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  modalFix: {
    borderRadius: 3,
    height: ratioHeight(314),
    width: ratioWidth(320),
    marginTop: ratioHeight(-Metrics.navBarHeight),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textmodal: {
    paddingHorizontal: ratioWidth(34),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    textAlign: 'center'
  },
  buttonModal: {
    width: ratioWidth(300),
    marginHorizontal: ratioWidth(10),
    backgroundColor: Colors.nice_blue,
    borderRadius: 3
  },
  textButtonmodal: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    textAlign: 'center',
    paddingVertical: ratioHeight(8)
  },
  images: {
    marginTop: ratioHeight(30),
    height: ratioHeight(144),
    width: ratioWidth(203)
  },
  form: {
    marginTop: ratioHeight(10),
    paddingHorizontal: ratioWidth(15),
    backgroundColor: Colors.white_two
  },
  maskedTextInput: {
    borderBottomColor: Colors.black_15,
    borderBottomWidth: 0.5,
    paddingTop: ratioHeight(12)
  },
  maskedTextInputCustom: {
    paddingTop: ratioHeight(9),
    paddingBottom: ratioHeight(15)
  },
  maskedTextInputCustomError: {
    borderBottomColor: Colors.red,
    borderBottomWidth: 0.5,
    paddingTop: ratioHeight(9),
    paddingBottom: ratioHeight(15),
    marginBottom: ratioHeight(19)
  },
  maskedTextInputError: {
    borderBottomColor: Colors.red,
    borderBottomWidth: 0.5,
    paddingTop: ratioHeight(12)
  },
  lableText: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  error: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    textAlign: 'right',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
  errorCustom: {
    position: 'absolute',
    bottom: 3,
    right: 15,
    flex: 1,
    textAlign: 'right',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
  textInput: {
    flex: 1,
    marginLeft: ratioWidth(10),
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(5),
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.slate_grey
  },
  button: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.nice_blue,
    borderRadius: 3
  },
  labelButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.nice_blue,
    textAlign: 'center',
    paddingVertical: ratioHeight(9),
    paddingHorizontal: ratioWidth(30)
  }
})
