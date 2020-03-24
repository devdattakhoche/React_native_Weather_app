
import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Search from './components/SearchScreen';
import { Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Documentation from './components/Documentation';

import CurrentWeather from './components/CurrentWeather';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#121212",
    accent: "#fff"
  }
};


const Tab = createMaterialBottomTabNavigator(  );

export default function App() {
  return (
    <PaperProvider theme = {theme}>
  
    <View style = {{flex:1}}>
    
      
    
    
    <NavigationContainer >
      <Tab.Navigator initialRouteName = "Documentation"  barStyle={{ backgroundColor: 'black' }}>
      <Tab.Screen name="Documentation" options = {{ 
        tabBarIcon:'book'
      }} component={Documentation} />
      <Tab.Screen name="Search City" options = {{ 
        tabBarIcon:'magnify'
      }} component={Search} />
      <Tab.Screen name="Weather" options = {{ 
        tabBarIcon:'cloud' 
      }}   component={CurrentWeather} />
        
       
      </Tab.Navigator>
    </NavigationContainer>
    
    </View>
    </PaperProvider>
  );
}
var styles = StyleSheet.create({
  container : {
    flex : 1,
    
  }
});