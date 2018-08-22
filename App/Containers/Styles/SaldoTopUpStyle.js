import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewLeft: {
    flex: 1
  },
  navbarContainer: {
    height: ratioHeight(Metrics.navBarHeight),
    width: Metrics.screenWidth,
    backgroundColor: Colors.nice_blue,
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
  headerContainer: {
    backgroundColor: Colors.nice_blue,
    padding: moderateScale(40),
    paddingTop: ratioHeight(10),
    flexDirection: 'column',
    alignItems: 'center'
  },
  whitebox: {
    flex: 1,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: Colors.snow,
    height: ratioHeight(40)
  },
  titleContainer: {
    padding: moderateScale(10),
    backgroundColor: Colors.nice_blue,
    marginBottom: ratioHeight(-18),
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.nice_blue,
    width: Metrics.screenWidth,
    marginTop: ratioHeight(-20),
    marginBottom: ratioHeight(15),
    zIndex: 2
  },
  balance: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(36),
    color: Colors.snow
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    marginTop: ratioHeight(10),
    marginBottom: ratioHeight(10),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(4)
  },
  amount: {
    color: Colors.snow,
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12)
  },
  boxContainer: {
    marginTop: ratioHeight(-45),
    flexDirection: 'row',
    padding: moderateScale(10)
  },
  box: {
    flex: 1,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    padding: moderateScale(10),
    paddingLeft: moderateScale(15),
    paddingBottom: 0,
    paddingTop: 0
  },
  amountContainer: {
    backgroundColor: Colors.snow,
    padding: moderateScale(20),
    paddingBottom: 0,
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  input: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  buttonBalance: {
    width: ratioWidth(100),
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: ratioWidth(0.5),
    borderRightColor: Colors.black_15
  },
  buttonLeft: {
    flex: 1,
    padding: moderateScale(10),
    height: ratioHeight(32),
    marginBottom: ratioHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: ratioWidth(0.5),
    borderRightColor: Colors.black_15
  },
  buttonRight: {
    flex: 1,
    marginBottom: ratioHeight(10),
    marginTop: ratioHeight(10),
    height: ratioHeight(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  buttonContainer: {
    flexDirection: 'row',
    marginRight: ratioWidth(5)
  },
  buttonContainerScroll: {
    flexDirection: 'row',
    marginTop: ratioHeight(10),
    padding: moderateScale(20),
    backgroundColor: Colors.snow
  },
  listContainer: {
    margin: moderateScale(10),
    flexDirection: 'column'
  },
  rowContainer: {
    marginBottom: ratioHeight(10),
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    padding: moderateScale(10),
    paddingTop: 0
  },
  itemTitleContainer: {
    borderBottomColor: Colors.greyish,
    borderBottomWidth: moderateScale(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10)
  },
  itemTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.nice_blue
  },
  body: {
    borderBottomColor: Colors.greyish,
    borderBottomWidth: moderateScale(0.5),
    paddingTop: ratioHeight(10),
    paddingBottom: ratioHeight(10)
  },
  resi: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  date: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  total: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  buttonTutor: {
    flex: 1,
    marginBottom: ratioHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.nice_blue,
    height: ratioHeight(36),
    borderRadius: moderateScale(4)
  },
  noteContainer: {
    backgroundColor: Colors.nice_blue10,
    borderRadius: moderateScale(3),
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: moderateScale(10),
    margin: moderateScale(10)
  },
  textRegularSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  round: {
    backgroundColor: Colors.slate_grey,
    borderRadius: moderateScale(8),
    height: moderateScale(16),
    width: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center'
  },
  separatorBorder: {
    width: ratioWidth(1)
  },
  riwayatText: {
    padding: ratioWidth(10),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  barSaldo: {
    width: ratioWidth(310),
    height: ratioHeight(15),
    backgroundColor: Colors.barSaldo,
    borderRadius: moderateScale(7.5)
  }
})
