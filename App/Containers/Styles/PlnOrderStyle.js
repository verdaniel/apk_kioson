import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewDetail: {
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white_two,
    marginLeft: ratioWidth(10),
    marginTop: ratioHeight(10),
    marginRight: ratioWidth(10),
    paddingTop: ratioHeight(10),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  viewSeparator: {
    height: ratioHeight(0.5)
  },
  textLabel: {
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14)
  },
  textDetail: {
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    textAlign: 'right',
    color: Colors.greyish
  },
  viewCode: {
    marginTop: ratioHeight(10),
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    paddingTop: ratioHeight(10),
    paddingBottom: ratioHeight(10),
    backgroundColor: Colors.white_two,
    alignItems: 'center'
  },
  viewTotal: {
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    backgroundColor: Colors.white_two,
    alignItems: 'center'
  },
  textCashBack: {
    marginTop: ratioHeight(2),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10)
  },
  btnUse: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    width: ratioWidth(99),
    height: ratioHeight(32),
    marginLeft: ratioWidth(19)
  },
  textUse: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  textInput: {
    padding: moderateScale(7),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textCode: {
    marginTop: ratioHeight(2),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.nice_blue
  },
  textTotal: {
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  btnPay: {
    position: 'absolute',
    top: ratioHeight(508),
    alignSelf: 'center',
    height: ratioHeight(43),
    width: ratioWidth(310),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPay: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  }
})
