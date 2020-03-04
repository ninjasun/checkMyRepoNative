import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export function BasicButton({title, onPress, styleButton, styleText}) {
  return (
    <TouchableOpacity
      style={{...styles.button, ...styleButton}}
      onPress={onPress}>
      <Text style={{...styles.text, ...styleText}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: 'open-sans-bold',
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 24,
  },
});
