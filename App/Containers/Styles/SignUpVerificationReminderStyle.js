import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    paddingTop: moderateScale(45),
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(-20)
  },
  bannerContainer: {
    width: ratioWidth(280),
    height: ratioHeight(280),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    width: ratioWidth(280),
    height: ratioHeight(280),
    resizeMode: 'contain'
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(22),
    textAlign: 'center',
    color: Colors.white_two
  },
  textSubTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white_two
  },
  line: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(40),
    width: ratioWidth(70),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.white_two,
    height: moderateScale(0.5)
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonVerification: {
    flex: 1,
    borderRadius: moderateScale(3),
    backgroundColor: Colors.squash,
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonVerificationNext: {
    flex: 1,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(15),
    borderColor: Colors.snow,
    borderWidth: moderateScale(1),
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  }
})
