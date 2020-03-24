import React, { Component } from 'react';
import { View } from 'react-native';

import Citysearch from './Cityseacrh';




export default class Search extends Component {
 
  render() {
    return (
      <View style = {{flex:1}}>
             
      <Citysearch navigation = {this.props.navigation} /> 
      </View>
      
    );
  }
}
