import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  itemContainer: {
    elevation: 2,
    backgroundColor: Colors.snow,
    marginBottom: moderateScale(10),
    flexDirection: 'column',
    padding: moderateScale(15)
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
  searchContainer: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    elevation: 4,
    margin: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.squash
  },
  imageSearch: {
    width: moderateScale(25),
    height: moderateScale(25),
    resizeMode: 'contain',
    tintColor: Colors.snow
  },
  modal: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  navBarSearch: {
    height: ratioHeight(Metrics.navBarHeight),
    marginBottom: moderateScale(10),
    padding: moderateScale(15),
    backgroundColor: Colors.snow,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageClose: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain'
  },
  titleSearchContainer: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  buttonFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(15),
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25)
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textList: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  },
  buttonFilter: {
    flex: 1,
    marginLeft: moderateScale(5),
    marginRight: moderateScale(5),
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(43)
  },
  textFilter: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  labelBox: {
    fontFamily: Fonts.type.robotoRegular,
    marginLeft: moderateScale(12),
    marginBottom: moderateScale(-10),
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: Colors.greyish
  },
  icon: {
    width: moderateScale(14),
    height: moderateScale(16),
    marginRight: moderateScale(3),
    resizeMode: 'contain'
  },
  buttonDate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    margin: moderateScale(10),
    paddingBottom: moderateScale(6),
    paddingTop: moderateScale(6),
    borderRadius: moderateScale(2),
    borderColor: Colors.black_15,
    borderWidth: moderateScale(1)
  },
  date: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14)
  },
  imageCalender: {
    height: ratioHeight(16),
    width: ratioHeight(14)
  }
})
