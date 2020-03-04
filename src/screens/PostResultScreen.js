import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasicButton as Button} from '../components/BasicButton';
import {StoreContext} from '../global/appContexts';

export default function PostResultScreen({navigation, route}) {
  const {store, dispatch} = useContext(StoreContext);
  function goBack() {
    dispatch({type: 'RESET'});
    navigation.navigate('HOME', {user: 'user', repo: 'repo'});
  }
  return (
    <View style={{...styles.container, backgroundColor: store.backgroundColor}}>
      <Text style={styles.text}>{route.params.title}</Text>
      <Text style={styles.text}>{route.params.feedback}</Text>
      <Button title="cool" onPress={() => goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 40,
    textAlign: 'center',
  },
});
