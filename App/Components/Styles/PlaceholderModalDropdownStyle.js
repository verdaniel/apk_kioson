import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Transforms/Scaling'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexRowOne: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
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
    borderBottomWidth: 0.5,
    paddingBottom: ratioHeight(6),
    borderBottomColor: Colors.black_15
  },
  textBoldSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  flexRowTwoDropDown: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: ratioWidth(11),
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black_15,
    marginTop: ratioWidth(3)
  },
  textDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    flex: 1,
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    paddingLeft: ratioWidth(10)
  },
  dropdown_2_dropdown: {
    marginTop: ratioHeight(5),
    maxHeight: ratioHeight(Metrics.screenHeight / 3),
    borderRadius: 3,
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  separator: {
    marginHorizontal: ratioWidth(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  textList: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  }
})
