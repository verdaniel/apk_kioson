import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewModal: {
    flex: 1,
    backgroundColor: Colors.black_35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewAllCalender: {
    borderRadius: 3,
    backgroundColor: Colors.white_two,
    height: ratioHeight(408),
    width: ratioWidth(320),
    paddingHorizontal: moderateScale(10)
  },
  headerCalendar: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: 16,
    color: Colors.nice_blue,
    marginTop: 12,
    textAlign: 'center'
  },
  separator: {
    height: 2,
    backgroundColor: Colors.nice_blue,
    marginTop: 11
  },
  viewCalendar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  },
  calendar: {
    flex: 1,
    borderRadius: 3
  },
  buttonCalendar: {
    backgroundColor: Colors.nice_blue,
    marginLeft: 10,
    marginRight: 10,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textCalendar: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white_two
  },
  buttonActive: {
    width: moderateScale(Metrics.screenWidth - 98),
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: Colors.nice_blue,
    borderRadius: 3
  },
  buttonInactive: {
    marginVertical: moderateScale(10), marginHorizontal: moderateScale(10), backgroundColor: Colors.nice_blue, borderRadius: 3
  },
  textButton: {
    fontSize: moderateScale(14), fontFamily: Fonts.type.productSansBold, color: Colors.white_two, textAlign: 'center', padding: moderateScale(8)
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.type.robotoMedium,
    fontSize: 16,
    color: Colors.squash
  }
})
