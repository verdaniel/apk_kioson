import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling';
import { ratioHeight } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  formDataUser: {
    backgroundColor: Colors.white_two,
    paddingHorizontal: moderateScale(25),
    paddingTop: moderateScale(18),
    marginBottom: moderateScale(15)
  },
  regularLarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  flexColumn: {
    paddingBottom: moderateScale(9)
  },
  regularSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.slate_grey
  },
  flexRowTwo: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(8)
  },
  iconSquare: {
    height: moderateScale(16),
    width: moderateScale(16)
  },
  modal: {
    borderRadius: 3,
    height: ratioHeight(223),
    width: moderateScale(320),
    backgroundColor: Colors.white_two,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    justifyContent: 'space-around'
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  ProductSansBoldFixed: {
    paddingVertical: moderateScale(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  containerBlueCol: {
    backgroundColor: Colors.nice_blue,
    paddingVertical: moderateScale(8),
    marginTop: moderateScale(10),
    alignItems: 'center'
  },
  productSansRegular: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(25),
    paddingHorizontal: moderateScale(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  robotoRegSlateModalMod: {
    fontFamily: Fonts.type.robotoLight,
    color: Colors.slate_grey,
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  robotoMedGreyMod: {
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.greyish,
    fontSize: moderateScale(12),
    textAlign: 'center'
  },
  flexOneRowModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonModal: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.greyish,
    bottom: moderateScale(-10)
  },
  buttonModalOtp: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.greyish
  },
  buttonModalOtpACtive: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  buttonModalResendOtp: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.white_two,
    borderColor: Colors.nice_blue,
    borderWidth: 1
  },
  buttonModalResendOtpActiv: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  ProductSansBoldResendOtp: {
    paddingVertical: moderateScale(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  ProductSansBoldResendOtpActiv: {
    paddingVertical: moderateScale(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  buttonModalActive: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: moderateScale(-10)
  },
  ProductSansBoldFixedSingle: {
    paddingVertical: moderateScale(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyish,
    marginHorizontal: moderateScale(60)
  },
  borderBottomError: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.red,
    marginHorizontal: moderateScale(60)
  },
  inputTextModal: {
    textAlign: 'center',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingBottom: moderateScale(3)
  },
  inputTextModalError: {
    textAlign: 'center',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.red,
    paddingBottom: moderateScale(3)
  },
  erroMessage: {},
  erroMessageActive: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red,
    textAlign: 'center',
    marginTop: moderateScale(2)
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputTextOTP: {
    width: moderateScale(30),
    marginRight: moderateScale(5),
    marginLeft: moderateScale(5),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    textAlign: 'center',
    paddingBottom: moderateScale(6),
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyish
  },
})
