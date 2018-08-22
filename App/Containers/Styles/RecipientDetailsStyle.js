import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  flexRowPadding: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(14),
    borderRadius: 3
  },
  flexRowflat: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  textRegularSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  formData: {
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    // elevation: 1,
    paddingHorizontal: ratioWidth(15),
    paddingVertical: ratioHeight(25)
  },
  textPrice: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(13),
    color: Colors.nice_blue,
    paddingBottom: ratioHeight(11)
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  dropDown: {
    position: 'absolute',
    // height: ratioHeight(200),
    width: ratioWidth(320),
    right: ratioWidth(21),
    borderRadius: 3,
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  imgRight: {
    height: ratioWidth(16),
    width: ratioWidth(16)
  },
  buttonTextInput: {
    position: 'absolute',
    height: ratioHeight(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: Metrics.screenWidth - ratioWidth(50),
    marginTop: ratioHeight(35)
    // marginLeft: ratioWidth(15),
    // marginRight: ratioWidth(15)
  }
})
