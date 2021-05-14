//Screen to load fav items

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../Components/MealList';
import { MEALS } from '../data/dummy-data';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';


const FavoriteScreen = props => {
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

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
}}



export default FavoriteScreen;