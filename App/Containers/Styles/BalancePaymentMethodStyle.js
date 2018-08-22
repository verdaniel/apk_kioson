import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  navbarContainer: {
    height: ratioHeight(Metrics.navBarHeight),
    width: Metrics.screenWidth,
    backgroundColor: Colors.squash,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  imgBack: {
    width: ratioWidth(18),
    height: ratioHeight(20),
    resizeMode: 'contain'
  },
  help: {
    width: ratioWidth(24),
    height: ratioHeight(24),
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  },
  viewHeader: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two
  },
  viewRight: {
    flex: 1
  },
  viewLeft: {
    flex: 1
  },
  amountContainer: {
    margin: moderateScale(10),
    elevation: 2,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(10),
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  voucherContainer: {
    padding: moderateScale(15),
    paddingTop: ratioHeight(10),
    paddingBottom: ratioHeight(10),
    backgroundColor: Colors.snow,
    flexDirection: 'row'
  },
  inputVoucherContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  input: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  discount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10)
  },
  voucherButton: {
    width: ratioWidth(100),
    height: ratioHeight(36),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(20),
    backgroundColor: Colors.nice_blue
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  labelTitle: {
    fontFamily: Fonts.type.robotoMedium,
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(15),
    marginBottom: ratioHeight(10),
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  dataContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  dataDetailContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(5)
  },
  dataTotalDetailContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    paddingTop: ratioHeight(5),
    paddingBottom: ratioHeight(20),
    borderTopWidth: moderateScale(0.5),
    borderTopColor: Colors.black_15
  },
  image: {
    width: ratioWidth(67),
    height: ratioHeight(20),
    resizeMode: 'contain'
  },
  detailContainer: {
    marginTop: ratioHeight(-10),
    backgroundColor: Colors.snow,
    paddingTop: ratioHeight(10),
    flexDirection: 'column',
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  paidButton: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    height: ratioHeight(40)
  }
})
