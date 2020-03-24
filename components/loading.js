import React, { Component } from 'react'
import { View , ScrollView,ActivityIndicator ,StyleSheet} from 'react-native'

import { Card ,Subheading , Avatar , Appbar , IconButton } from 'react-native-paper';


export default class Loading extends Component {
    render() {
    
        return (
            <View style = {{flex :1}}>        
               <View>
       
       <Appbar.Header style = {{backgroundColor:'white'}}>
         <IconButton  icon='weather-partlycloudy' />
         <Appbar.Content
         style = {{alignItems:'center'}}
           title="WeatherApp"
           subtitle='Current Weather'
           
         />
          <Appbar.Action icon="reload"  />
         
       </Appbar.Header>
       </View>
            <ScrollView style={{flex:1}}>
            <Card style = {styles.cardView} >
            <Card.Title style = {{ alignContent :'center'}}   left={(props) => <Avatar.Icon {...props} icon="city-variant-outline" />} />
            <Card.Content style = {{ alignContent :'center'}}>
            
          <Card style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
            <Card.Content style = {{ alignContent :'center'}}>
            <Subheading>Temperature Stats :</Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
          </Card.Content>
          </Card>
          <Card style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
            <Card.Content style = {{ alignContent :'center'}}>
            <Subheading>Humidity :</Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
          </Card.Content>
          </Card>
          <Card style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
            <Card.Content style = {{ alignContent :'center'}}>
            <Subheading>Pressure :</Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
            
    
          </Card.Content>
          
          </Card>
          <Card style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
            <Card.Content style = {{ alignContent :'center'}}>
            <Subheading>Wind Stats :</Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
    
          </Card.Content>
          
          
          </Card>
          <Card style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
            <Card.Content style = {{ alignContent :'center'}}>
            <Subheading>Co-ordinates </Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
            
    
          </Card.Content>    
          </Card>
    
          <Card  style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
          <Card.Content>
            <Subheading>
              Today's Picture
            </Subheading>
            <Card.Cover source={{ uri: `https://i.picsum.photos/id/${Math.floor(Math.random() * 1000) + 1  }/700/700.jpg` }}  style = {{marginTop:10}}/> 
          </Card.Content>
             
          </Card>
        
        <Card  style = {{borderColor:'black',borderRadius : 10,margin:4,borderBottomWidth:2}}>
          <Card.Content>
            <Subheading>
              Did you like this , show us some support by hitting the like button.
            </Subheading>
            <ActivityIndicator size="small" color="#00ff00" />
          </Card.Content>
             
          </Card>
        </Card.Content>
        
        
            </Card>
            </ScrollView>
            </View>
    
        );
        
      }
    }

    var styles = StyleSheet.create({
        cardView : {
            borderRadius:40,
            margin:30,
            borderWidth:3,
            borderColor : 'black',
            backgroundColor:'#F5F5F5'
        }
    })

