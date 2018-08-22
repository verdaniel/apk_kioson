import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  imgLogo: {
    width: moderateScale(95),
    height: moderateScale(24)
  },
  imgDropdown: {
    width: moderateScale(9),
    height: moderateScale(6)
  },
  btnTanya: {
    width: moderateScale(24),
    height: moderateScale(24)
  },
  imgTanya: {
    width: moderateScale(24),
    height: moderateScale(24)
  },
  constinerChart: {
    flex: 1
  },
  container: {
    backgroundColor: Colors.white_two
  },
  robotoRegularlarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  robotoRegularMedBlue: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoMediumMedBlue: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  robotoRegularsmallBlue: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.nice_blue,
    marginRight: moderateScale(10)
  },
  robotoRegularSmallGrey: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(10),
    color: Colors.greyish
  },
  felxRowList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(13),
    flex: 1,
    marginHorizontal: moderateScale(15)
  },
  flexSmallCoumn: {
    alignItems: 'flex-end'
  },
  borderBottom: {
    width: Metrics.screenWidth,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  flexRowClear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(9)
  },
  modalSort: {
    backgroundColor: Colors.white_two,
    elevation: 5,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 3
  },
  listSort: {
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    width: moderateScale(Metrics.screenWidth / 1.8),
    paddingHorizontal: moderateScale(18)
  },
  flexRowWhite: {
    backgroundColor: Colors.white_two,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    paddingVertical: 15
  },
  flexColumnWhite: {
    paddingVertical: ratioHeight(10),
    paddingHorizontal: ratioWidth(15),
    flex: 1,
    borderRadius: 3,
    elevation: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: Colors.white_two
  },
  flexRowBoxWhite: {
    borderRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: Colors.white_two,
    margin: moderateScale(2)
  },
  productSndRegularSmallGrey: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(13),
    color: Colors.greyish
  },
  tabLabel: {
    marginBottom: ratioHeight(10),
    justifyContent: 'center'
  },
  tabIcon: {
    height: '100%',
    paddingHorizontal: ratioWidth(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: ratioHeight(5)
  },
  robotoRegularsmallSlateGrey: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.slate_grey,
    marginRight: moderateScale(10)
  }
})
