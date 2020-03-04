import React, {useState, useContext} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {BasicButton as Button} from '../components/BasicButton';
import {StoreContext} from '../global/appContexts';

export default function UserScreen({navigation, route}) {
  const {dispatch, store} = useContext(StoreContext);
  const [user, setUser] = useState(store.user === 'user' ? '' : store.user);

  function saveUser() {
    dispatch({type: 'SET_USER', payload: user});
    navigation.navigate('HOME');
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setUser(text)}
        style={styles.textInput}
        placeholder="Type your github username"
        placeholderTextColor="#a9a9a9"
        value={user}
      />
      <Button title="done" onPress={() => saveUser()} />
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
  textInput: {
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    fontSize: 20,
  },
});
