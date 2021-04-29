import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
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

    //To manage landscape mode and to calculate screen size only when its changes
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    
    



    //applying validation user should not enter anything other than number 
    const numberInputHandler = (InputText) => {
        setEnteredValue(InputText.replace(/[^0-9]/g, ''));
    }

    const handleReset = () => {
        setEnteredValue('');
        setConfiremed(false);
    }
 
    //Listening to the changes (portrait or landscape)
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });


    const handleConfirm = () => {

        //adding validation
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: handleReset }])
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
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!!</TitleText>
                        <Cards style={styles.inputContainer} />
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
                                {/* writing that buttonwidth state in here */}
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" onPress={handleReset} color={Colors.accent} />
                                </View>

                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={handleConfirm} color={Colors.primary} />
                                </View>
                            </View>
                        </View>
                        {confiremedOuput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
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
    // button: {
    //     // width: 100,
    //     width: Dimensions.get('window').width / 4,
    // },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
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
