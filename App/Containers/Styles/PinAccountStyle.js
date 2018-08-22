import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale, verticalScale, scale } from '../../Transforms/Scaling';
import { ratioWidth, ratioHeight } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  flexOneRow: {
    marginVertical: ratioHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white_two
  },
  image: {
    width: ratioWidth(51),
    height: ratioHeight(51),
    marginLeft: ratioWidth(15),
    marginVertical: ratioHeight(13)
  },
  flexColMenu: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    marginLeft: ratioWidth(15)
  },
  flexRowMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ratioHeight(18)
  },
  robotoRegBigSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  robotoMedGrey: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(16),
    color: Colors.greyish
  },
  imageArrow: {
    width: ratioWidth(7),
    height: ratioHeight(12)
  },
  viewWarning: {
    marginHorizontal: ratioWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.greyish,
    borderRadius: 3
  },
  robotoRegSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two
  },
  robotoRegLarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    flex: 1
  },
  menu: {
    paddingHorizontal: ratioWidth(15),
    paddingVertical: ratioHeight(18),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white_two,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.black_35,
    justifyContent: 'center',
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
  productSansRegular: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two
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
  robotoRegSlateModalMod: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    paddingTop: ratioHeight(15),
    paddingHorizontal: ratioHeight(50),
    fontSize: moderateScale(14),
    textAlign: 'center'
  },
  flexOneRowModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonModal: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    bottom: ratioHeight(0)
  },
  ProductSansBoldFixedSingle: {
    paddingVertical: ratioHeight(8),
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
})
