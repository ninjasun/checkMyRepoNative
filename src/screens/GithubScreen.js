import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasicButton as Button} from '../components/BasicButton';
import {LinkButton} from '../components/LinkButton';
import useAsync from '../API/useAsync';
import {StoreContext} from './../global/appContexts';
import sendRepo from '../API/sendRepo';
import checkRepo from '../API/checkRepo';

export default function GithubScreen({navigation, route}) {
  const LOGIN_ERROR_TEXT = (
    <Text style={styles.errorText}>
      Check your <Text style={styles.boldText}>username</Text> or your{' '}
      <Text style={styles.boldText}>repository</Text> name
    </Text>
  );
  const CONNECTION_ERROR_TEXT = (
    <Text style={styles.errorText}>
      Check your <Text style={styles.boldText}>internet connection</Text>
    </Text>
  );

  const {store} = useContext(StoreContext);

  const params = {
    user: store.user,
    repo: store.repo,
  };

  const {execute: runCheck, pending: pendingCheck} = useAsync(checkRepo, false);
  const {execute: runPost, pending: pendingPost} = useAsync(sendRepo, false);

  if (store.senderStatus === 'BOT') {
    navigation.navigate('POSTRESULT', {
      result: true,
      title: 'All done!',
      feedback: 'Repository sent.',
    });
  }

  return (
    <View style={{...styles.container, backgroundColor: store.backgroundColor}}>
      <Text
        style={{
          fontFamily: 'open-sans-extrabold',
          fontSize: 24,
          marginBottom: 40,
          marginTop: -20,
        }}>
        Set the repository address
      </Text>
      <Text style={{fontFamily: 'open-sans-regular', fontSize: 50}}>
        github.com
      </Text>
      <LinkButton
        title={store.user}
        styleText={styles.linkText}
        onPress={() => navigation.navigate('USER')}
      />
      <LinkButton
        title={store.repo}
        styleText={styles.linkText}
        onPress={() => navigation.navigate('REPOSITORY')}
      />
      {store.errorType === 'CONNECTION_ERROR' && CONNECTION_ERROR_TEXT}
      {store.errorType === 'REPO_ERROR' && LOGIN_ERROR_TEXT}
      {store.senderStatus === 'REPO' ? (
        <Button
          title="send"
          disabled={pendingPost}
          onPress={() => {
            runPost(params);
          }}
        />
      ) : (
        <Button
          title="check"
          disabled={pendingCheck}
          onPress={() => {
            runCheck(params);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  linkText: {
    fontFamily: 'open-sans-regular',
    fontSize: 50,
  },
  errorText: {
    fontFamily: 'open-sans-regular',
    fontSize: 26,
    marginTop: 10,
  },
  boldText: {
    fontFamily: 'open-sans-extrabold',
  },
});
