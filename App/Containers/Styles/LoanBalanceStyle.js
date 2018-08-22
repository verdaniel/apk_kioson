import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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
    flexDirection: 'column',
    padding: moderateScale(10)
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
  button: {
    flex: 1,
    backgroundColor: Colors.snow,
    margin: moderateScale(5),
    height: moderateScale(55),
    elevation: 2,
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderColor: Colors.snow
  },
  dataContainer: {
    flexDirection: 'column',
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    paddingTop: 0,
    paddingBottom: 0
  },
  textButton: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.greyish
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: moderateScale(25),
    paddingTop: 0,
    paddingBottom: moderateScale(15)
  },
  buttonNext: {
    flex: 1,
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3)
  },
  textButtonNext: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.snow
  }
})
