import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    backgroundColor: Colors.white_two,
    paddingBottom: ratioHeight(10)
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
