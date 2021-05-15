//Screen to load fav items

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../Components/MealList';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import { useSelector } from 'react-redux';


const FavoriteScreen = props => {
 
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={Styles.content}>
                 <Text>No Fav Meals Found. Start Adding Some!</Text>
            </View>
        )
    }



    return (
        <MealList listData={favMeals}  navigation = {props.navigation}       />
    );
}

FavoriteScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Your Favorites',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    }
}

const Styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})



export default FavoriteScreen;