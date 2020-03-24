import React, { Component } from "react";
import {

  StyleSheet,
  ScrollView,

  View,
  AsyncStorage,
  Alert
} from "react-native";
import {
  TextInput,
  Appbar,
  List,
  IconButton,
  Card,
} from "react-native-paper";

import axios from "axios";


export default class Citysearch extends Component {
  state = {
    input: "",
    text: "",
    cities: []
  };

  fetchcity = async text => {
    text = text.trim();
    var citylist = null;
    await axios
      .get(`http://autocomplete.wunderground.com/aq?query=${text}`)
      .then(function(response) {
        
        citylist = response.data.RESULTS.map(iterator => {
          return iterator;
        });
      })
      .catch(function(error) {
        Alert.alert('Error','There might be a network problem!! Please restart the app.')
        console.log(error);
      });
    this.setState({
      text: text,
      cities: citylist
    });
   
  };
  cardclick = async (latitude, longitude, name) => {
    
    this.setState({
      text: name
    });
    try {
      
       AsyncStorage.setItem("latitude", latitude).then(function () {
         
       })
       AsyncStorage.setItem('longitude',longitude).then(function (){
         
       })
       AsyncStorage.setItem('City_name',name).then(function (){
        
      })
       
      }
    catch (error) {
      
      Alert.alert("Error", error.message);
    }finally{
      this.props.navigation.jumpTo("Weather", {
        lat: latitude,
        lon: longitude,
      });
    } 
  };
  componentDidMount(){

  }
  render() {
    var City_dropdown = null;
    if (this.state.text.length > 0 && this.state.cities.length > 0) {
      City_dropdown = this.state.cities.map(city => {
        return (
          <Card
            onPress={() => this.cardclick(city.lat, city.lon, city.name)}
            key={city.zmw}
            style={{ margin: 5, marginRight: 20, marginLeft: 20 }}
          >
            <List.Item
              title={city.name}
              left={() => <List.Icon icon="label" />}
            />
          </Card>
        );
      });
    } else if (this.state.text.length > 0 && this.state.cities.length === 0) {
      City_dropdown = (
        <Card style={{ margin: 40 }} >
          <List.Item
            title="Oops !! No Cities found!!"
            left={() => <List.Icon icon="label" />}
          />
        </Card>
      );
    }


    return (
      
      <View style={styles.container}>
      <View>
       
       <Appbar.Header style = {{backgroundColor:'white'}}>
         <IconButton  icon='weather-partlycloudy' />
         <Appbar.Content
         style = {{alignItems:'center'}}
           title="WeatherApp"
           subtitle='Search City'
           
         />
          <Appbar.Action icon="reload" onPress={this.componentDidMount.bind(this)} />
         
       </Appbar.Header>
       </View>
      
        <TextInput
          style={{ margin: 30 }}
          label="Choose a City"
          selectionColor="lightgreen"
          mode="outlined"
          onChangeText={text => {this.fetchcity(text)}}
        />

        <View style={{ flex: 1 }}>
          <ScrollView>{City_dropdown}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  
  }
});
