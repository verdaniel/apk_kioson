import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  viewTanya: {
    position: 'absolute',
    marginVertical: ratioHeight(15),
    right: ratioWidth(15),
    alignSelf: 'flex-end'
  },
  viewSuccess: {
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    height: ratioHeight(55),
    backgroundColor: Colors.squash,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3)
  },
  viewLunas: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: ratioHeight(225),
    width: ratioWidth(360)
  },
  textSuccess: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white_two,
    fontSize: moderateScale(24),
    textAlign: 'center'
  },
  viewPrint: {
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    height: ratioHeight(32),
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.black_15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPrint: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginLeft: ratioWidth(10)
  },
  viewSeparator: {
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    height: ratioHeight(0.5),
    backgroundColor: Colors.black_15
  },
  viewImage: {
    marginTop: ratioHeight(25),
    justifyContent: 'center',
    alignItems: 'center',
    width: ratioWidth(60),
    height: ratioWidth(60),
    borderRadius: moderateScale(3),
    borderColor: Colors.nice_blue,
    borderWidth: moderateScale(1)
  },
  textID: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.nice_blue,
    marginTop: ratioHeight(15),
    textAlign: 'center'
  },
  textProduct: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    textAlign: 'center'
  },
  textCustomerID: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    marginTop: ratioHeight(5),
    textAlign: 'center'
  },
  viewButton: {
    marginTop: ratioHeight(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ratioWidth(20),
    paddingRight: ratioWidth(20)
  },
  btn: {
    borderRadius: moderateScale(3),
    borderColor: Colors.nice_blue,
    borderWidth: moderateScale(1),
    height: ratioHeight(32),
    width: ratioWidth(155),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtn: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    textAlign: 'center'
  }
})
