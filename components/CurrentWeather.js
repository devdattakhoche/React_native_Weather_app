import React, { Component } from "react";
import { View, Image, Alert, ScrollView, AsyncStorage } from "react-native";
import axios from "axios";
import {
  Avatar,
  Button,
  Appbar,
  Card,
  IconButton,
  Paragraph,
  Subheading,
  Colors
} from "react-native-paper";
import { StyleSheet } from "react-native";
import Loading from "./loading";


export default class CurrentWeather extends Component {
  componentDidMount = async () => {
   
    this.setState({ status: "loading" });

    if (this.state.wantmyloc === "yes") {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getwheather(
            position.coords.latitude,
            position.coords.longitude,
            "minamoto"
          );
        },
        error => {
          Alert.alert("Error", error.message);
          this.setState({
            error: "Error Getting Weather Conditions"
          });
        }
      );
    } else if (this.state.wantmyloc === "no") {
      let lat = await AsyncStorage.getItem("latitude");
      let lon = await AsyncStorage.getItem("longitude");
      let name = await AsyncStorage.getItem("City_name");
      if (lat === null || lon === null || name === null) {
        this.getwheather(51.509998, -0.13, "London");
      } else {
        this.getwheather(lat, lon, name);
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      like_count: null,
      status: "loading",
      wantmyloc: "no"
    };
  }
  getwheather = async (lat = 25, lon = 20, name = "location") => {
    let wheather = null;

    await axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "1&appid=55c190d651c95a6c7716e0dc67ed1322&units=metric"
      )
      .then(function(response) {
        wheather = response.data;
      })
      .catch(err => {
        Alert.alert(
          "Error",
          "Oops!! There occured an error while procssing your request!!Check your Internet Connection Or Please try again later.\nError : " +
            err.message +
            ""
        );
        console.log(err.message);
      });

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var sunrise = parseInt(wheather.sys.sunrise);
    var date_sunrise = new Date(sunrise * 1000);
    var date = date_sunrise.getDate();
    var timestr_sunrise = date_sunrise.toLocaleTimeString();
    var sunset = parseInt(wheather.sys.sunset);
    var date_sunset = new Date(sunset * 1000);
    var timestr_sunset = date_sunset.toLocaleTimeString();
    var date_day = days[date_sunrise.getDay()];
    var date_month = months[date_sunrise.getMonth()];
    var mydate =
      date +
      "-" +
      (date_sunrise.getMonth() + 1) +
      "-" +
      date_sunrise.getFullYear();

    if (name === "minamoto") {
      name = wheather.name;
    }
    this.setState({
      City_name: name,
      weatherobject: wheather,
      Country_id: `City id : ${wheather.id}`,
      feels_like: wheather.main.feels_like,
      temp: wheather.main.temp,
      temp_max: wheather.main.temp_max,
      temp_min: wheather.main.temp_min,
      pressure: wheather.main.pressure,
      humidity: wheather.main.humidity,
      icon: wheather.weather[0].icon,
      wind_degree: wheather.wind.deg,
      wind_speed: wheather.wind.speed,
      lat: wheather.coord.lat,
      long: wheather.coord.lon,
      desc: wheather.weather[0].description,
      like_count: 0,
      status: "loaded",
      like: 0,
      sunrise: timestr_sunrise,
      sunset: timestr_sunset,
      day: date_day,
      month: date_month,
      year: date_sunrise.getFullYear(),
      fulldate: mydate
    });
  };

  render() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ focused: "focused" });
    });
    if (this.state.focused === "focused") {
      this.componentDidMount();
      this.setState({
        focused: ""
      });
    }
    var loc = null;
    if (this.state.wantmyloc === "no") {
      loc = (
        <Card.Actions>
          <Button
            mode="outlined"
            style={{ borderColor: "black", borderRadius: 20 }}
            onPress={() => {
              this.setState({
                wantmyloc: "yes"
              });
              this.componentDidMount();
            }}
          >
         
          Get my Location
          </Button>
        </Card.Actions>
      );
    } else {
      loc = (
        <Card.Actions>
          <Button
            mode="outlined"
            style={{ borderColor: "black", borderRadius: 20 }}
            onPress={() => {
              this.setState({
                wantmyloc: "no"
              });
              this.componentDidMount();
            }}
          >
            Get Selected City
          </Button>
        </Card.Actions>
      );
    }
    var mylike = null;
    if (this.state.like === 0) {
      mylike = (
        <Card
          style={{
            borderColor: "black",
            borderRadius: 10,
            margin: 4,
            borderBottomWidth: 2
          }}
        >
          <Card.Content>
            <Subheading>
              Did you like this ? Show us some support by hitting the like
              button.
            </Subheading>
            <IconButton
              icon="thumb-up"
              color={Colors.blue400}
              size={50}
              onPress={() =>
                this.setState({
                  like_count: this.state.like_count + 1,
                  like: 1
                })
              }
            />
          </Card.Content>
        </Card>
      );
    } else {
      mylike = (
        <Card
          style={{
            borderColor: "black",
            borderRadius: 10,
            margin: 4,
            borderBottomWidth: 2
          }}
        >
          <Card.Content>
            <Subheading>
              Thank You for showing us immense love. Have a nice day!
            </Subheading>
            <IconButton icon="heart" color={Colors.red500} size={50} />
          </Card.Content>
        </Card>
      );
    }

    if (this.state.status === "loaded") {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <Appbar.Header style={{ backgroundColor: "white" }}>
              <IconButton icon="weather-partlycloudy" />
              <Appbar.Content
                style={{ alignItems: "center" }}
                title="WeatherApp"
                subtitle="Current Weather"
              />
              <Appbar.Action
                icon="reload"
                onPress={this.componentDidMount.bind(this)}
              />
            </Appbar.Header>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <Card style={styles.cardView}>
              <Card.Title
                style={{ alignContent: "center" }}
                title={this.state.City_name}
                subtitle={
                  this.state.City_name === "London"
                    ? "" + this.state.Country_id + "(Default Selected)"
                    : this.state.Country_id
                }
                left={props => (
                  <Avatar.Icon {...props} icon="city-variant-outline" />
                )}
              />
              <Card.Content style={{ alignContent: "center" }}>
                {loc}
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    borderBottomWidth: 2,
                    margin: 4
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>
                      Time Schedule of {this.state.City_name}:
                    </Subheading>
                    <Paragraph>Today's Date : {this.state.fulldate} </Paragraph>
                    <Paragraph>Sunrise time : {this.state.sunrise} </Paragraph>
                    <Paragraph>Sunset time : {this.state.sunset} </Paragraph>
                    <Paragraph>Day : {this.state.day}</Paragraph>
                    <Paragraph>Month : {this.state.month}</Paragraph>
                    <Paragraph>Year : {this.state.year}</Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    borderBottomWidth: 2,
                    margin: 4
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>
                      Temperature Stats of {this.state.City_name}:
                    </Subheading>
                    <Paragraph>
                      Feels Like : {this.state.feels_like}
                      {"\u00b0"}C{" "}
                    </Paragraph>
                    <Paragraph>
                      Avergae Temperature : {this.state.temp}
                      {"\u00b0"}C
                    </Paragraph>
                    <Paragraph>
                      Maximum Temperature : {this.state.temp_max}
                      {"\u00b0"}C
                    </Paragraph>
                    <Paragraph>
                      Minimum Temperature : {this.state.temp_min}
                      {"\u00b0"}C
                    </Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>Humidity in {this.state.City_name}:</Subheading>
                    <Paragraph>Humidity : {this.state.humidity}g/m^3</Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>
                      Currnet climate conditions in {this.state.City_name}:
                    </Subheading>
                    <Paragraph>Climate conditons : {this.state.desc}</Paragraph>
                    <Image
                      style={{ height: 120, width: 120 }}
                      source={{
                        uri:
                          "http://openweathermap.org/img/w/" +
                          this.state.icon +
                          ".png"
                      }}
                    />
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>Pressure in {this.state.City_name}:</Subheading>
                    <Paragraph>
                      {" "}
                      Pressure : {this.state.pressure}N/m^2
                    </Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>
                      Wind Stats in {this.state.City_name}:
                    </Subheading>
                    <Paragraph>
                      Direction (Wind Degree) : {this.state.wind_degree}
                      {"\u00b0"}'s
                    </Paragraph>
                    <Paragraph> Wind Speed : {this.state.wind_speed}</Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content style={{ alignContent: "center" }}>
                    <Subheading>
                      Co-ordinates of {this.state.City_name}:
                    </Subheading>
                    <Paragraph> Latitude : {this.state.lat}</Paragraph>
                    <Paragraph> Longitude : {this.state.long}</Paragraph>
                  </Card.Content>
                </Card>

                <Card
                  style={{
                    borderColor: "black",
                    borderRadius: 10,
                    margin: 4,
                    borderBottomWidth: 2
                  }}
                >
                  <Card.Content>
                    <Subheading>Today's Picture</Subheading>
                    <Card.Cover
                      source={{
                        uri: `https://i.picsum.photos/id/${Math.floor(
                          Math.random() * 1000
                        ) + 1}/700/700.jpg`
                      }}
                      style={{ marginTop: 10 }}
                    />
                  </Card.Content>
                </Card>
                {mylike}
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

var styles = StyleSheet.create({
  cardView: {
    borderRadius: 40,
    margin: 30,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "#F5F5F5"
  }
});
