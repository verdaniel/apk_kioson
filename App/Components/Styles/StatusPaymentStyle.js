import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    paddingBottom: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  statusBox: {
    paddingVertical: ratioHeight(9),
    marginTop: ratioHeight(10),
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black_15
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ratioWidth(10)
  },
  robotoRegularMedSquas: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(24),
    color: Colors.squash
  },
  sparator: {
    width: ratioWidth(1),
    height: ratioHeight(35),
    backgroundColor: Colors.black_15,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  robotoRegularMedLeft: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.greyish,
    textAlign: 'left'
  },
  robotoRegularMedCenter: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white_two,
    fontSize: moderateScale(24),
    textAlign: 'center'
  },
  iconSquareSmall: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  productSansBoldMed: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginLeft: ratioWidth(10)
  }
})
