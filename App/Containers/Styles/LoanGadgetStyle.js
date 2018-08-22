import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: moderateScale(10)
  },
  labelTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    marginLeft: moderateScale(8),
    marginBottom: moderateScale(5)
  },
  serviceContainer: {
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: moderateScale(3),
    backgroundColor: Colors.snow,
    elevation: 4,
    margin: moderateScale(5)
  },
  bodyContainer: {
    flexDirection: 'column'
  },
  border: {
    height: moderateScale(1),
    borderBottomColor: Colors.black_15,
    borderBottomWidth: moderateScale(1),
    marginTop: moderateScale(7),
    marginLeft: moderateScale(5),
    marginRight: moderateScale(5)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  iconDanamas: {
    height: moderateScale(20),
    width: moderateScale(75),
    resizeMode: 'contain',
    marginRight: moderateScale(10)
  },
  radio: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain'
  },
  image: {
    width: ratioWidth(100),
    height: ratioWidth(170),
    resizeMode: 'contain'
  },
  price: {
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    marginTop: moderateScale(2)
  },
  borderTitleItem: {
    height: moderateScale(1),
    borderBottomColor: Colors.black_15,
    borderBottomWidth: moderateScale(1),
    marginLeft: 0,
    marginRight: 0,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5)
  },
  labelDescription: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.greyish,
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(2)
  },
  description: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    marginBottom: moderateScale(5)
  },
  button: {
    height: moderateScale(34),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    flex: 1,
    marginTop: moderateScale(10)
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.snow
  }
})
