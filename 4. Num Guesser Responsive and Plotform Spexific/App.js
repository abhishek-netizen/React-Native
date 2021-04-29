import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';
import * as Font from 'expo-font';
// import {AppLoading} from 'expo'
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
 return Font.loadAsync({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};










export default function App() {
 
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  //Initailizing Apploader from expo
  //To wait unitll font loads

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError = {(err) => console.log(err)}    
      />;
   }



  const congigureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  } 

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  
  if (userNumber && guessRounds <=0 ) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={congigureNewGameHandler}/>;
  } 

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
       {content}
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
