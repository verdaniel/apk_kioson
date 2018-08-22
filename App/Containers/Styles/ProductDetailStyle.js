import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  maskedLabelProduct: {
    paddingTop: ratioHeight(15),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textProduct: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(20),
    color: Colors.slate_grey,
    flex: 1
  },
  textPrice: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(20),
    color: Colors.nice_blue
  },
  textLabelDiscount: {
    textDecorationLine: 'line-through',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    textAlignVertical: 'center'
  },
  textDiscount: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'right',
    paddingRight: ratioWidth(5.5),
    paddingBottom: ratioHeight(2.5)
  },
  imageDiscount: {
    height: ratioHeight(32),
    width: ratioWidth(58),
    justifyContent: 'center'
  },
  flexDetail: {
    elevation: 1,
    flex: 1,
    padding: ratioWidth(15),
    justifyContent: 'flex-end',
    marginBottom: ratioHeight(14),
    backgroundColor: Colors.white_two
  },
  flexAll: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSlider: {
    height: ratioHeight(280),
    width: ratioWidth(280)
  },
  paginationStyle: {
    borderRadius: moderateScale(3),
    backgroundColor: Colors.black_35,
    position: 'absolute',
    bottom: ratioHeight(15),
    left: ratioWidth(0)
  },
  paginationText: {
    color: Colors.white_two,
    fontSize: moderateScale(10),
    fontFamily: Fonts.type.robotoRegular,
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(7)
  },
  paginationTextNormal: {
    color: Colors.white_two,
    fontSize: moderateScale(10),
    fontFamily: Fonts.type.robotoRegular
  }

})
