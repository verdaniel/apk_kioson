import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  modal: {
    borderRadius: 3,
    height: ratioHeight(150),
    width: ratioWidth(320),
    justifyContent: 'space-around',
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10)
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue
  },
  flexOneRowModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  ProductSansBoldFixed: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  containerBlueCol: {
    backgroundColor: Colors.nice_blue,
    paddingVertical: ratioHeight(8),
    marginTop: ratioHeight(10),
    alignItems: 'center'
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoLight,
    color: Colors.slate_grey,
    fontSize: moderateScale(14),
    textAlign: 'center'
  }
})
