import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  flexBigColumn: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: ratioHeight(15),
    marginHorizontal: ratioWidth(10)
  },
  viewInside: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  header: {
    borderRadius: 3,
    marginTop: ratioHeight(10),
    borderWidth: 0.5,
    borderColor: Colors.black_15,
    paddingBottom: ratioHeight(5)
  },
  borderBottom: {
    marginHorizontal: ratioWidth(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  textRegularLarge: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(10),
    paddingBottom: ratioHeight(9)
  },
  textRegularMedSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
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
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ratioHeight(4)
  }
})
