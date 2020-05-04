 import React from 'react'
 import { View } from 'react-native'

 import {
    
    
    Title,
    
    Appbar,
    
    
    IconButton,
    Subheading,
    Card,
    Button
  } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler';

 class  Documentation extends React.Component  {
     componentDidMount(){

     }
     render(){
     return (
           
          
       
      
          
       <View style ={{flex : 1}}>
       <Appbar.Header style = {{backgroundColor:'white'}}>
         <IconButton  icon='weather-partlycloudy' />
         <Appbar.Content
         style = {{alignItems:'center'}}
           title="WeatherApp"
           subtitle='Documentation'
           
         />
          <Appbar.Action icon="reload" onPress={this.componentDidMount.bind(this)} />
         
       </Appbar.Header>
      
         
       <ScrollView >  
         
         <Card  style={{
                    // borderColor: "black",
                    borderRadius: 40,
                    borderColor:'black',
                    backgroundColor:"#F5F5F5",
                    margin: 30,
                    borderWidth : 3
                  }}>
    
    <Card.Content>
    <Card style =  {{borderBottomColor:'black',borderBottomWidth:2,borderRadius:10,margin:4}}>
    <Card.Content>
      <Title>Hi there!!</Title>
      <Subheading>
          I am Devdatta here!!
          I would like you to tell you about this app and guide you throughout!!

          
      </Subheading>
      </Card.Content>
      </Card>
      <Card style =  {{borderBottomColor:'black',borderBottomWidth:2,borderRadius:10,margin:4}}>
    <Card.Content>
      <Title>
          Introduction:
      </Title>
      <Subheading> 
          This app is about the location stats for a particular location or for the current device location.
          You can also say this as Weather App , for now I haven't really thought of a name . XD
      </Subheading>
      </Card.Content>
      </Card>
     
     <Card style =  {{borderBottomColor:'black',borderBottomWidth:2,borderRadius:10,margin:4}}>
    <Card.Content> 
    <Title>
                Permissions required : 
      </Title>
      <Subheading>
                Permission are necessary to maintain a countinous and error free workflow of the app , not only that but also it'll help you utilize the app features to its core.
                
      </Subheading>
      <Subheading>
      1) Location
                
      </Subheading>
      <Subheading>
      2) Internet
                
      </Subheading>
      </Card.Content>
      </Card>
      <Card style =  {{borderBottomColor:'black',borderBottomWidth:2,borderRadius:10,margin:4}}>
    <Card.Content>
      <Title>
          Walkthrough
      </Title>
      <Subheading>
          You can start with Weather tab .
          It'll Show you your current location stats.
          After that you might want to checkout the 'Selected City' button , which will show you the stats of the 'London' as its the default.
          After that you can go over to the Search City tab and search the stats for the location you want , it'll redirect you to the Weather tab , now you have to press the 'Selected City' and ka-boom  you ready!

      </Subheading>
      </Card.Content>
      </Card>
      <Card style =  {{borderBottomColor:'black',borderBottomWidth:2,borderRadius:10,margin:4}}>
    <Card.Content>
      <Title>
          Contact :
      </Title>
      <Subheading>
          You can contact me if you feel or find anything buggy.
          Any kind of suggestion is welcome.
          You can drop a mail here :-
          dkhoche70@gmail.com
      </Subheading>
      </Card.Content>
      </Card>

    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style = {{margin:20}} />
    <Card.Actions>
      <Button>Designed by Devdatta.</Button>
     
    </Card.Actions>
    <Card.Content>
    <Subheading>Made with Love and Dedication!!!</Subheading>
    <Subheading>Have a nice day!!!</Subheading>
    </Card.Content>
  </Card>
  </ScrollView>
</View>
     )
 }
}
 
 
 export default Documentation;
 
