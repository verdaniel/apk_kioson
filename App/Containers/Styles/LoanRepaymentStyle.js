import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  amountContainer: {
    margin: moderateScale(10),
    elevation: 2,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(10),
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  labelTitle: {
    fontFamily: Fonts.type.robotoRegular,
    marginTop: ratioHeight(10),
    marginLeft: ratioWidth(15),
    marginBottom: ratioHeight(10),
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  dataContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  input: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  image: {
    width: ratioWidth(67),
    height: ratioHeight(20),
    resizeMode: 'contain'
  },
  detailContainer: {
    flexDirection: 'column',
    marginTop: moderateScale(-5),
    paddingBottom: moderateScale(5),
    padding: moderateScale(15),
    backgroundColor: Colors.snow,
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  textTotal: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.nice_blue
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(5),
    marginTop: moderateScale(20)
  },
  button: {
    flex: 1,
    height: ratioHeight(36),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  }
})
