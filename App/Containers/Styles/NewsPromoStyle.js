import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewItem: {
    backgroundColor: Colors.white_two
  },
  viewClock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: ratioHeight(12),
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  viewTitle: {
    flexDirection: 'row',
    paddingTop: ratioHeight(10),
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    paddingBottom: ratioHeight(10),
    alignItems: 'center'
  },
  textDate: {
    marginLeft: ratioWidth(5),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(10),
    color: Colors.greyish
  },
  textTitle: {
    // fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textContent: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  btnRead: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ratioHeight(24),
    width: ratioWidth(64),
    borderRadius: moderateScale(3),
    borderWidth: 1,
    borderColor: Colors.squash
    // backgroundColor: Colors.squash
  },
  textRead: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(10),
    color: Colors.squash
  },
  indicatorSelect: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(15)
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
  selectMarked: {
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold
  }
})
