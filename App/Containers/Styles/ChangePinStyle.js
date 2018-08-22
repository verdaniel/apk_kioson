import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale, verticalScale, scale } from '../../Transforms/Scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    marginTop: moderateScale(6),
    backgroundColor: Colors.white_two
  },
  flexRowOne: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    marginTop: moderateScale(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexRowOneError: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    marginTop: moderateScale(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconSquare: {
    height: moderateScale(16),
    width: moderateScale(16)
  },
  flexColumn: {
    flex: 1,
    marginLeft: moderateScale(15)
  },
  textBoldSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12, 0.2),
    color: Colors.slate_grey
  },
  flexRowTwo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: moderateScale(11)
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(11),
    marginLeft: moderateScale(10)
  },
  inputTextError: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.red,
    fontSize: moderateScale(16),
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(11),
    marginLeft: moderateScale(10)
  },
  fotter: {
    backgroundColor: Colors.white_two,
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15)
  },
  textfotter: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.greyish
  },
  button: {
    position: 'absolute',
    top: Metrics.screenHeight - moderateScale(Metrics.navBarHeight) - moderateScale(80),
    width: Metrics.screenWidth - verticalScale(25) - verticalScale(25),
    marginHorizontal: verticalScale(25),
    borderRadius: 3,
    backgroundColor: Colors.greyish
  },
  buttonActive: {
    position: 'absolute',
    top: Metrics.screenHeight - moderateScale(Metrics.navBarHeight) - moderateScale(80),
    width: Metrics.screenWidth - verticalScale(25) - verticalScale(25),
    marginHorizontal: verticalScale(25),
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    paddingVertical: moderateScale(12),
    textAlign: 'center'
  },
  erroMessage: {},
  erroMessageActive: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(10),
    color: Colors.red,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(2)
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.black_35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    height: moderateScale(150),
    width: moderateScale(320),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    backgroundColor: Colors.white_two,
    borderRadius: 3
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue,
    marginTop: moderateScale(5)
  },
  robotoRegSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.slate_grey,
    paddingVertical: moderateScale(23)
  },
  buttonModal: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: moderateScale(10)
  },
  ProductSansBoldFixed: {
    paddingVertical: moderateScale(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: moderateScale(28),
    paddingBottom: moderateScale(28),
    paddingHorizontal: moderateScale(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
})
