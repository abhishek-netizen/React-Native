import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  
    const [outputText, setOuputText] = useState("Open up App.js to start working on your app!")

  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title="change text" onPress={() => setOuputText("the text is changed successfully!!")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
