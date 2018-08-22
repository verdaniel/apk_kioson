import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  button: {
    marginHorizontal: ratioWidth(25),
    // marginToprr: ratioHeight(10),
    marginBottom: ratioHeight(15),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    paddingVertical: ratioHeight(12),
    textAlign: 'center'
  },
  notLoginContainer: {
    flex: 1,
    marginTop: ratioHeight(50),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  banner: {
    height: ratioHeight(166),
    width: ratioWidth(158),
    resizeMode: 'contain'
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
  viewBottom: {
    flex: 1,
    marginTop: ratioHeight(-30),
    paddingBottom: ratioHeight(15)
  },
  bgColor: {
    backgroundColor: Colors.nice_blue,
    paddingBottom: ratioHeight(40),
    paddingTop: ratioHeight(22),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  robotoMedium: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    color: Colors.white_two,
    textAlign: 'center',
    paddingBottom: ratioHeight(5)
  },
  robotoRegular: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.white_two,
    textAlign: 'center',
    paddingBottom: ratioHeight(5)
  },
  iconSearchabsolute: {
    position: 'absolute',
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: ratioWidth(10),
    paddingVertical: ratioHeight(5),
    marginVertical: ratioHeight(5),
    right: 5
  },
  textInput: {
    flex: 1,
    padding: moderateScale(3),
    margin: 0,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  imageSquare: {
    width: ratioWidth(20),
    height: ratioHeight(20),
    marginRight: ratioWidth(15)
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.white_two,
    marginHorizontal: ratioWidth(10),
    flexDirection: 'row',
    paddingHorizontal: ratioWidth(15),
    paddingVertical: ratioHeight(5),
    marginBottom: ratioHeight(15)
  }
})
