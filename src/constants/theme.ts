import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#1E1E1E',
    secondary: '#3B3B3B',

    white: '#fff',
    lightGreen: '#4BEE70',
    red: '#D84035',
    black: '#000000',
    gray: '#212125',
    gray1: '#1f1f1f',
    lightGray: '#3B3B3B',
    lightGray2: '#212125',
    lightGray3: '#757575',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.8)',
    transparentBlack1: 'rgba(0, 0, 0, 0.4)',
    star: '#ffd700',
    green: '#006400',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height,
};
export const FONTS = {
    largeTitle: { fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
    h1_light: { fontFamily: 'Roboto-Light', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
    h2_light: { fontFamily: 'Roboto-Light', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
    h3_light: { fontFamily: 'Roboto-Light', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
