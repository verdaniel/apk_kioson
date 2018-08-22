import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bodyContainer: {
    margin: moderateScale(10),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.snow,
    padding: moderateScale(10),
    paddingBottom: moderateScale(2),
    flexDirection: 'column'
  },
  titleContainer: {
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15,
    paddingBottom: moderateScale(5)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  dataContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8)
  },
  label: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  paymentContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(7),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  payment: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.nice_blue
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    padding: moderateScale(25),
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15)
  },
  button: {
    flex: 1,
    borderRadius: moderateScale(3),
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  robotoMediumBlue: {
    paddingBottom: ratioHeight(8),
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoRegularSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  robotoBoldSmallGrey: {
    paddingBottom: ratioHeight(3),
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  }
})
