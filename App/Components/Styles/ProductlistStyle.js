import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  absoluteView: {
    backgroundColor: Colors.squash,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: ratioHeight(40)
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  listStyle: {
    marginTop: ratioHeight(-5),
    flexDirection: 'row',
    flex: 1
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(5)
  },
  imageLogo: {
    height: ratioHeight(150),
    width: ratioHeight(150)
  },
  maskedList: {
    backgroundColor: Colors.white_two,
    flex: 1,
    flexDirection: 'column',
    padding: moderateScale(10),
    borderRightWidth: 0.5,
    borderRightColor: Colors.black_15
  },
  imageDiscount: {
    height: ratioHeight(24),
    width: ratioWidth(42.8),
    justifyContent: 'center'
  },
  imageFilter: {
    height: ratioHeight(21),
    width: ratioWidth(14),
    marginRight: ratioWidth(15)
  },
  textDiscount: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.white_two,
    textAlign: 'right',
    paddingRight: ratioWidth(5.5),
    paddingBottom: ratioHeight(2.5)
  },
  emptyStock: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'center',
    paddingVertical: ratioHeight(8),
    paddingHorizontal: ratioWidth(10)
  },
  textProduct: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    flex: 1
  },
  textPrice: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(16),
    color: Colors.nice_blue
  },
  textLabelDiscount: {
    textDecorationLine: 'line-through',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    textAlignVertical: 'center'
  },
  maskedLabelProduct: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  placeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ratioHeight(15),
    backgroundColor: Colors.white_two,
    elevation: 3
  },
  modalFix: {
    paddingHorizontal: ratioWidth(15),
    height: ratioHeight(43 * 7.2),
    backgroundColor: Colors.white_two,
    bottom: ratioHeight(50),
    elevation: 3
  },
  listFilter: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: ratioWidth(14)
  },
  textFilter: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    flex: 1
  },
  labelEmpty: {
    backgroundColor: Colors.red,
    borderRadius: 3,
    position: 'absolute'
  }
})
