import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  ImageBackground,
} from "react-native";
import ListItem from "../components/ListItem";

// const DATA = [
//   {
//     dt_txt: '2023-02-18 12:00:00',
//     main: {
//       temp_max: 999,
//       temp_min: 666
//     },
//     weather: [
//       {
//         main: 'Rain'
//       }
//     ]
//   }
// ]

const UpcomingWeather = ( weatherData ) => {
  const renderItem = ({ item }) => (
    <ListItem
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  );
  //console.log( "WWDD: ", weatherData.weatherData )
  const { container, image } = styles;

  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require("../../assets/upcoming-bg.jpg")}
        style={image}
      >
        <FlatList
          data={weatherData.weatherData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt_txt}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
  },
});

export default UpcomingWeather;
