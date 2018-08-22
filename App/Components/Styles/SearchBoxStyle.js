import { StyleSheet } from 'react-native'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  searchBox: {
    alignItems: 'center',
    borderRadius: 3,
    // borderWidth: moderateScale(0.5),
    // borderColor: Colors.black_15,
    elevation: 3,
        backgroundColor: Colors.white_two,
    marginHorizontal: ratioWidth(10),
    flexDirection: 'row',
    paddingHorizontal: ratioWidth(15),
    paddingVertical: ratioHeight(5),
    marginBottom: ratioHeight(15)
  },
  imageSquare: {
    width: ratioWidth(20),
    height: ratioHeight(20)
  },
  textInput: {
    flex: 1,
    padding: moderateScale(3),
    margin: 0,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  textboxfieldd: {
    fontFamily: Fonts.type.productSansBold
  }
})
