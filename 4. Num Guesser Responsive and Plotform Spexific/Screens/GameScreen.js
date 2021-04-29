import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import NumberContainer from '../Components/NumberContainer';
import Cards from '../Components/Cards';
import DefaultStyles from '../Constants/default-styles'
import MainButton from '../Components/MainButton';
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../Components/BodyText';
import { ScreenOrientation } from 'expo';


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

const renderListItems = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>#{itemData.item}</BodyText>
    </View>
);



const GameScreen = (props) => {

    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    




    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setcurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    //for 300 width device on portrait mode
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //allowing side effects
    // allowing logic to run after every rendering cycle
    const { userChoice, onGameOver } = props;

    //useEffect for 300 screen device
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })


    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]);



    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !', 'you know that this is wrong. .  !!', [{
                text: 'Sorry!', style: 'cancel'
            }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        };
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setcurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        // setPastGuesses(curpastGuesses => [nextNumber, ...curpastGuesses]);
        setPastGuesses(curpastGuesses => [nextNumber.toString(), ...curpastGuesses]);
    };

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Computers Guess:</Text>
                <View style={styles.control}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name={'md-remove'} size={24} color="white" />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>


                <NumberContainer>{currentGuess}</NumberContainer>

                {/* scroll view is for lit number */}
                <View style={listContainerStyle}>
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



    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computers Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Cards style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name={'md-remove'} size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Cards>
            {/* scroll view is for lit number */}
            <View style={listContainerStyle}>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
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
        flex: 1,
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    }
})


export default GameScreen;