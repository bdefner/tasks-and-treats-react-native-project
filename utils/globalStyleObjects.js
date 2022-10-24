import { StyleSheet } from 'react-native';

export const spacing = {
  small: 8,
  medium_1: 16,
  medium_2: 24,
  medium_3: 32,
  large_1: 42,
  large_2: 48,
};

export const colors = {
  grey: '#b9babc',
  lightGrey: '#f2f3f6',
  green_1: '#31D35F',
};

export const font = {
  size_1: 8,
  size_2: 16,
  size_3: 24,
};

export const buttonStyles = StyleSheet.create({
  greenPrimary: {},
  greenSecondary: {
    borderColor: colors.green_1,
    color: colors.green_1,
    borderRadius: 8,
  },
});
