import React, { useState } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
// expo install expo-font
import MealsNavigator from './Navigation/MealsNavigator';
// import CategoriesScreen from '../mealsApp/Screen/CategoriesScreen'
import { enableScreens } from 'react-native-screens';



enableScreens();




//loading fonts
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
//   });
// };


export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // const handleOnFinish = () => {
  //   setFontLoaded(true)
  // }

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //     onFinish={handleOnFinish}
  //     startAsync={fetchFonts}
  //   />
  //   );
  // } 
    return  <MealsNavigator /> ;


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

