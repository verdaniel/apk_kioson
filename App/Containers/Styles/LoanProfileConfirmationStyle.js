import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.squash,
    height: moderateScale(Metrics.navBarHeight),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(9)
  },
  viewLeft: {
    flex: 1,
    marginLeft: ratioWidth(15),
    justifyContent: 'center'
  },
  viewHeader: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBack: {
    width: ratioWidth(16),
    height: ratioWidth(16)
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  },
  box: {
    margin: moderateScale(10),
    marginTop: moderateScale(6),
    marginBottom: 0,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(15)
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelButton: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    letterSpacing: 0,
    color: Colors.nice_blue
  },
  dropdown: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  },
  buttonContainer: {
    position: 'relative',
    padding: moderateScale(25),
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(15),
    flexDirection: 'row',
    bottom: 0
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: ratioHeight(43),
    backgroundColor: Colors.nice_blue,
    borderRadius: moderateScale(3)
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  textLabel: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  textData: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'right',
    fontWeight: '500',
    color: Colors.greyish
  },
  photo: {
    height: moderateScale(120),
    width: moderateScale(160),
    resizeMode: 'contain',
    marginLeft: ratioWidth(25)
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.black_35
  },
  boxModalContainer: {
    flex: 1,
    margin: moderateScale(20),
    padding: moderateScale(10),
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  modalTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(18),
    fontWeight: '300',
    letterSpacing: 0,
    color: Colors.nice_blue
  },
  modalContent: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey
  },
  buttonConfirm: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    height: ratioHeight(36)
  },
  noteContainer: {
    margin: moderateScale(10),
    marginBottom: 0,
    padding: moderateScale(10),
    backgroundColor: Colors.nice_blue10,
    borderRadius: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center'
  },
  round: {
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ratioWidth(10),
    backgroundColor: Colors.slate_grey
  },
  textRound: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(11),
    color: Colors.snow
  },
  textNote: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  }
})
