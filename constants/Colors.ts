/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0A091E';
const tintColorDark = '#6156E2';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#EEEEFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F2F2F2',
    background: '#0A091E',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#8E8E8E',
    tabIconSelected: tintColorDark,
  },
};
