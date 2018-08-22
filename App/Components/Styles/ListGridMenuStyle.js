import { StyleSheet } from 'react-native'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import { Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: ratioHeight(10),
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: ratioWidth(5)
  },
  viewIcon: {
    height: ratioHeight(90)
  },
  imgIcon: {
    height: ratioHeight(36),
    width: ratioWidth(42)
  },
  textIcon: {
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(11),
    textAlign: 'center'
  },
  tumb: {
    width: ratioWidth(106),
    height: ratioHeight(90),
    flex: 1,
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    elevation: 2,
    justifyContent: 'space-between'
  },
  maskedImage: {
    // marginTop: ratioHeight(12),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  maskedText: {
    justifyContent: 'center',
    paddingBottom: ratioHeight(10)
  }
})
