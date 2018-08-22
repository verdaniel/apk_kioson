import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics} from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexRowFlatCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  textBoldSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12, 0.2),
    color: Colors.slate_grey
  },
  form: {
    backgroundColor: Colors.white_two,
    paddingBottom: ratioHeight(10)
  },
  iconRectangle: {
    height: ratioHeight(15),
    width: ratioWidth(46),
    marginRight: ratioWidth(11)
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
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7)
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropDown: {
    position: 'absolute',
    maxHeight: ratioHeight(140),
    width: ratioWidth(Metrics.screenWidth),
    right: ratioWidth(10),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  textList: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  }
})
