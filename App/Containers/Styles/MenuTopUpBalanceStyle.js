import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  icon: {
    height: moderateScale(19),
    width: moderateScale(24)
  },
  flexRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white_two,
    paddingLeft: moderateScale(15),
    paddingTop: moderateScale(7),
    paddingBottom: moderateScale(7),
    marginBottom: moderateScale(6)
  },
  textBoldMedium: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: moderateScale(10)
  },
  textRegularMedium: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    marginLeft: moderateScale(7)
  },
  modal: {
    borderRadius: 3,
    height: ratioHeight(150),
    width: ratioWidth(320),
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(10)
  },
  robotoMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.nice_blue,
    marginTop: ratioHeight(5)
  },
  robotoRegSlateModal: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: ratioHeight(15),
    paddingBottom: ratioHeight(25),
    paddingHorizontal: ratioWidth(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
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
  }
})
