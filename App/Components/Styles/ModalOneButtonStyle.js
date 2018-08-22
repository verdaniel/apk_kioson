import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  modalFix: {
    borderRadius: 3,
    height: ratioHeight(175),
    width: ratioWidth(320),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10),
    justifyContent: 'space-around'
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue
  },
  robotoRegSlateModalMod: {
    fontFamily: Fonts.type.robotoLight,
    color: Colors.slate_grey,
    fontSize: moderateScale(14),
    textAlign: 'center',
    paddingVertical: ratioHeight(10)
  },
  buttonModal: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: ratioHeight(0)
  },
  textButton: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  }
})
