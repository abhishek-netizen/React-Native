import React,{useState} from 'react';
import { View, Text, StyleSheet,Button, TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import Cards from '../Components/Cards';
import Colors from '../Constants/Color';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';
import BodyText from '../Components/BodyText';
import TitleText from '../Components/TitleText';
import MainButton from '../Components/MainButton';


const StartGameScreen = (props) => {

    //To reset the inputs
    const [enteredValue, setEnteredValue] = useState('');
    //to check button confirmed or not
    const [confiremed, setConfiremed] = useState(false);
    // to output selected number
    const [selectedNumber, setSelectedNumber] = useState();


     //applying validation user should not enter anything other than number 
    const numberInputHandler = (InputText) => {
        setEnteredValue(InputText.replace(/[^0-9]/g, ''));
    }
  
    const handleReset = () => {
        setEnteredValue('');
        setConfiremed(false);
    }

    const handleConfirm = () => {
       
        //adding validation
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
           Alert.alert('Invalid number!','Number has to be a number between 1 and 99',[{text:'Okay',style:'destructive',onPress:handleReset}])
        }

        setConfiremed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confiremedOuput;
    if (confiremed) {
        confiremedOuput = (
            <Cards style={styles.SummaryContainer}>
                <BodyText>You selected:</BodyText>
                {/* number container as a components and passing selectedNumber as props */}
                <NumberContainer>{selectedNumber}</NumberContainer>
                 {/* Recieveing as props from app.js */}
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Cards>
        ) 
    }


    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!!</TitleText>
            <Cards style={styles.inputContainer}/>
            <View style={styles.inputContainer}>
                <BodyText >Select a Number</BodyText>
                <Input
                    style={styles.Input}
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                <View style={styles.buttonContainer}> 
                    <View style={styles.button}>
                        <Button title="Reset" onPress={handleReset} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={handleConfirm} color={Colors.primary}/>
                    </View>
                </View>
                </View>
                {confiremedOuput}
            </View>
            </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10,
    },
    Input: {
        width: 50,
        textAlign: 'center',
    },
    SummaryContainer: {
        marginTop: 20,
        alignItems: 'center',

    },

})


export default StartGameScreen;
