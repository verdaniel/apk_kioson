import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
// import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    marginBottom: moderateScale(10),
    fontWeight: '500',
    marginLeft: moderateScale(3)
  },
  bodyContainer: {
    padding: moderateScale(10)
  },
  itemContainer: {
    elevation: 2,
    borderRadius: moderateScale(4),
    backgroundColor: Colors.snow,
    marginBottom: moderateScale(10),
    flexDirection: 'column',
    padding: moderateScale(10)
  },
  imageItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: moderateScale(3),
    padding: moderateScale(12),
    backgroundColor: Colors.white
  },
  imageDanamas: {
    width: moderateScale(111),
    height: moderateScale(28),
    resizeMode: 'contain'
  },
  labelData: {
    alignSelf: 'center',
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.greyish,
    marginBottom: moderateScale(10)
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginTop: moderateScale(3),
    color: Colors.nice_blue
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  arrow: {
    width: moderateScale(9),
    height: moderateScale(14),
    tintColor: Colors.snow,
    resizeMode: 'contain'
  },
  buttonStatus: {
    padding: moderateScale(5),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3)
  },
  textButtonGrey: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    fontWeight: '500',
    color: Colors.greyish
  }
})
