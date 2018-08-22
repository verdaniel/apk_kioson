import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Transforms/Scaling'
import Colors from '../../Themes/Colors'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { Fonts } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  viewCalendar: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white_two,
    height: ratioHeight(481),
    width: ratioWidth(320)
  },
  textDate: {
    fontFamily: Fonts.type.robotoBold,
    textAlign: 'center',
    fontSize: moderateScale(10),
    color: Colors.nice_blue
  },
  viewSeparator: {
    height: ratioHeight(1),
    backgroundColor: Colors.nice_blue,
    marginTop: ratioHeight(10)
  },
  viewHeader: {
    marginTop: ratioHeight(15),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderWheel: {
    flex: 1,
    borderBottomColor: Colors.white_two,
    borderBottomWidth: 0.5,
    borderTopColor: Colors.white_two,
    borderTopWidth: 0.5
  },
  viewWheel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    marginTop: ratioHeight(10)
  },
  viewButton: {
    marginTop: ratioHeight(37),
    flexDirection: 'row',
    bottom: 0
  },
  buttonCalendar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(3)
  },
  textCalendar: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold,
    textAlign: 'center',
    padding: moderateScale(8)
  }
})
