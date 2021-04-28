import React,{useState, useRef, useEffect} from 'react';
import { Text, StyleSheet,View, Alert, ScrollView,FlatList } from 'react-native'
import NumberContainer from '../Components/NumberContainer';
import Cards from '../Components/Cards';
import DefaultStyles from '../Constants/default-styles'
import MainButton from '../Components/MainButton';
import {Ionicons} from '@expo/vector-icons'
import BodyText from '../Components/BodyText';



// Generating random number : logic
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
     }
}

//for scrollview
// const renderListItems = (value, numOfRounds) => (
//     <View key={value} style={styles.listItem}>
//         <BodyText>{numOfRounds}</BodyText>
//     <BodyText>#{value}</BodyText>
// </View>
// );

const renderListItems = ( listLength ,itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>#{itemData.item}</BodyText>
</View>
);



const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setcurrentGuess] = useState(initialGuess);
    const[pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

  //allowing side effects
    // allowing logic to run after every rendering cycle
    const { userChoice, onGameOver } = props;
     
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    
    },[currentGuess,userChoice,onGameOver]);
  
   


    const nextGuessHandler = (direction) => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !', 'you know that this is wrong. .  !!', [{
                text: 'Sorry!', style: 'cancel'
            }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else{
            currentLow.current = currentGuess + 1;
        };
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setcurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        // setPastGuesses(curpastGuesses => [nextNumber, ...curpastGuesses]);
        setPastGuesses(curpastGuesses => [nextNumber.toString(), ...curpastGuesses]);
    };



    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computers Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Cards style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name={'md-remove'} size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24}  color="white"  />
                </MainButton>
            </Cards>
            {/* scroll view is for lit number */}
            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index) => renderListItems(guess,pastGuesses.length - index))}
            </ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItems.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                    />
            </View>

        </View>
    )

}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    listContainer: {
        width: '60%',
        flex:1,
    },
    list: {
        flexGrow:1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    }
})


export default GameScreen;