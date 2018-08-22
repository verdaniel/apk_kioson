import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerContainer: {
    margin: moderateScale(20),
    backgroundColor: Colors.snow,
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    paddingBottom: ratioHeight(3),
    flexDirection: 'column'
  },
  titleContainer: {
    flex: 1,
    borderBottomColor: Colors.black_15,
    borderBottomWidth: ratioHeight(1)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    marginBottom: ratioHeight(7)
  },
  dataContainer: {
    flexDirection: 'row',
    marginTop: ratioHeight(7),
    marginBottom: ratioHeight(7)
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish,
    flex: 1
  },
  data: {
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.greyish,
    fontSize: moderateScale(14)
  },
  billContainer: {
    backgroundColor: Colors.snow,
    marginTop: ratioHeight(20),
    padding: moderateScale(15),
    paddingBottom: ratioHeight(7)
  },
  totalContainer: {
    flexDirection: 'row',
    borderTopColor: Colors.black_15,
    borderTopWidth: ratioHeight(1),
    paddingTop: ratioHeight(7)
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    padding: moderateScale(20),
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    height: ratioHeight(43)
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  }
})
