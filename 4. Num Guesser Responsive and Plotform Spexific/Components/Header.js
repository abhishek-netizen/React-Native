import React from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '../Constants/Color';
import TitleText from '../Components/TitleText';


const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={{color: Platform.OS === 'ios' ? Colors.primary : 'white'}}>{props.title}</TitleText>
        </View>
     )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})




export default Header
