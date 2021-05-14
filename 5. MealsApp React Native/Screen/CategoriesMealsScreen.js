//screen to loads item for choosen categories
import React from 'react';
import { View, Text,FlatList, StyleSheet,Button } from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../Components/MealItem';
import MealList from '../Components/MealList';


const CategoriesMealsScreen = props => {
    


    const catId = props.navigation.getParam('categoryId');

     // If selected category matches to it then gives the output
    
    const dispayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    
    return (
       <MealList listData={dispayedMeals} navigation = {props.navigation}      />
    );
}

CategoriesMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    };
};





export default CategoriesMealsScreen;