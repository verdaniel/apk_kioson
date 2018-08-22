import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/index'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  flexRowFlatCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(13),
    paddingHorizontal: ratioWidth(10),
    borderRadius: 3
  },
  textRegularSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  image: {
    height: moderateScale(16),
    width: moderateScale(16),
    resizeMode: 'contain'
  }
})
