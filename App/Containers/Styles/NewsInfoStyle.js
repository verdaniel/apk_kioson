import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: moderateScale(10)
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.white_two,
    height: ratioHeight(75),
    padding: moderateScale(15)
  },
  textTitle: {
    // fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(19),
    color: Colors.slate_grey
  },
  textContent: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    lineHeight: moderateScale(14),
    color: Colors.slate_grey
  },
  textDate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.greyish,
    marginTop: moderateScale(10),
    lineHeight: moderateScale(14)
  },
  indicatorSelect: {
    height: ratioWidth(11),
    width: ratioWidth(11)
  },
  selectContainer: {
    backgroundColor: Colors.white_two,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectCancel: {
    color: Colors.greyish,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold
  },
  selectAll: {
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold
  },
  selectedContainer: {
    backgroundColor: Colors.white_two,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedText: {
    color: Colors.greyish,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.robotoRegular
  },
  selectedMark: {
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold
  }
})
