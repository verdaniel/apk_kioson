import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: ratioHeight(7)
  },
  textRegularMed: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  textRegularMedSquas: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.squash
  },
  textMediumHeader: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  header: {
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    marginHorizontal: ratioWidth(10),
    marginTop: ratioHeight(10)
  },
  borderBottom: {
    marginHorizontal: ratioWidth(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  textRegularLarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(7)
  },
  footer: {
    backgroundColor: Colors.white_two
  },
  headerIndside: {
    paddingTop: ratioHeight(13),
    paddingBottom: ratioHeight(8),
    marginHorizontal: ratioWidth(15)
  },
  flexRowflat: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textRegularMedGrey: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    paddingVertical: ratioHeight(8)
  },
  textMedium: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue,
    paddingVertical: ratioHeight(8)
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
  }
})
