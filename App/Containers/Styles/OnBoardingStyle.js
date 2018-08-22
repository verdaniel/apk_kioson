import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  boardCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageSlider: {
    height: ratioHeight(350),
    width: ratioWidth(310)
  },
  banner: {
    backgroundColor: Colors.transparent,
    height: ratioHeight(350),
    width: ratioWidth(310),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: ratioHeight(30)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.large),
    color: Colors.slate_grey
  },
  description: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    textAlign: 'center',
    marginHorizontal: ratioWidth(50)
  },
  footter: {
    flexDirection: 'row'
  },
  textButton: {
    color: Colors.squash,
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(Fonts.size.small)
  },
  flexOne: {
    paddingBottom: ratioHeight(20)
  },
  pageStyle: {
    alignItems: 'center',
    padding: moderateScale(20)
  },
  dot: {
    backgroundColor: Colors.transparent,
    height: ratioHeight(10),
    width: ratioWidth(10),
    borderRadius: 200,
    borderWidth: 0.5,
    borderColor: Colors.squash,
    marginRight: ratioWidth(9)
  }
})
