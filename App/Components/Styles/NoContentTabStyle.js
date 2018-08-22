import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  notLoginContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    height: ratioHeight(180),
    width: ratioWidth(180),
    resizeMode: 'contain',
    marginBottom: ratioHeight(40)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey
  },
  textDescription: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: Colors.greyish
  },
  buttonSignIn: {
    alignSelf: 'center',
    elevation: 2,
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Colors.black_15,
    margin: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.nice_blue,
    height: ratioHeight(40),
    flex: 1
  },
  textButton: {
    fontFamily: Fonts.productSansBold,
    fontSize: moderateScale(14),
    color: Colors.white_two
  }
})
