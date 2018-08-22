import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  flexBigColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ratioHeight(15)
  },
  maskedLogo: {
    marginTop: ratioHeight(15),
    marginBottom: ratioHeight(15),
    padding: moderateScale(13),
    borderWidth: 1,
    borderColor: Colors.nice_blue,
    borderRadius: 3
  },
  iconSquareMedium: {
    height: ratioHeight(35),
    width: ratioWidth(35)
  },
  robotoMediumBlue: {
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoRegularSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  robotoBoldSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
})
