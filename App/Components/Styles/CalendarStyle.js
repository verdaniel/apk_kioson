import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewCollapse: {
    backgroundColor: Colors.white_two,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Colors.black_15
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  textTitle: {
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular
  },
  imgDropdown: {
    width: moderateScale(9),
    height: moderateScale(6)
  },
  btnExpand: {
    height: ratioWidth(20),
    width: ratioWidth(20)
  },
  textSubTitle: {
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    fontSize: moderateScale(13),
    color: Colors.nice_blue,
    fontFamily: Fonts.type.robotoMedium
  },
  formInput: {
    borderBottomWidth: moderateScale(2),
    borderColor: Colors.black_15,
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  input: {
    borderWidth: 0,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular
  },
  buttonTextInput: {
    position: 'absolute',
    height: ratioHeight(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: Metrics.screenWidth - ratioWidth(50),
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    paddingRight: ratioWidth(3)
  },
  imgRight: {
    height: ratioWidth(16),
    width: ratioWidth(16)
  },
  viewModal: {
    flex: 1,
    backgroundColor: Colors.black_35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewAllCalender: {
    borderRadius: moderateScale(3),
    backgroundColor: Colors.white_two,
    height: ratioHeight(408),
    width: ratioWidth(320)
  },
  headerCalendar: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(16),
    color: Colors.nice_blue,
    textAlign: 'center'
  },
  separator: {
    height: moderateScale(1),
    backgroundColor: Colors.nice_blue,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  viewCalendar: {
    height: ratioHeight(440), // ratioHeight(290),
    width: ratioWidth(320)
  },
  calendar: {
    flex: 1,
    borderRadius: moderateScale(3)
  },
  viewButton: {
    flexDirection: 'row',
    position: 'absolute',
    width: ratioWidth(320),
    height: ratioHeight(32),
    bottom: ratioHeight(10)
  },
  buttonCalendar: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: ratioWidth(145),
    bottom: ratioHeight(10),
    borderRadius: moderateScale(3)
  },
  textCalendar: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansBold,
    textAlign: 'center',
    padding: moderateScale(8)
  },
  textDate: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.robotoBold,
    textAlign: 'center',
    color: Colors.nice_blue
  },
  textYear: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.type.robotoBold,
    textAlign: 'center',
    color: Colors.nice_blue
  }
})
