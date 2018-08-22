import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    // alignSelf: 'center',
    // alignItems: 'center',
    // backgroundColor: Colors.white_two,
    // height: 50,
    width: ratioWidth(348),
    top: 25,
    left: 25
    // borderRadius: 3
  },
  headerLandscape: {
    position: 'absolute',
    top: 200,
    right: -150,
    flexDirection: 'row'
  },
  iconTitleContainer: {
    flexDirection: 'row'
  },
  titleContainer: {
    marginLeft: 15,
    width: ratioWidth(220)
  },
  titleContainerLandscape: {
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: '#00000059',
    paddingVertical: ratioWidth(10),
    paddingHorizontal: ratioWidth(15)
  },
  text: {
    flex: 1,
    // alignSelf: 'center',
    // textAlign: 'center',
    // marginLeft: 15,
    fontFamily: Fonts.type.robotoBold,
    fontSize: 16,
    lineHeight: ratioHeight(19),
    color: Colors.white_two
  },
  subIcon: {
    marginTop: 5,
    height: 21,
    width: 14
  },
  subIconLandscape: {
    marginTop: 5,
    marginLeft: 10,
    height: 13,
    width: 20
  },
  subTitle: {
    marginVertical: 0,
    // marginLeft: 15,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: 14,
    color: Colors.white_two
  },
  btnCamera: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    width: 69,
    height: 69
  },
  hover: {
    position: 'absolute',
    height: ratioHeight(640),
    width: ratioWidth(360)
  },
  focus: {
    position: 'absolute',
    top: ratioHeight(210),
    left: ratioWidth(20),
    height: ratioHeight(220),
    width: ratioWidth(320),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: Colors.white_two,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 1
  },
  hovers: {
    overflow: 'hidden',
    position: 'absolute',
    height: ratioHeight(210),
    width: ratioWidth(360),
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  hoversSide: {
    overflow: 'hidden',
    position: 'absolute',
    height: ratioHeight(220),
    width: ratioWidth(20),
    backgroundColor: 'rgba(0,0,0,0.25)'
  }
})
