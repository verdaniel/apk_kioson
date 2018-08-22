import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    marginTop: ratioHeight(6),
    backgroundColor: Colors.white_two
  },
  fotter: {
    backgroundColor: Colors.nice_blue10,
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    paddingVertical: ratioHeight(14),
    paddingHorizontal: ratioWidth(10),
    borderRadius: moderateScale(3)
  },
  textfotter: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.small),
    color: Colors.slate_grey
  }
})
