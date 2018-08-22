import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    marginTop: ratioHeight(10),
    marginBottom: ratioHeight(10),
    backgroundColor: Colors.white_two
  },
  borderBottom: {
    marginHorizontal: ratioWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  borderTop: {
    backgroundColor: Colors.white_two,
    borderTopWidth: 1,
    borderTopColor: Colors.black_15
  },
  bottom: {
    backgroundColor: Colors.white_two
  },
  textRegularLarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(7)
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: ratioHeight(7)
  },
  textRegularMed: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  textMediumHeader: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  textMedium: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue,
    paddingVertical: ratioHeight(8)
  },
  header: {
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    marginHorizontal: ratioWidth(10),
    marginTop: ratioHeight(10)
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
  }
})
