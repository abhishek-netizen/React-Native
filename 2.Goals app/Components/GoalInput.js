import React,{useState} from 'react'
import {View, TextInput, Button,StyleSheet,Text,Image, Modal} from 'react-native'

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInuputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
  }
  

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }
    

   

  return (

    <Modal  visible={props.visible} animationType="slide">
      <View style={styles.imageDesign}>
      <Image style={{width: 250, height: 250}}
        source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/61mvqegHuyL.jpg'}}
          resizeMode={'cover'} // cover or contain its upto you view look
      />
      </View>
        <View style={styles.inputContainer}>
        <TextInput placeholder="Enter your today's priority" style={styles.input} onChangeText={goalInuputHandler} value={enteredGoal}/>
        {/* ()=> props.onAddGoal(enteredGoal) */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button title="CANCEL" color="red" onPress={props.onCancel} />
        </View>
          <View style={styles.button}>
          <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
        {/* props.onAddGoal.bind(this, enteredGoal) */}
      </View>
      </Modal>
    )
}

export default GoalInput


const styles = StyleSheet.create({
  inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
  },
      input: {
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        width: '80%',
        marginBottom:10,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
     width: '40%'
  },
  button: {
    width: '45%',
  },
  imageDesign: {
    marginTop: 40,
    marginLeft: 45,
    marginRight: 25,
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FF6666'
  }
})
