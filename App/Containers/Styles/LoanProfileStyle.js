import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  box: {
    margin: moderateScale(10),
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(3)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.nice_blue,
    margin: moderateScale(15),
    marginBottom: moderateScale(5)
  },
  imgRight: {
    height: ratioWidth(16),
    width: ratioWidth(16)
  },
  arrow: {
    height: ratioWidth(8),
    width: ratioWidth(16)
  },
  buttonTextInput: {
    position: 'absolute',
    height: ratioHeight(30),
    bottom: ratioHeight(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: Metrics.screenWidth - ratioWidth(65),
    marginTop: ratioHeight(32),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15)
  },
  dropDown: {
    position: 'absolute',
    minHeight: ratioHeight(30),
    minWidth: ratioWidth(100),
    right: ratioWidth(10),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 2
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  floatlabelContainer: {
    margin: moderateScale(15),
    marginBottom: 0,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15
  },
  photoContainer: {
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(15),
    marginRight: ratioWidth(15),
    paddingTop: ratioWidth(10),
    paddingBottom: ratioWidth(5),
    flexDirection: 'column',
    borderBottomColor: Colors.black_15,
    borderBottomWidth: moderateScale(1)
  },
  labelPhoto: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: 12,
    color: Colors.slate_grey
  },
  image: {
    marginLeft: ratioWidth(10),
    marginTop: ratioWidth(2),
    height: moderateScale(120),
    width: moderateScale(160),
    resizeMode: 'contain'
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: moderateScale(25),
    marginBottom: moderateScale(15),
    marginTop: moderateScale(15)
  },
  button: {
    height: ratioHeight(43),
    flex: 1,
    backgroundColor: Colors.nice_blue,
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  texterror: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 10,
    textAlign: 'right',
    flex: 1,
    marginRight: moderateScale(15),
    color: Colors.red
  }
})
