import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    flex: 1
  },
  flexRowTwoDropDown: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: ratioWidth(10),
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: Colors.black_15,
    marginTop: ratioHeight(3),
    marginBottom: ratioHeight(5)
  },
  textDropDown: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    flex: 1,
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    paddingLeft: ratioWidth(10)
  },
  imgRight: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  dropDown: {
    position: 'absolute',
    height: ratioHeight(200),
    width: ratioWidth(Metrics.screenWidth),
    right: ratioWidth(15),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonTextInput: {
    position: 'absolute',
    width: ratioWidth(16),
    bottom: ratioHeight(15),
    right: ratioWidth(25)
  }
})
