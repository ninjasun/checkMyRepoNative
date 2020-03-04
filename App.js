import 'react-native-gesture-handler';
import React, {useEffect, useContext, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RepoScreen,
  GithubScreen,
  UserScreen,
  PostResultScreen,
} from './src/screens/';
import BackImage from './src/components/BackImage';
import {StoreContext, INITIAL_STATE, reducer} from './src/global/appContexts';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const headerStyle = {
  backgroundColor: '#FFF',
  shadowRadius: 0,
  shadowOpacity: 0,
  shadowOffset: {
    height: 0,
  },
  elevation: 0,
};

const NetworkProvider = function() {
  const {store, dispatch} = useContext(StoreContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('state.isConnected: ', state.isConnected);
      dispatch({type: 'CONNECTION', payload: state.isConnected});
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerStyle, headerTitleStyle: {fontWeight: 'bold'}}}>
        <Stack.Screen
          name="HOME"
          component={GithubScreen}
          options={{
            title: '',
            headerLeft: null,
            headerStyle: {
              ...headerStyle,
              backgroundColor: store.backgroundColor,
            },
          }}
          initialParams={{user: 'user', repo: 'repo'}}
        />
        <Stack.Screen
          name="USER"
          component={UserScreen}
          options={{title: 'USER', headerBackImage: () => <BackImage />}}
        />
        <Stack.Screen
          name="REPOSITORY"
          component={RepoScreen}
          options={{title: 'REPOSITORY', headerBackImage: () => <BackImage />}}
        />
        <Stack.Screen
          name="POSTRESULT"
          component={PostResultScreen}
          options={{
            title: '',
            headerLeft: null,
            headerStyle: {
              ...headerStyle,
              backgroundColor: store.backgroundColor,
            },
          }}
          initialParams={{text: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [store, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <>
      <StoreContext.Provider value={{store, dispatch}}>
        <NetworkProvider />
      </StoreContext.Provider>
    </>
  );
}
