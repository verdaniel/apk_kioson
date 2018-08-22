import {StyleSheet} from 'react-native'
import {Fonts, Colors} from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexRowFlatCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  form: {
    backgroundColor: Colors.white_two,
    paddingBottom: ratioHeight(10)
  },
  iconRectangle: {
    height: ratioHeight(15),
    width: ratioWidth(15),
    marginRight: ratioWidth(11)
  },
  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingVertical: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  textFieldPriceDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginRight: ratioWidth(10)
  },
  textList: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingVertical: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
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
