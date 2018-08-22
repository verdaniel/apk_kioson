import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  box: {
    margin: moderateScale(10),
    marginBottom: 0,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(15)
  },
  textLabel: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  photo: {
    height: moderateScale(120),
    width: moderateScale(160),
    resizeMode: 'contain',
    marginLeft: ratioWidth(10)
  },
  labelButton: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    letterSpacing: 0,
    color: Colors.nice_blue
  },
  buttonAddPhoto: {
    borderColor: Colors.squash,
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    padding: moderateScale(8),
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPhoto: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.squash
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    padding: moderateScale(15),
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(4)
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.snow
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
  }
})
