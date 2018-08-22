import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  viewDesc: {
    paddingVertical: ratioHeight(10),
    paddingHorizontal: ratioWidth(15)
  },
  textDate: {
    marginLeft: ratioWidth(5),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  textTitle: {
    // marginTop: ratioHeight(10),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(20),
    color: Colors.slate_grey,
    marginBottom: moderateScale(15)
  },
  textContent: {
    marginTop: ratioHeight(15),
    marginBottom: ratioHeight(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  }
})
