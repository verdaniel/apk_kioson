import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  icon: {
    height: moderateScale(18),
    width: moderateScale(24)
  },
  flexRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white_two,
    paddingLeft: moderateScale(15),
    paddingTop: moderateScale(7),
    paddingBottom: moderateScale(7)
  },
  textBoldMedium: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: moderateScale(10)
  },
  textRegularMedium: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: moderateScale(7)
  },
  flexRowFlatCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  textBoldSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
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
  form: {
    marginTop: ratioHeight(6),
    backgroundColor: Colors.white_two
  },
  iconRectangle: {
    height: moderateScale(15),
    width: moderateScale(46),
    marginRight: moderateScale(11)
  },
  iconSquare: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: 5
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
  flexRowTwo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: moderateScale(11)
  },
  flexColumn: {
    flex: 1,
    marginLeft: moderateScale(15)
  },
  flexRowTwoDropDown: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: moderateScale(11),
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black_15,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5)
  },
  textDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    flex: 1,
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(8),
    paddingLeft: moderateScale(10)
  },
  textRegularSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.greyish
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(12),
    textAlign: 'center'
  },
  mark: {
    width: moderateScale(12),
    height: moderateScale(12),
    backgroundColor: Colors.greyish,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMark: {
    color: Colors.white,
    fontSize: moderateScale(9)
  },
  button: {
    position: 'absolute',
    top: Metrics.screenHeight - moderateScale(Metrics.navBarHeight) - moderateScale(80),
    width: Metrics.screenWidth - 60,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 6,
    backgroundColor: Colors.greyish
  },
  buttonActive: {
    position: 'absolute',
    top: Metrics.screenHeight - moderateScale(Metrics.navBarHeight) - moderateScale(80),
    width: Metrics.screenWidth - 60,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 6,
    backgroundColor: Colors.nice_blue
  },
  erroMessage: {
  },
  erroMessageActive: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(10),
    color: Colors.red,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(2)
  },
  flexRowDropDown: {
    position: 'absolute',
    width: moderateScale(250),
    top: 0,
    left: 48,
    borderRadius: 3,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  textFieldPriceDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    paddingTop: moderateScale(7),
    paddingBottom: moderateScale(7)
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropDown: {
    position: 'absolute',
    maxHeight: ratioHeight(Metrics.screenHeight / 2),
    width: ratioWidth(320),
    right: ratioWidth(10),
    borderRadius: 3,
    paddingHorizontal: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  modalSort: {
    backgroundColor: Colors.white_two,
    elevation: 5,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
