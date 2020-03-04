import React from 'react';
import {Image} from 'react-native';

export default class BackImage extends React.Component {
  render() {
    return (
      <Image
        source={require('../../assets/icons/back.png')}
        fadeDuration={0}
        style={{width: 25, height: 20, marginLeft: 10}}
      />
    );
  }
}
