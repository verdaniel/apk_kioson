import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale, verticalScale, scale } from '../../Transforms/Scaling';
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    marginTop: ratioHeight(6),
    backgroundColor: Colors.white_two
  },
  flexRowOne: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    marginTop: ratioHeight(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexRowOneError: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    marginTop: ratioHeight(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  flexColumn: {
    flex: 1,
    marginLeft: ratioWidth(15)
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
    paddingRight: ratioWidth(11)
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(11),
    marginLeft: ratioWidth(10)
  },
  inputTextError: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.red,
    fontSize: moderateScale(16),
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(11),
    marginLeft: ratioWidth(10)
  },
  fotter: {
    backgroundColor: Colors.nice_blue10,
    marginTop: ratioHeight(10),
    paddingVertical: ratioHeight(10),
    paddingHorizontal: ratioWidth(15)
  },
  textfotter: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.slate_grey
  },
  button: {
    position: 'absolute',
    top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(75),
    width: Metrics.screenWidth - ratioWidth(25) - ratioWidth(25),
    marginHorizontal: ratioWidth(25),
    borderRadius: 3,
    backgroundColor: Colors.greyish
  },
  buttonActive: {
    position: 'absolute',
    top: Metrics.screenHeight - ratioHeight(Metrics.navBarHeight) - ratioHeight(75),
    width: Metrics.screenWidth - ratioWidth(25) - verticalScale(25),
    marginHorizontal: ratioWidth(25),
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    paddingVertical: ratioHeight(12),
    textAlign: 'center'
  },
  erroMessage: {},
  erroMessageActive: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(10),
    color: Colors.red,
    marginLeft: ratioWidth(10),
    marginTop: ratioHeight(2)
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.black_35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    height: ratioHeight(150),
    width: ratioWidth(320),
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10),
    backgroundColor: Colors.white_two,
    borderRadius: 3
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue,
    marginTop: ratioHeight(5)
  },
  robotoRegSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.slate_grey,
    paddingVertical: ratioHeight(23)
  },
  buttonModal: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: ratioHeight(10)
  },
  ProductSansBoldFixed: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: ratioHeight(15),
    paddingBottom: ratioHeight(25),
    paddingHorizontal: ratioWidth(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
})
