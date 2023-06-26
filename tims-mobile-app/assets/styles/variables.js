import {StyleSheet} from 'react-native';
import colors from './color';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  // based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
export const deviceWith = SCREEN_WIDTH;
export const deviceHeight = SCREEN_HEIGHT;

export const miniSize= normalize(12);
export const smallSize= normalize(15);
export const mediumSize= normalize(17);
export const largeSize= normalize(20);
export const xlargeSize= normalize(24);


export const CELL_SIZE = 60;
export const CELL_BORDER_RADIUS = 10;
export const DEFAULT_CELL_BG_COLOR = white;
export const NOT_EMPTY_CELL_BG_COLOR = '#1D1E20';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

export const primary =  colors.primary;
export const secondary = colors.secondary;
export const black = colors.black;
export const blackLight = colors.blackLight;
export const blackBg= colors.blackBg;
export const danger = colors.danger;
export const grey = colors.grey;
export const greyLight = colors.greyLight;
export const white = colors.white;
export const userbg = colors.userbg;
export const blue = colors.blue;

export default StyleSheet.create({
  appRoot : {
      tabShadow: {
          shadowColor: black,
          shadowOffset: {
              width: 0,
              height: -4
          },
          shadowOpacity: .8,
          shadowRadius: 20,
          elevation: 15
      }
  },
 
  
});