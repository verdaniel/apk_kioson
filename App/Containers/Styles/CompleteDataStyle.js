import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewCollapse: {
    backgroundColor: Colors.white_two,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.black_15
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  textTitle: {
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular
  },
  btnExpand: {
    height: ratioWidth(20),
    width: ratioWidth(20)
  },
  textSubTitle: {
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    fontSize: moderateScale(13),
    color: Colors.nice_blue,
    fontFamily: Fonts.type.robotoMedium
  },
  formInput: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    marginTop: ratioHeight(10),
    borderRadius: moderateScale(3),
    borderColor: Colors.black_15,
    borderWidth: moderateScale(0.5),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  input: {
    borderWidth: 0,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular
  },
  buttonTextInput: {
    position: 'absolute',
    height: ratioHeight(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: Metrics.screenWidth - ratioWidth(55),
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  imgRight: {
    height: ratioWidth(16),
    width: ratioWidth(16)
  },
  viewModal: {
    flex: 1,
    backgroundColor: Colors.black_35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewAllCalender: {
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white_two,
    height: ratioHeight(408),
    width: ratioWidth(320)
  },
  headerCalendar: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(16),
    color: Colors.nice_blue,
    marginTop: ratioHeight(12),
    textAlign: 'center'
  },
  separator: {
    height: 2,
    backgroundColor: Colors.nice_blue,
    marginTop: ratioHeight(11),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  viewCalendar: {
    height: ratioHeight(290),
    width: ratioWidth(320)
  },
  calendar: {
    flex: 1,
    borderRadius: moderateScale(3)
  },
  buttonCalendar: {
    backgroundColor: Colors.nice_blue,
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    height: ratioHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3)
  },
  textCalendar: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.white_two
  },
  dropDown: {
    position: 'absolute',
    // height: ratioHeight(200),
    width: ratioWidth(320),
    right: ratioWidth(21),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  haveMarket: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textHaveMarket: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12)
  },
  btnNext: {
    position: 'absolute',
    height: ratioHeight(32),
    alignSelf: 'center',
    width: ratioWidth(320),
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNext: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: Colors.white_two
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  titleTextInput: {
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  imageMarket: {
    alignSelf: 'center',
    width: ratioWidth(260),
    height: ratioHeight(146)
  },
  imageDesc: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(11),
    color: Colors.slate_grey,
    marginTop: ratioHeight(11)
  },
  btnChangeImage: {
    height: ratioHeight(32),
    width: ratioWidth(115),
    marginRight: ratioWidth(15),
    alignSelf: 'flex-end',
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Colors.squash,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtnChangeImage: {
    fontFamily: Fonts.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.squash,
    textAlign: 'center'
  },
  map: {
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(25),
    marginRight: ratioWidth(25),
    height: ratioHeight(81),
    width: ratioWidth(300)
  },
  separatorView: {
    height: ratioHeight(2),
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    backgroundColor: Colors.black_15
  },
  btnVerification: {
    position: 'absolute',
    bottom: ratioHeight(15),
    width: ratioWidth(320),
    height: ratioHeight(43),
    alignSelf: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7)
  },
  viewSuccess: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    backgroundColor: Colors.black_35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalSuccess: {
    width: ratioWidth(320),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white_two,
    padding: moderateScale(10),
    justifyContent: 'center'
  },
  textSuccess: {
    marginTop: ratioHeight(5),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue,
    textAlign: 'center'
  },
  successDesc: {
    marginTop: ratioHeight(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    textAlign: 'center'
  },
  btnNextSuccess: {
    height: ratioHeight(32),
    marginTop: ratioHeight(25),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNextSuccess: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'center'
  },
  textInfo: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    marginLeft: ratioWidth(10)
  }
})
