import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {StoreContext} from '../global/appContexts';

export function LinkButton({title, onPress, styleButton, styleText}) {
  const {store} = useContext(StoreContext);

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...styleButton,
        backgroundColor: store.backgroundColor,
      }}
      onPress={onPress}>
      <Text style={{...styles.text, ...styleText}}>
        /<Text style={styles.linkText}>{title}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'black',
  },
  linkText: {
    color: 'grey',
  },
});
