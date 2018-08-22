import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  viewHeader: {
    flexDirection: 'row',
    height: ratioHeight(50),
    alignItems: 'center',
    backgroundColor: Colors.white_two,
    elevation: moderateScale(2),
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  textSearch: {
    flex: 1,
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    textAlign: 'center'
  },
  viewContent: {
    flex: 1,
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(15),
    paddingVertical: ratioWidth(10)
  },
  textFilter: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  separator: {
    backgroundColor: Colors.black_15,
    height: ratioHeight(0.5),
    marginTop: ratioHeight(9)
  },
  viewDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ratioHeight(43),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    borderRadius: 3,
    borderColor: Colors.black_15,
    borderWidth: 0.5
  },
  textInputDate: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  dropDown: {
    position: 'absolute',
    width: ratioWidth(330),
    right: ratioWidth(15),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  },
  viewBottom: {
    width: Metrics.screenWidth,
    paddingLeft: ratioWidth(25),
    paddingRight: ratioWidth(25),
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: ratioHeight(558)
  },
  btnClear: {
    width: ratioWidth(150),
    height: ratioHeight(42),
    backgroundColor: Colors.nice_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3)
  },
  textClear: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    textAlign: 'center'
  },
  btnCari: {
    width: ratioWidth(150),
    height: ratioHeight(42),
    backgroundColor: Colors.squash,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3)
  },
  textCari: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    textAlign: 'center'
  },
  viewTextInput: {
    height: ratioHeight(43),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    borderRadius: 3,
    borderColor: Colors.black_15,
    borderWidth: 0.5
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  }
})
