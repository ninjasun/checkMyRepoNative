import React, {useState, useContext} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {BasicButton as Button} from '../components/BasicButton';
import {StoreContext} from '../global/appContexts';

export default function RepoScreen({navigation, route}) {
  const {store, dispatch} = useContext(StoreContext);
  const [repo, setRepo] = useState(store.repo === 'repo' ? '' : store.repo);

  function saveRepo() {
    dispatch({type: 'SET_REPO', payload: repo});
    navigation.navigate('HOME');
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setRepo(text)}
        style={styles.textInput}
        placeholder="Type your repository name"
        placeholderTextColor="#a9a9a9"
        value={repo}
      />
      <Button title="done" onPress={() => saveRepo()} />
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
