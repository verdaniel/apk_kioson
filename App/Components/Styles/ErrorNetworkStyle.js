import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/index';
import { moderateScale } from '../../Transforms/Scaling';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(14)
  },
  text: {
    marginLeft: moderateScale(10),
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two
  }
})
