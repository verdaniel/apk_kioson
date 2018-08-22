import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    marginTop: ratioHeight(6),
    backgroundColor: Colors.white_two
  },
  dropDown: {
    position: 'absolute',
    maxHeight: ratioHeight(Metrics.screenHeight / 2),
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
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  }
})
