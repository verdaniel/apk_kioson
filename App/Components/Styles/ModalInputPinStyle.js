import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  modalFix: {
    borderRadius: 3,
    height: ratioHeight(150),
    width: ratioWidth(320),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10),
    justifyContent: 'space-around'
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue
  },
  robotoRegSlateModalMod: {
    fontFamily: Fonts.type.robotoLight,
    color: Colors.slate_grey,
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  buttonModal: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.greyish,
    bottom: ratioHeight(0)
  },
  buttonModalActive: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: ratioHeight(0)
  },
  textButton: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  flexRowTwo: {
    flexDirection: 'row'
  },
  inputText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    padding: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  inputTextError: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.red
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyish,
    marginHorizontal: ratioWidth(15)
  },
  borderBottomError: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.red,
    marginHorizontal: ratioWidth(15)
  },
  inputTextModal: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingBottom: ratioHeight(3)
  },
  inputTextModalError: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.red,
    paddingBottom: ratioHeight(3)
  },
  erroMessage: {},
  erroMessageActive: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red,
    marginTop: ratioHeight(2),
    marginHorizontal: ratioWidth(15)
  },
  buttonTextInput: {
    position: 'absolute',
    width: ratioWidth(16),
    bottom: ratioHeight(10),
    right: ratioWidth(0)
  }
})
