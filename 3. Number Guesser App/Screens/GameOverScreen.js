import React from 'react';
import { View, Text, StyleSheet, Button,Image } from 'react-native';
import BodyText from '../Components/BodyText';
import TitleText from '../Components/TitleText';
import Colors from '../Constants/Color';
import MainButton from '../Components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.ImageContainer}>
                <Image
                    fadeDuration={300}
                    style={styles.image} 
                    source={require('../assets/success.png')} resizeMode='cover'
                    // source={{uri: 'https://img.republicworld.com/republic-prod/stories/images/15840145935e6a25018e077.jpg'}}
                    />
            </View>

            <View style={styles.resultConatiner}>
            <BodyText style={styles.resultText}>
                    Your phone needed {' '}
                <Text style={styles.heighLight}>{props.roundsNumber}</Text> Number of rounds to guess the number!! {' '} 
                    <Text>The Number was: <Text style={styles.heighLight}>{props.userNumber}</Text></Text>
            </BodyText>
           </View>
            <MainButton onPress={props.onRestart}>
            New Game
           </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ImageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    heighLight: {
        color: Colors.primary,
    },
    resultConatiner: {
        marginHorizontal: 30,
        marginVertical: 15,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    }
})


export default GameOverScreen;