import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  floating: {
    fontSize: moderateScale(10),
    marginLeft: 0,
    marginTop: 0
  },
  placeholder: {
    fontSize: moderateScale(16),
    marginLeft: ratioWidth(10),
    marginTop: ratioHeight(22)
  },
  viewInput: {
    height: ratioHeight(54),
    marginTop: ratioHeight(12),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  textInput: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    fontSize: moderateScale(16),
    marginLeft: ratioWidth(10),
    marginTop: ratioHeight(22),
    paddingTop: ratioHeight(-10),
    paddingBottom: ratioHeight(-10)
  },
  separator: {
    height: ratioHeight(0.5),
    marginTop: ratioHeight(11)
  },
  alert: {
    color: Colors.red,
    marginTop: ratioHeight(2),
    marginBottom: ratioHeight(10),
    fontSize: moderateScale(10),
    textAlign: 'right'
  }
})
