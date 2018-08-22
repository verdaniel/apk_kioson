import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bodyContainer: {
    backgroundColor: Colors.white_two,
    padding: moderateScale(15),
    marginTop: moderateScale(10),
    flexDirection: 'column'
  },
  imageItemContainer: {
    flex: 1,
    borderRadius: moderateScale(5),
    padding: moderateScale(12),
    backgroundColor: Colors.white
  },
  imageDanamas: {
    width: moderateScale(111),
    height: moderateScale(28),
    resizeMode: 'contain'
  },
  titleItem: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.slate_grey
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
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginTop: moderateScale(3),
    color: Colors.nice_blue
  },
  rincian: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.squash
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  listContainer: {
    backgroundColor: Colors.snow,
    elevation: 2,
    borderRadius: moderateScale(3),
    marginTop: moderateScale(15),
    padding: moderateScale(10)
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(10),
    borderBottomColor: Colors.black_15,
    borderBottomWidth: moderateScale(1)
  },
  dataContainer: {
    paddingBottom: moderateScale(5),
    paddingTop: moderateScale(10),
    borderBottomColor: Colors.black_15,
    borderBottomWidth: moderateScale(1)
  },
  installment: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: Colors.squash,
    marginBottom: moderateScale(5)
  },
  approved: {
    padding: moderateScale(5),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Colors.squash
  },
  buttonPaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10)
  },
  buttonOff: {
    height: moderateScale(32),
    borderRadius: moderateScale(3),
    flex: 1,
    marginLeft: moderateScale(5),
    marginRight: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greyish
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  }
})
